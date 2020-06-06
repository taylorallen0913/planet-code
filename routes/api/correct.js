import { Router } from 'express';
import User from '../../models/User';

const router = Router();

router.post('/', async (req, res) => {
  const userId = req.body.userId;
  const questionId = req.body.questionId;
  let questionList = [];
  const doc = await User.findOne({ id: userId });
  questionList = doc.questions;
  if (!questionList.includes(questionId)) questionList.push(questionId);
  doc.questions = questionList;
  doc.save();

  res.sendStatus(200);
});

router.post('/get', async (req, res) => {
  const userId = req.body.userId;

  let correctList = [];
  const doc = await User.findOne({ id: userId });
  correctList = doc.questions;
  res.send(correctList);
});

export default router;
