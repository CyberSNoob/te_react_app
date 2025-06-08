#! /bin/bash

cd frontend
npm install
npm build
cd ..

waitress-serve --host=0.0.0.0 --port=5000 flask_server_api.server:app
