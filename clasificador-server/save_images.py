from flask import Flask, Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
from models.models import Images, User, db
from io import BytesIO
# from PIL import Image
import os
import os.path
import base64
import json

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload
from email.mime.image import MIMEImage

from PIL import Image
import imghdr

save_images_bp = Blueprint('save_images', __name__)

@save_images_bp.route('/saveImagesToValidate', methods=['POST'])
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
        new_image = Images(name= filename, image=imagen_data, classification=classification, image_type=image_type, user_id=0)
        db.session.add(new_image)
        db.session.commit()
       
        return jsonify({'message': 'La imagen se almacenó exitosamente'}), 200

    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
    


@save_images_bp.route('/getImagesToValidate', methods=['GET'])
def getImagesToValidate():
    try:

        '''''''''
        TODO:  
        1. Investigar como recibir un array con varias imagenes
        2. Tomar cada imagen y guardar en la BD el usuario y la si clasificación fue aprobada o no
        3. Si fue aprobada enviar a la carpeta de Google Drive.
        
        '''''''''
        # Consultar todas las imágenes desde la base de datos
        images = Images.query.all()

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
                # Puedes agregar más campos según sea necesario
            }
            images_data.append(image_data)

        # Devolver la lista de datos de las imágenes
        return jsonify({'images': images_data}), 200

    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
    

def saveInGoogleDrive(image_base64, image_type, filename):
    SCOPES = [ 'https://www.googleapis.com/auth/drive' ]         
    creds = None

    if os.path.exists('token.json'):
        creds =  Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)

        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('drive', 'v3', credentials=creds)

        response = service.files().list(
            q="name='ImagenesValidadas' and mimeType='application/vnd.google-apps.folder'",
            spaces='drive'
        ).execute()

        if not response['files']:
            file_metadata = {
                'name' : 'ImagenesValidadas',
                'mimeType': 'application/vnd.google-apps.folder'
            }

            file = service.files().create(body=file_metadata, fields='id').execute()

            folder_id = file.get('id')

        else:
            folder_id = response['files'][0]['id']

        # Map common image types to subtypes
        image_subtype_mapping = {
            'jpg': 'jpeg',
            'jpeg': 'jpeg',
            'png': 'png',
            'gif': 'gif'
        }

        # Get the subtype from the mapping or use the image_type directly
        subtype = image_subtype_mapping.get(image_type, image_type)

        # Decode base64 string to bytes
        image_data = base64.b64decode(image_base64)

        # Create a BytesIO object to simulate a file-like object
        image_stream = BytesIO(image_data)

        # Create a MIMEImage object with the determined subtype
        mime_image = MIMEImage(image_data, _subtype=subtype)

        # Create a MediaIoBaseUpload instance
        media = MediaIoBaseUpload(image_stream, mimetype=mime_image.get('Content-Type'))

        # Create file metadata
        file_metadata = {
            'name': filename,  # Set the desired file name
            'parents': [folder_id]
        }

        # Upload the file
        upload_file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields="id"
        ).execute()

        print('Image uploaded successfully.')

    except HttpError as e:
        print('Error: ' + str(e))

    
@save_images_bp.route('/saveValidatedImages', methods=['POST'])
def saveValidatedImages():
    try:

        user_id = request.form.get('userId')

        uploaded_files_json = request.form.get('files')
        uploaded_files_list = json.loads(uploaded_files_json)
        
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
                    saveInGoogleDrive(uploaded_file['image'], uploaded_file['imageType'], uploaded_file['filename'])

                    
        return jsonify({'message': 'Las imágenes se editaron exitosamente'}), 200



        '''''''''





        SCOPES = [ 'https://www.googleapis.com/auth/drive' ]
          
        creds = None

        if os.path.exists('token.json'):
            creds =  Credentials.from_authorized_user_file('token.json', SCOPES)
        
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)

            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        try:
            service = build('drive', 'v3', credentials=creds)

            response = service.files().list(
                q="name='BackupFolder2022' and mimeType='application/vnd.google-apps.folder'",
                spaces='drive'
            ).execute()

            if not response['files']:
                file_metadata = {
                    'name' : 'BackupFolder2022',
                    'mimeType': 'application/vnd.google-apps.folder'
                }

                file = service.files().create(body=file_metadata, fields='id').execute()

                folder_id = file.get('id')

            else:
                folder_id = response['files'][0]['id']

            for file in os.listdir('backupfiles'):
                file_metadata = {
                    'name': file,
                    'parents': [folder_id]
                }

                media = MediaFileUpload(f"backupfiles/{file}")
                upload_file = service.files().create(body=file_metadata,
                                                    media_body=media,
                                                    fields="id").execute()
                
                print('Backed up file: ' + file)


        except HttpError as e:
            print('Error: ' + str(e))
       
        return jsonify({'message': 'La imagen se almacenó exitosamente'}), 200

        '''''''''
   
    except Exception as e:
        print('error: ', e)
        return jsonify({'message': 'Error interno del servidor'}), 500
