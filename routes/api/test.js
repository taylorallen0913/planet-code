import { Router } from 'express';
import jwt from 'jsonwebtoken';
import secretOrKey from '../../config/keys';
import passport from 'passport';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Authorized' });
  },
);

export default router;
