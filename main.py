from flask import Flask, render_template, request, jsonify
from fastai.vision.all import *
import torch
from pathlib import Path
import pathlib
temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath

app = Flask(__name__)

# Set your model file path (change 'resnet18.pkl' to the actual filename and path)
current_dir = Path(__file__).parent
model_path = current_dir / 'resnet18.pkl'
# Load the model
learn = load_learner(model_path)

@app.route('/classifyImage', methods=['POST'])
def classifyImage():
    data = request.get_json()
    # Get the uploaded image
    uploaded_image = data['image']

    if uploaded_image:

        try:
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

            result = { 
                'predicted_class': predicted_class_label, 
                'probabilities' : class_probabilities,
            }

            return jsonify(result), 200

        except:
            return jsonify('error'), 400
    
    else: 
       return jsonify({'error': 'No hay una imagen para clasificar'}), 400

   
if __name__ == '__main__':
    app.run(debug=True)


