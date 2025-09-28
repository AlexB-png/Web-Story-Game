from flask import Flask, request, jsonify
from flask_cors import CORS
from Functions import Login

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

if __name__ == '__main__':
    app.run(debug=True)
