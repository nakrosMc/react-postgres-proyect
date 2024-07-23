from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Permite solicitudes desde cualquier origen

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener credenciales de las variables de entorno
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

# Función para obtener la conexión a la base de datos
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

# Truncar nombres largos
def truncate_name(name):
    return name[:10] + '...' if len(name) > 10 else name

@app.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute('SELECT * FROM users')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        users = [{'id': row[0], 'name': truncate_name(row[1]), 'email': row[2], 'age': row[3]} for row in rows]
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        
        if row:
            user = {'id': row[0], 'name': truncate_name(row[1]), 'email': row[2], 'age': row[3]}
            return jsonify(user)
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users', methods=['POST'])
def add_user():
    try:
        data = request.json
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO users (name, email, age) VALUES (%s, %s, %s) RETURNING id',
            (data['name'], data['email'], data['age'])
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'id': user_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.json
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute(
            'UPDATE users SET name = %s, email = %s, age = %s WHERE id = %s RETURNING *',
            (data['name'], data['email'], data['age'], user_id)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        if row:
            user = {'id': row[0], 'name': truncate_name(row[1]), 'email': row[2], 'age': row[3]}
            return jsonify(user)
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute('DELETE FROM users WHERE id = %s', (user_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        if cur.rowcount > 0:
            return '', 204
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/count', methods=['GET'])
def get_user_count():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute('SELECT COUNT(*) FROM users;')
        count = cur.fetchone()[0]
        cur.close()
        conn.close()

        return jsonify({'total_users': count})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/search', methods=['GET'])
def search_user():
    try:
        query = request.args.get('query')
        conn = get_db_connection()
        if conn is None:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
        
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE name ILIKE %s OR email ILIKE %s', (f'%{query}%', f'%{query}%'))
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        users = [{'id': row[0], 'name': truncate_name(row[1]), 'email': row[2], 'age': row[3]} for row in rows]
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
