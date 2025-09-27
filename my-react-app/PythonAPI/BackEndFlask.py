from flask import Flask, request, jsonify
from flask_cors import CORS
from GetLogin import Login

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=["POST"])
def home():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    Request = bool(Login(username, password))
    return jsonify({"message": Request})


if __name__ == '__main__':
    app.run(debug=True)
