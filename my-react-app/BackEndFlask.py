from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=["POST"])
def home():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    return {"message": f"{username}, {password}"}


if __name__ == '__main__':
    app.run(debug=True)
