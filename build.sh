#! /bin/bash

cd frontend
npm install
npm run build
cp -r dist/* ../flask_server_api/static
cd ..