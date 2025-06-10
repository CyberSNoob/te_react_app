@echo off
echo Checking for Python...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python not found in PATH. Please install or add to PATH.
    exit /b 1
)
echo Python found, check venv exists
if not exist "venv" (
    echo Create venv
    python -m venv venv
)
echo venv exists
echo Activating venv...
call ".\venv\Scripts\activate"
if %errorlevel% neq 0 (
    echo Failed to activate venv
    exit /b 1
)
echo Venv activated. Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install Python dependencies.
)

