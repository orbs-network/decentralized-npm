const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.put('/:packageName', async (req, res) => {
    try {
      console.log(req.params.packageName);
      console.log(req.body);
      res.send({});
    } catch (err) {
      res.status(500).send(err.toString());
    }
  });

  return router;
};
