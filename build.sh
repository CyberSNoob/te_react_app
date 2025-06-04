#! /bin/bash
cd frontend
npm install
npm build
cd ..

pip install -r requirements.txt