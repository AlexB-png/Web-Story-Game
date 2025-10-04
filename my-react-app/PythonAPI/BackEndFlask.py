# I added ignores since i used a venv #
from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore
from Functions import Login, Create

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=["POST"])
def home():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    Request = bool(Login(username, password))
    return jsonify({"message": Request})


@app.route('/create', methods=['POST'])
def account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    status, message = Create(username, password)
    print(status)
    return jsonify({"Status": status, "Message": message})


if __name__ == '__main__':
    app.run(debug=True)
