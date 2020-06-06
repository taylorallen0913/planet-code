import { Router } from 'express';
import Question from '../../models/Question';

const router = Router();

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

export default router;
