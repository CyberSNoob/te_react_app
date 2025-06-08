#! bin/bash

cd flask_server_api
python3 -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..