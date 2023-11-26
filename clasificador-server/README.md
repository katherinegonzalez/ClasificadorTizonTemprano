# Backend Clasificador PapApp 👾

Esta aplicación está implementada en Python con Flask, y se utilizó también la librería Fastai.

## Librerias 📋

* [Flask](https://flask.palletsprojects.com/en/3.0.x/): Esta librería fue usada para los estilos de la página web.
* [Fast.ai](https://docs.fast.ai/): esta librería fue usada para encriptar las contraseñas antes de enviarlas al backend.
* [flask_bcrypt]
* [flask_cors]
* [flask_sqlalchemy]

## Instalación 💻 

Para instalar y configurar el proyecto en tu ambiente local, sigue los siguientes pasos:

1. Clona el repositorio: `git clone https://github.com/katherinegonzalez/ClasificadorTizonTemprano.git`
2. Ve a la carpeta del proyecto backend `cd clasificador-server/`
3. Instala las siguientes dependencias: 

    * `!pip3 install flask install Pillow==9.1.0`
    * `pip3 install -U flask-cors`
    * `pip3 install PyJWT`
    * `pip3 install Flask-SQLAlchemy`
    * `pip3 install pymysql`
    * `pip3 install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib`

##  Ejecución del Proyecto 💻 

Para ejecutar el proyecto en tu ambiente local:

1. En la misma carpeta del proyecto `clasificador-server/`
2. Ejecuta el comando `python3 app.py`, de esta manera se ejecuta el servidor en nuestro ambiente local, generalmente en el puerto `5000` - `http://127.0.0.1:5000`

##  Base de datos 💻 

Para importar el esquema de la base de datos en Workbench:

1. Abre MySQL Workbench y conectacte a tu servidor MySQL.  
2. Ve al menú "Server" y selecciona "Data Import".  
3. Configura las Opciones de Importación:  
    * Selecciona la ubicación de la carpeta `BaseDeDatos` de este proyecto.  
    * Selecciona la base de datos de destino en su servidor.    
    
    ### Nota: Asegúrate de tener previamente creada tu base de datos con el nombre `clasificadorDB`, es aquí donde importarás los archivos .sql.  

4. Haz clic en "Start Import" para comenzar el proceso de importación.
5. Ve al archivo app.py, y en la línea 15 reemplaza la cadena de texto `tu_contraseña` por la contraseña que tienes configurada en tu base de datos. 

`app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tu_contraseña@localhost/clasificadorDB?charset=utf8mb4'`


Y listo! Si la aplicación de frontend ya está siendo ejecutada en tu ambiente local entnces puedes empezar a probar el sistema PapApp, si aún no está ejecutándose haz click [aquí](./clasificador-server/README.md) y sigue los pasos.

### Nota: 

Si al ejecutar la alicación de python tienes el error:

`````````
NotOpenSSLWarning: urllib3 v2.0 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'LibreSSL 2.8.3'

 No module named ‘PIL.image’`  
`````````

Entonces ejecuta el comando: `sudo !pip3 install flask install Pillow==9.1.0``
