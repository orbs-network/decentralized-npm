const express = require('express');
const bodyParser = require('body-parser');
const authRouteFactory = require('./routes/auth');
const pingRouteFactory = require('./routes/ping');
const publishRouteFactory = require('./routes/publish');

class FrontendServer {
  constructor(port) {
    this.port = port;
    this.expressApp = express();
    this.expressApp.use(bodyParser.json());

    this.expressApp.use(authRouteFactory());
    this.expressApp.use(pingRouteFactory());
    this.expressApp.use(publishRouteFactory());

    this.expressApp.use('*', (req, res) => {
      console.log(req.method, req.originalUrl);
      res.sendStatus(200);
    });
  }

  start() {
    this.server = this.expressApp.listen(this.port, () =>
      console.log(`Frontend server started on port ${this.port}`),
    );
  }

  stop() {
    this.server.stop();
  }
}

module.exports = FrontendServer;
