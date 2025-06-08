#! /bin/bash

cd frontend
npm install
npm run build
cd ..

mkdir -p flask_server_api/static
cp -r frontend/dist/* flask_server_api/static