const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/-/ping', async (req, res) => {
    try {
      res.send({});
    } catch (err) {
      res.status(500).send(err.toString());
    }
  });

  return router;
};
