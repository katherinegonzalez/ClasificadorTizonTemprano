from flask import Flask, Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
from models.models import Images, db
from io import BytesIO
# from PIL import Image

save_images_bp = Blueprint('save_images', __name__)

@save_images_bp.route('/saveImages', methods=['POST'])
def saveImages():
    try:
        classification = request.form.get('classification')
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        uploaded_image = request.files['file']

        if uploaded_image.filename == '':
            return jsonify({'error': 'There is no image'}), 400
        
        # Leer la imagen como bytes
        imagen_bytes = BytesIO()
        uploaded_image.save(imagen_bytes)

        # Convertir a formato que Pillow pueda manejar (si es necesario)
        # imagen_pillow = Image.open(imagen_bytes)
        imagen_bytes.seek(0)  # Reiniciar el puntero

        print('-----> BYTES DE LA IMAGEN', imagen_bytes.getvalue())
        print('-----> BYTES DE LA IMAGEN CON READ', imagen_bytes.read())

        # Crear una instancia de la clase Images y guardarla en la base de datos
        new_image = Images(image=imagen_bytes.getvalue(), classification=classification)
        db.session.add(new_image)
        db.session.commit()
       
        # Leer la imagen como bytes
        # imagen_bytes = uploaded_image.read()

        # Crear una instancia de la clase Images y guardarla en la base de datos
        # new_image = Images(image=imagen_bytes, classification=classification)
        # db.session.add(new_image)
        # db.session.commit()

        # TODO: NO ESTÁ FUNCIONANDO -> Enviar las imagenes a google drive con la api,  y guardar la ruta en la BD en lugar de la imagen en bytes

        return jsonify({'message': 'La imagen se almacenó exitosamente'}), 200
   
    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500

