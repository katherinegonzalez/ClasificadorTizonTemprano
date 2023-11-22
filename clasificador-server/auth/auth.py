from flask import Flask, Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
from models.models import User, Expert, db

auth_bp = Blueprint('auth', __name__)

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
        return jsonify({'token': token, 'id': user.id, 'name': user.name}), 200
    else:
        return jsonify({'message': 'Password Incorrecto'}), 401

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
        signup_key = datos_registro['signupkey']

        # Verifica si el usuario ya existe en la base de datos
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'El usuario ya existe'}), 400
        
        # Verificar token 
        if Expert.query.filter_by(signup_key=signup_key).first():
            
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
        
        else:
            return jsonify({'message': 'El token ingresado no es válido. Comuníquese con el administrador.'}), 400
    
    except Exception as e:
        # Captura otras excepciones y responde con un mensaje de error JSON genérico
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
