from flask import Flask
from auth.auth import auth_bp  # Importa el blueprint de autenticación
from flask_cors import CORS
from expert_validation import expert_validation_bp
from save_images import save_images_bp
from classifierAPI.classifier import classifier_bp
from models.models import db 

app = Flask(__name__)
# CORS(app)  # Habilita CORS para la aplicación
CORS(app, resources={r"/user": {"origins": "http://localhost:3000/", "methods": ["GET"]}}, supports_credentials=True, allow_headers="*")
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers="*")
# CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = 'tu_clave_secreta'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mysql123*@localhost/clasificadorDB?charset=utf8mb4'
#'mysql://root:mysql123*@localhost/clasificadorDB'

# Inicializa la base de datos con la aplicación
db.init_app(app)

# Registra el blueprint de autenticación
app.register_blueprint(auth_bp)
app.register_blueprint(save_images_bp)
app.register_blueprint(expert_validation_bp)
app.register_blueprint(classifier_bp)

if __name__ == '__main__':
    app.run(debug=True)