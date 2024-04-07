import requests
import sys
import json

x = sys.argv[1]
x_json = json.dumps(x)
print(x_json)