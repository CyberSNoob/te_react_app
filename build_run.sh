#! /bin/bash

cd frontend
npm install
npm build
cd ..

waitress-serve flask_server_api.server:app
