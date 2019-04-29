const FrontendServer = require('./src/server');

const PORT = 4567;

const server = new FrontendServer(PORT);
server.start();
