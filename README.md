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

WINDOWS/LINUX
For first time run or changes to .env or package.json, run this command: npm run complete:prod
Otherwise: npm run start:prod
For more information on commands, see package.json

Docker
Install docker and redis docker image

