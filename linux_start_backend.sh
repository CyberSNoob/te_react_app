#!/bin/bash

# exit script if any cmd fails
set -e

echo "Activating venv..."
source venv/bin/activate

# $? exit status of last exec cmd
if [$? -ne 0]; then
    echo "Failed to activate venv"
    exit 1
fi
echo "Venv active"
echo "Start WSGI server"
waitress-serve --host=localhost --port=5000 flask_server_api.server:app
echo "Backend server running"