from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

teams_data = []


@app.route('/submit_teams', methods=['POST'])
def submit_teams():
    global teams_data
    data = request.json
    teams_data.append(data)  # save data to global variable
    print(data)
    return jsonify({'message': 'Teams received successfully!'}), 200


@app.route('/get_teams', methods=['GET'])
def get_teams():
    return jsonify(teams_data)


if __name__ == '__main__':
    app.run(debug=True)
