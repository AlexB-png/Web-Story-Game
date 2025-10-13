# I added ignores since i used a venv #
from flask import Flask, request, jsonify  # type: ignore
import sqlite3
from flask_cors import CORS  # type: ignore
from Functions import Login, Create, Change

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=["POST"])
def home():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    Request = bool(Login(username, password))
    print(Request)
    return jsonify({"message": Request})


@app.route('/create', methods=['POST'])
def account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    status, message = Create(username, password)
    print(status)
    return jsonify({"Status": status, "Message": message})


@app.route('/change', methods=['POST'])
def change():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    code = data.get('code')

    status, message = Change(username, password, code)
    print(status)

    return jsonify({"Status": status, "Message": message})


if __name__ == '__main__':
    connection = sqlite3.connect(r"Data.db")
    cursor = connection.cursor()
    try: 
        cursor.execute("SELECT * from users")
    except:
        print("failed To connect to database")
        cursor.execute("CREATE TABLE users(user, pass, secret_code)")
    app.run(debug=True)
