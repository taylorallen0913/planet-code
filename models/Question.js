import { Schema, model } from 'mongoose';

// Create Schema
const QuestionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  expected: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
});

const Question = model('questions', QuestionSchema);

export default Question;
