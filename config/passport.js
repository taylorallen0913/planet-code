import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import { secretOrKey } from '../config/keys';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

const passport = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.find({ id: jwt_payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }),
  );
};

export default passport;
