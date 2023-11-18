from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    lastname= db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False) 
    occupation = db.Column(db.String(80), nullable=False) 
    email = db.Column(db.String(80), nullable=False, unique=True) 


class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    image = db.Column(db.LargeBinary(), nullable=False)
    classification= db.Column(db.String(80), nullable=False)
    is_approved = db.Column(db.Boolean(), nullable=True) 