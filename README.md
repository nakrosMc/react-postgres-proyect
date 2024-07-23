# Nakros Project

Este proyecto es una aplicación web que utiliza un backend con Flask y una base de datos PostgreSQL, y un frontend con React. La aplicación permite agregar, buscar, editar y eliminar usuarios.

## Requisitos previos

- Python 3.7 o superior
- Node.js 14 o superior
- PostgreSQL
- Git

## Configuración del Backend (Flask)

### Paso 1: Clonar el repositorio

bash
git clone https://github.com/nakrosMc/react-postgres-proyect.git
cd react-postgres-proyect

#Paso 2: Configurar las variables de entorno
Crea un archivo .env en el directorio raíz del proyecto con el siguiente contenido, ajustando las variables según tu configuración:\
DB_HOST=tu_db_host
DB_PORT=5432
DB_NAME=tu_db_name
DB_USER=tu_db_user
DB_PASSWORD=tu_db_password

Paso 3: Crear la base de datos y las tablas
Ejecuta los siguientes comandos SQL en tu base de datos PostgreSQL para crear la tabla users:

sql
Copiar código

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INTEGER
);

Paso 4: Ejecutar el servidor Flask
Flask run
El servidor Flask debería estar corriendo en http://127.0.0.1:5000.

Configuración del Frontend (React):

Paso 1: Navegar al directorio del frontend
cd my-react-app

Paso 2: Ejecutar el servidor de desarrollo
npm run dev

El servidor de desarrollo de Vite debería estar corriendo en http://localhost:3000.


Funcionalidades
Agregar usuario: Rellena los campos de nombre, correo electrónico y edad, y haz clic en "Add User" para agregar un nuevo usuario a la base de datos.
Buscar usuario: Ingresa el nombre o correo electrónico de un usuario en el campo de búsqueda y haz clic en "Search User" para buscar un usuario específico.
Editar usuario: Al buscar un usuario, aparecerá un formulario con los datos del usuario y un botón para guardar los cambios.
Eliminar usuario: Al buscar un usuario, aparecerá un botón para eliminar el usuario.
API Endpoints
GET /users: Obtiene todos los usuarios.
GET /users/count: Obtiene el número total de usuarios.
GET /users/
: Obtiene un usuario por ID.
POST /users: Agrega un nuevo usuario.
PUT /users/
: Actualiza un usuario existente.
DELETE /users/
: Elimina un usuario existente.
