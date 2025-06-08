SET UP

Install (if not already):
- git
- nodejs
- python3
- docker. For redis caching (optional for performance increase)

Instructions: 
Run in your chosen folder: 
git clone https://github.com/CyberSNoob/te_react_app

Modify as needed the file .env.example
TE_API_KEY, DEFAULT_HOST and REDIS_HOST
If running locally, only set TE_API_KEY, else it'll use a default api key.

REDIS server
Set up redis 

Run the following scripts to setup and run

WINDOWS
setup.cmd (run once)
build_run.cmd (build and run server)

LINUX
setup.sh
build_run.sh

Python setup
setup.py

Docker
Install docker and redis docker image

