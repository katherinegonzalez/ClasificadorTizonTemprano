python3 main.py

Si al ejecutar se tiene el error:

 NotOpenSSLWarning: urllib3 v2.0 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'LibreSSL 2.8.3'

 No module named ‘PIL.image’

 Entonces: 

sudo !pip3 install flask install Pillow==9.1.0


sudo pip3 install -U flask-cors


sudo pip3 install PyJWT


sudo pip3 install Flask-SQLAlchemy

sudo pip3 install pymysql



TODO:

Almacenar la cookie de sesión
usar isAutheticated para mostrar os componentes permitidos
buscar como verificar con el backend que el token sea correcto para las peticiones
Hacer la interfaz de aprobar imagenes
almacenar las imagenes clasificadas en la base de datos o en google drive. Revisar que es mejor
