import requests
import os
import json
from dotenv import load_dotenv

# Loading Environmnt Variables
load_dotenv()

# Endpoint for Getting the parts list
parts_url = 'https://api.devrev.ai/parts.list'

# Endpoint for Getting the user id
user_url='https://api.devrev.ai/dev-users.self'

# Endpoint for Creating the issue
work_create_url='https://api.devrev.ai/works.create'

# Header for Parts List 
parts_headers = {
    'Authorization':os.getenv('PAT'),  
}

# Header for User.self 
user_headers = {
    'Authorization':os.getenv('PAT'),
}

# Header for work.create
work_create_headers = {
    'Authorization':os.getenv('PAT'),
    'Content-Type':'application/json'
}

# Data for creating the issue
data = {
  "type":"issue",
  "applies_to_part":"",
  "owned_by":[
    ""
  ],
  "title":"Test Issue Using API"
}

# accessing the applies_to_part id value 
parts_response = requests.post(parts_url,headers=parts_headers)
parts_response_data = json.loads(parts_response.text)
for part in parts_response_data["parts"]:
    if part["id"]:
        data["applies_to_part"] = str(part["id"])

# accessing the owned_by id value 
user_response = requests.post(user_url,headers=user_headers)
user_response_data = json.loads(user_response.text)
getdevId=user_response_data["dev_user"]
data["owned_by"]=[getdevId["id"]]

# Request to create the issue
work_response = requests.post(work_create_url,headers=work_create_headers,json=data)
work_response_data = json.loads(user_response.text)

if work_response.status_code ==201:
  print("Issue Created Successfully")

