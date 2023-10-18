En este readme se mencionaran detalles importantes como los endpoint Para utilizar la api hecha en laravel si la necesidad de recurrir al front (ejemplo viva Postman), ejecutar migraciones y conexion para la base de datos

ENDPOINTS DE LA ENTIDAD BOOK

(GET) /api/books Devuelve todos los libros.

(POST) /api/books Agrega un  nuevo libro pasandole un JSON en el body de la request.

Ejemplo: 

    {
        "name": "El gato negro",  
        "author": "Edgar Allan Poe",  
        "edition_date": "1843-08-19"      
    }

 Recordar respetar el formato de los campos (ver las reglas en el controllador de la api).

 (GET) /api/book/:ID Devuelve el libro (si existe) con el identificador seleccionado.

 (DELETE) /api/book/:ID Borra el libro (si existe) con el identificador seleccionado.

 (PUT) /api/books/:ID Modifica los datos de un libro (SI existe) con el identificador seleccionado. Se debe pasar un JSON como body de la request.

    Ejemplo:

    direccion_base/api/books/5 => se modificara el libro con el identificador 5 con los datos del JSON

    {
        "name" : "Cien años de soledad"
        "author" : "Garcia Marquez"
        "edition_date": "1967-07-05"
    }

 (GET)  /api/book/search

 Con este endpoint se puede obtar buscar libros por nombre o autor (o ambas)


    {
        "author" : "Garcia Marquez"

    }

    Aqui solo se filtrara por autor


    {
        "name": "Cien años"
        "author": "Garcia Marquez"
        
    }

    Aqui se buscara por ambos


    MIGRACIONES:

    En database/factories se encuentra el archivo.php que sirve como migracion para armar la estructura en una base de datos

    Para esto recordar situarse en el directorio principal del backend (app-back) y ejecutar el comando PHP ARTISAN SERVE (RECORDAR TENER PHP Y COMPOSER INSTALADOS EN TU EQUIPO)

    Si bien la migracion se puede ejecutar en cualquier base, para este proyecto use MySQL

    CONEXION A LA BASE DE DATOS (MUY IMPORTANTE)

    En este proyecto no adjunte un archivo .SQL para darle la opcion al que pruebe esta app de elegir el tipo de base (MySQL, PostgreSQL, ECT)

    Recordar configurar el archivo .env con los datos correcto para conectarte a tu base de datos

    DB_CONNECTION=mysql => Tipo de base (en mi caso MySQL)
    DB_HOST=127.0.0.1 => El servidor de la base de datos (EN mi caso LocalHost)
    DB_PORT=3306  => Puerto de la base de datos
    DB_DATABASE=books => Nombre de tu base de datos
    DB_USERNAME=root => Nombre de tu usuario
    DB_PASSWORD=root => Contraseña de tu usuario (si la tiene)

    REACT JS

    Recordar instalar npm "Node Package Manager" para descargar dependencia necesarias

    Luego ejecutar el comando "NPM START" para levantar el front y consumir la api de manera mas entretenida








