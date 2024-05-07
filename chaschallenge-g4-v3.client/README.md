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

## If you need to update the esbuild:

If you get this error in the terminal: "It looks like the error message is specifically related to the esbuild package, which is used by Vite for building and bundling JavaScript and TypeScript code. The error indicates a version mismatch between the host version "0.20.2" and the binary version "0.19.12" of esbuild."
To resolve this issue, you can try the following steps:

- Update esbuild: Update the esbuild package to version "0.20.2" to match the host version. You can do this by running: npm install esbuild@0.20.2
- Clear npm cache: Sometimes, cached versions of packages can cause issues. You can clear the npm cache by running:
  npm cache clean --force
- Reinstall dependencies: After updating esbuild, reinstall your project dependencies to ensure that everything is in sync: npm install
