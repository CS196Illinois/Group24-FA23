import torch.optim
import torch.nn as nn


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
