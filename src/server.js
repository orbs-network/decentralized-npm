const express = require('express');
const bodyParser = require('body-parser');
const pingRouteFactory = require('./routes/ping');
const loginRouteFactory = require('./routes/auth');

class FrontendServer {
  constructor(port) {
    this.port = port;
    this.expressApp = express();
    this.expressApp.use(bodyParser.json());

    this.expressApp.use(loginRouteFactory());
    this.expressApp.use(pingRouteFactory());

    this.expressApp.use('*', (req, res) => {
      console.log(req.method, req.originalUrl);
      res.sendStatus(200);
    });
  }

  start() {
    this.server = this.expressApp.listen(this.port, () => console.log(`Frontend server started on port ${this.port}`));
  }

  stop() {
    this.server.stop();
  }
}

module.exports = FrontendServer;
