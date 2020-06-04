const express = require('express');
const router = express.Router();

const Question = require('../../models/Question');

router.get('/get-questions', (req, res) => {
    Question.find((err, data) => {
        res.send(JSON.stringify(data));
    });
});

router.post('/get-question', (req, res) => {
    console.log(req.body);
    Question.find({ id: req.body.id }, (err, doc) => {
        if (err) console.log('ERROR');
        else res.send(doc);
        console.log(doc);
    });
});

module.exports = router;
