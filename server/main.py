from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This allows your React frontend to talk to this backend

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({
        "message": "Hello from the QuestLog Backend!", 
        "level": 1,
        "xp": 50
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)