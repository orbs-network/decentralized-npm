const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/auth-start', (req, res) => {
    res.sendStatus(200);
  });

  router.get('/auth-done', (req, res) => {
    res.json({ token: `some-token-${Math.random()}`, cacheBuster: Math.random() });
  });

  router.post('/-/v1/login', async (req, res) => {
    try {
      console.log(req.headers);
      console.log(req.body);
      res.json({
        loginUrl: 'http://localhost:4567/auth-start',
        doneUrl: 'http://localhost:4567/auth-done',
      });
    } catch (err) {
      res.status(500).send(err.toString());
    }
  });

  router.delete('/-/user/token/:token', (req, res) => {
    res.send({});
  });

  return router;
};
