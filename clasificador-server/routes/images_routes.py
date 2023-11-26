from flask import Blueprint, request, jsonify, current_app
from models.models import Images, db
from io import BytesIO
import imghdr

images_routes_bp = Blueprint('images_routes', __name__)

@images_routes_bp.route('/saveImagesToValidate', methods=['POST'])
def saveImagesToValidate():
    try:
        classification = request.form.get('classification')

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        uploaded_image = request.files['file']

        print('uploaded_image: ', uploaded_image)

        if uploaded_image.filename == '':
            return jsonify({'error': 'There is no image'}), 400
        
        # Obtener el nombre del archivo
        filename = uploaded_image.filename

        # Leer la imagen como bytes
        imagen_bytes = BytesIO()
        uploaded_image.save(imagen_bytes)
        imagen_data = imagen_bytes.getvalue()

        # Obtener la extensión del archivo desde el nombre del archivo
        image_extension = filename.rsplit('.', 1)[1].lower() if '.' in filename else None

        # Si la extensión es válida, úsala; de lo contrario, intenta determinarla
        if image_extension in {'jpg', 'jpeg', 'png', 'gif'}:
            image_type = image_extension
        else:
            image_type = imghdr.what(None, h=imagen_data)

        # Crear una instancia de la clase Images y guardarla en la base de datos
        new_image = Images(name= filename, image=imagen_data, classification=classification, image_type=image_type, user_id=1)
        db.session.add(new_image)
        db.session.commit()
       
        return jsonify({'message': 'La imagen se almacenó exitosamente'}), 200

    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
