from flask import Flask
from routes.auth.auth import auth_bp  # Importa el blueprint de autenticación
from flask_cors import CORS
from routes.protected_routes import protected_routes_bp
from routes.images_routes import images_routes_bp
from routes.classifierAPI.classifier import classifier_bp
from models.models import db 
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)  # Habilita CORS para la aplicación

app.config['SECRET_KEY'] = 'tu_clave_secreta'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tu_contraseña@localhost/clasificadorDB?charset=utf8mb4'

# Inicializa la base de datos con la aplicación
db.init_app(app)

bcrypt = Bcrypt(app)

# Registra el blueprint
app.register_blueprint(auth_bp)
app.register_blueprint(images_routes_bp)
app.register_blueprint(protected_routes_bp)
app.register_blueprint(classifier_bp)

if __name__ == '__main__':
    app.run(debug=True)