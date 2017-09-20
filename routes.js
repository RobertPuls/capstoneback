const express = require('express');
const router = express.Router();

const queries = require("./db/queries");

router.get('/saveds', (req, res) => {
  queries.getAllBeats().then(beats => res.json({
    beats
  }));
});

router.post('/saveds', (req, res) => {
  console.log(req.body);
  queries.create(req.body).then(beat => {
    console.log("here");
    res.json({
      beat
    });
  });
})

module.exports = router;
