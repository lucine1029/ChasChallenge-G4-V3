# React + TypeScript + Vite

## Dependencies:

- React, Vite, Typescript: npm install vite@latest
- Firebase: npm install firebase
- Firebase Hosting, Firebase CLI (command line tool): npm install -g firebase-tools
- Axios: npm install axios
- Sass: npm add -D sass
- OpenAI Node.js library: npm install --save openai
- json-server:
  Install: npm install json-server
  Pass it to JSON Server CLI: npx json-server db.json

## Run the .Net server and open the project in the browser:

- To start the .Net server:
- Go to Run in the top menu and select Start Debugging,
- The Swagger API will open in a tab, and you get this local host in the Debug Console, https://localhost:5173/ click on it to open the project in the browser.

## Run the json-server with our mockdata in db.json

- Open terminal, cd to chaschallenge-g4-v3.client, run: npx json-server db.json
- Open a new terminal, cd to chaschallenge-g4-v3.client, run: npm run dev and click on https://localhost:5173/ The mockdata should show up in the console.
- To edit the json data, got to the file db.json.
