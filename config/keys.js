require('dotenv').config();

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const stripeSecret = process.env.STRIPE_SECRET;

const mongoURI =
  'mongodb+srv://' +
  encodeURIComponent(userName) +
  ':' +
  encodeURIComponent(password) +
  '@planet-code-mgw6a.mongodb.net/planet-code?retryWrites=true';

const secret = 'secret';

export { mongoURI, secret as secretOrKey, stripeSecret };
