## Terminal windows

For the server, I need 3 terminal windows:

- 1st to run the dev server to start Nodemon and compile the back end;
- 2nd to compile Typescript into JavaScript;
- 3rd to boot up Redis which handles session management;

The commands for these are:

- 1: npm run dev
- 2: npm run watch
- 3: redis-server (if it says "already in use," try `$ redis-cli shutdown` and then retry)
