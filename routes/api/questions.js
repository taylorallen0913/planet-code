const express = require('express');
const router = express.Router();

const Question = require('../../models/Question');

router.get('/get-questions', (req, res) => {
  Question.find((err, data) => {
    res.send(JSON.stringify(data));
  });
});

router.post('/get-question', (req, res) => {
  Question.find({ id: req.body.id }, (err, doc) => {
    if (err) console.log(err);
    else res.json(doc);
  });
});

module.exports = router;
