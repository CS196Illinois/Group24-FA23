from flask import Flask, jsonify, request
from flask_cors import CORS
import torch.optim
import torch.nn as nn
import torch.nn.functional as f


app = Flask(__name__)
CORS(app)


class Network(nn.Module):
    def __init__(self):
        super(Network, self).__init__()
        self.l1 = nn.Linear(8, 8)
        self.l2 = nn.Linear(8, 4)
        self.l3 = nn.Linear(4, 1)

    def forward(self, inputs):
        x = self.l1(inputs.type(torch.float32))
        x = self.l2(x)
        x = self.l3(x)
        return x

model = Network()
model = torch.load("trained_model.pth")
model.eval()

# Members API Route
@app.route("/members", methods=['POST'])
def members():
    data = request.get_json()
    input_tensor = torch.tensor(data['input'])
    input_normalized = (input_tensor - 24.36) / 4.12
    with torch.no_grad():
        output = f.sigmoid(model(input_normalized))
    return jsonify({'prediction': output.item()})

if __name__ == "__main__":
    
   

    app.run(port=8000, debug=True)