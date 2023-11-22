from flask import Blueprint, request, jsonify, current_app
from models.models import User, db
import jwt
from flask_cors import CORS

#blueprint = Blueprint("foo", __name__, url_prefix="/api/bar")
#CORS(blueprint)

expert_validation_bp = Blueprint('expert_validation', __name__)
CORS(expert_validation_bp)

from flask import Response

# Función middleware para verificar el token
@expert_validation_bp.before_request
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
        print('try: ', current_app.config['SECRET_KEY'])
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        
        # El token es válido; continúa con la solicitud
    except jwt.ExpiredSignatureError as e:
        print(f"Error de firma expirada: {e}")
        # return jsonify({'Error': e}), 401
        return jsonify({'message': 'Token expirado'}), 401
    except jwt.InvalidTokenError as e:
        print('payload: ', payload)
        print("Error de token inválido:", e)
        # return jsonify({'Error de token inválido': e}), 401
        return jsonify({'message': 'Token inválido'}), 401
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({'message': 'Error inesperado'}), 401
    
# Ruta protegida
@expert_validation_bp.route('/expert_validation', methods=['GET'])
def recurso_protegido():
    # El token ya se ha verificado en la función middleware
    return jsonify({'message': 'Acceso permitido'}), 200

# Ruta protegida
@expert_validation_bp.route('/user', methods=['GET'])
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


