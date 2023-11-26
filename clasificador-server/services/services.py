
import os
import os.path
import base64
from io import BytesIO
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload
from email.mime.image import MIMEImage

def saveInGoogleDrive(image_base64, image_type, filename, classification):
    
    SCOPES = [ 'https://www.googleapis.com/auth/drive' ]         
    creds = None

    parent_folder_id = '1BJZ_c8r1Vi2rXMXlin4bxKNaYSZ_E4wf'

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

        if "temprano" in classification.lower():
            folder_name = 'Tizón Temprano'
        elif 'sana' in classification.lower():
            folder_name = 'Papa Sana'
        else: # Tizón Tardío
            folder_name = 'Tizón Tardío'

        response = service.files().list(
            q=f"'{parent_folder_id}' in parents and name='{folder_name}' and mimeType='application/vnd.google-apps.folder'",
            spaces='drive'
        ).execute()

        if not response['files']:
            file_metadata = {
                'name' : folder_name,
                'mimeType': 'application/vnd.google-apps.folder',
                'parents': [parent_folder_id]
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
