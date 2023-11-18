from flask import Flask, Blueprint, request, jsonify, current_app
from flask_cors import CORS
from fastai.vision.all import *
import torch
from pathlib import Path
import pathlib
temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath

classifier_bp = Blueprint('classifier', __name__)

# Set your model file path (change 'resnet18.pkl' to the actual filename and path)
current_dir = Path(__file__).parent
model_path = current_dir / 'resnet18.pkl'
# Load the model
learn = load_learner(model_path)

@classifier_bp.route('/classifyImage', methods=['POST'])
def classifyImage():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    uploaded_image = request.files['file']

    if uploaded_image:
        try:
            if uploaded_image.filename == '':
                return jsonify({'error': 'No selected file'}), 400

            # Save the image temporarily
            temp_image_path = Path('temp_image.jpg')
            uploaded_image.save(temp_image_path)

            # Load the uploaded image
            img = PILImage.create(temp_image_path)

            # Make a prediction
            pred_class, pred_idx, outputs = learn.predict(img)

            # Get the predicted class label
            predicted_class_label = learn.dls.vocab[int(pred_idx)]

            # Get the probabilities for each class
            class_probabilities = F.softmax(outputs, dim=0)

            # Convert the tensor to a list
            class_probabilities_list = class_probabilities.tolist()

            result = { 
                'predicted_class': predicted_class_label, 
                'probabilities' : class_probabilities_list,
            }

            return jsonify(result), 200
        
        except:
            return jsonify('error'), 400, {'Content-Type': 'application/json'}
    
    else: 
       return jsonify({'error': 'No hay una imagen para clasificar'}), 400, {'Content-Type': 'application/json'}


