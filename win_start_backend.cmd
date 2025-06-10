@echo off
echo Activating venv
call "venv\Scripts\activate"
echo %errorlevel%
if %errorlevel% neq 0 (
    echo Failed to activate venv
    exit /b 1
)
echo venv activated, starting backend server...
waitress-serve --host=localhost --port=5000 flask_server_api.server:app
if %errorlevel% neq 0 (
    echo Flask failed to start.
    exit /b 1
)