@echo off

cd frontend
call npm install
call npm run build
cd ..

waitress-serve flask_server_api.server:app