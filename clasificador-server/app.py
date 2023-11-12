from flask import Flask
from auth.auth import auth_bp  # Importa el blueprint de autenticación
from flask_cors import CORS
from expert_validation import expert_validation_bp
from models.models import db 

app = Flask(__name__)
CORS(app)  # Habilita CORS para la aplicación
app.config['SECRET_KEY'] = 'tu_clave_secreta'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mysql123*@localhost/clasificadorDB'
#'mysql://root:mysql123*@localhost/clasificadorDB'

# Inicializa la base de datos con la aplicación
db.init_app(app)

# Registra el blueprint de autenticación
app.register_blueprint(auth_bp)
app.register_blueprint(expert_validation_bp)


if __name__ == '__main__':
    app.run(debug=True)