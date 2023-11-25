from flask import Blueprint, request, jsonify, current_app
from models.models import Images, User, db
import base64
import json
from services.services import saveInGoogleDrive
import jwt
from flask_cors import CORS

protected_routes_bp = Blueprint('protected_routes', __name__)
CORS(protected_routes_bp)

from flask import Response

# Función middleware para verificar el token
@protected_routes_bp.before_request
def verificar_token():

    if request.method.lower() == 'options':
        return Response()

    token = request.headers.get('Authorization')

    # Verifica si la cabecera comienza con "Bearer "
    if token.startswith('Bearer '):
        # Si comienza con "Bearer ", elimina esa parte
        token = token[7:]
    
    print('token: ', token)
    payload = ''
    if not token:
        return jsonify({'message': 'Token faltante'}), 401

    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        # Si el token es válido; continúa con la solicitud
    except jwt.ExpiredSignatureError as e:
        print(f"Error de firma expirada: {e}")
        return jsonify({'message': 'Token expirado'}), 401
    except jwt.InvalidTokenError as e:
        return jsonify({'message': 'Token inválido'}), 401
    except Exception as e:
        return jsonify({'message': 'Error inesperado'}), 401
    
# Ruta protegida
@protected_routes_bp.route('/user', methods=['GET'])
def getUser():
    # El token ya se ha verificado en la función middleware
    id = request.args.get('id')

    if id is None:
        return jsonify({'message': 'El id no puede ser nulo'}), 400

    try:
        user_id = int(id)
    except ValueError:
        return jsonify({'message': 'El is debe ser un número entero válido'}), 400

    user = User.query.get(user_id)

    if user:
        user_data = {
            'id': user.id,
            'name': user.name,
            'lastname': user.lastname,
            'occupation': user.occupation,
            'email': user.email
        }
        return jsonify({'user': user_data}), 200
    else:
        return jsonify({'message': 'No se encontró ningún usuario con el id proporcionado'}), 404
       
@protected_routes_bp.route('/getImagesToValidate', methods=['GET'])
def getImagesToValidate():
    try:
        # Consultar solo las imágenes con is_approved igual a null
        images = Images.query.filter(Images.is_approved == None).all()

        # Crear una lista para almacenar los datos de cada imagen
        images_data = []

        # Iterar sobre las imágenes y agregar sus datos a la lista
        for image in images:
            image_base64 = base64.b64encode(image.image).decode('utf-8')
            image_data = {
                'id': image.id,
                'filename': image.name,
                'classification': image.classification,
                'image': image_base64,
                'imageType': image.image_type
            }
            images_data.append(image_data)

        # Devolver la lista de datos de las imágenes
        return jsonify({'images': images_data}), 200

    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
        
@protected_routes_bp.route('/saveValidatedImages', methods=['POST'])
def saveValidatedImages():
    try:

        user_id = request.form.get('userId')
        print('user_id: ', user_id)
        uploaded_files_json = request.form.get('files')
        print('uploaded_files_json: ', uploaded_files_json)
        uploaded_files_list = json.loads(uploaded_files_json)
        print('uploaded_files_list: ', uploaded_files_list)
        
        for uploaded_file in uploaded_files_list:
          
            print(uploaded_file['id'])
            # Buscar la imagen existente en la base de datos por su nombre
            existing_image = Images.query.get(uploaded_file['id'])
            user = User.query.get(user_id)

            if existing_image:
                # Actualizar la imagen existente
                existing_image.is_approved = uploaded_file['isApproved']
                existing_image.user = user

                # isApproved = 0 -> false
                # isAprroved = 1 -> true
                db.session.commit()

                if uploaded_file['isApproved']:
                    print('va a guardar al drive')
                    saveInGoogleDrive(uploaded_file['image'], uploaded_file['imageType'], uploaded_file['filename'], uploaded_file['classification'])
     
        return jsonify({'message': 'Las imágenes se editaron exitosamente'}), 200
   
    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500



