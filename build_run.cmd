@echo off

cd frontend
call npm install
call npm run build
cd ..

python -m waitress --port=8000 flask_server_api.server:app