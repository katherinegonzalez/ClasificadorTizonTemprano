from flask import Flask, Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
from models.models import User, db

auth_bp = Blueprint('auth', __name__)

# Registra el blueprint
# app.register_blueprint(expert_validation_bp)

users = {
    'usuario1': 'contraseña1',
    'usuario2': 'contraseña2'
}

# Lógica de autenticación y emisión de tokens
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

     # Consulta la base de datos para buscar el usuario
    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        token = jwt.encode({'user': email}, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Error de autenticación'}), 401

# Ruta de registro
@auth_bp.route('/registro', methods=['POST'])
def registro():

    try:
        # Obtiene los datos del formulario de registro
        datos_registro = request.get_json()
        print('datos_registro: ', datos_registro)
        name = datos_registro['name']
        lastname = datos_registro['lastname']
        occupation = datos_registro['occupation']
        email = datos_registro['email']
        password = datos_registro['password']

         # Verifica si el usuario ya existe en la base de datos
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'El usuario ya existe'}), 400
        
        nuevo_usuario = User(name=name, lastname=lastname, password=password, email=email, occupation=occupation)
        db.session.add(nuevo_usuario)
        db.session.commit()

        # Genera un token JWT para el nuevo usuario
        token = jwt.encode({'user': datos_registro['email']}, current_app.config['SECRET_KEY'], algorithm='HS256')

        # Crea una respuesta JSON válida
        response = jsonify({'token': token})

        # Configura el tipo de contenido
        response.headers['Content-Type'] = 'application/json'

        return response, 201  # 201: Creado con éxito
    
    except Exception as e:
        # Captura otras excepciones y responde con un mensaje de error JSON genérico
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
