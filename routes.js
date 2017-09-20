const express = require('express');
const router = express.Router();

const queries = require("./db/queries");

router.get('/saveds', (req, res) => {
  queries.getAllBeats().then(saveds => res.json({
    saveds
  }));
});

router.post('/saveds', (req, res) => {
  console.log(req.body.saved);
  queries.create(req.body.saved).then(saved => {
    console.log("here");
    res.json({
      saved
    });
  });
})

module.exports = router;
