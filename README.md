SET UP

Install (if not already):

- git
- nodejs
- python3
- docker. For redis caching (optional for performance increase)

INSTRUCTIONS (only running locally):

In chosen folder:
git clone https://github.com/CyberSNoob/te_react_app

- Modify TE_API_KEY in .env.example file else DEFAULT api key will be used
- change .env.example to .env

REDIS SERVER
- Get latest redis image in docker, default port 6379
- Run redis container

SIMPLEST WAY
<!-- Single command that handles setup and run the app. -->
npm run complete-win-prod (FOR WINDOWS)
npm run complete-prod-linux (FOR LINUX)

DEVELOPMENT MODE
<!-- If new user, run the first command once before running dev-app. -->
npm run setup-win (FOR WINDOWS)
npm run setup-linux (FOR LINUX)

npm run dev-app

LOCAL PRODUCTION MODE
<!-- Again if new user, depending on system first run: npm run setup-win or npm run setup-linux -->
Run the app:
npm run start-win-prod (FOR WINDOWS)
npm run start-prod-linux (FOR LINUX)

For more commands, see package.json

Access the app on localhost:3000
