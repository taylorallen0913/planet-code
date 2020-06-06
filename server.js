import express from 'express';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import users from './routes/api/users';
import questions from './routes/api/questions';
import correct from './routes/api/correct';
import judge from './routes/api/judge';
import checkout from './routes/api/checkout';
import test from './routes/api/test';

// Config
import { mongoURI } from './config/keys';
import passportConfig from './config/passport';

const app = express();

app.use(cors());

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For development
app.use(express.static(path.join(__dirname, 'client/build')));

const db = mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MONGO CONNECTED'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportConfig(passport);

// Routes
app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/correct', correct);
app.use('/api/judge', judge);
app.use('/api/checkout', checkout);
app.use('/api/test', test);

// For production

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
