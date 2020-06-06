import { Router } from 'express';
import { stripeSecret } from '../../config/keys';

const stripe = require('stripe')(stripeSecret);
const router = Router();

router.post('/charge', async (req, res) => {
  try {
    const { id, amount } = req.body;

    const charge = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method: id,
      confirm: true,
    });

    if (!charge) throw new Error('charge unsuccessful');

    res.status(200).json({
      message: 'charge posted successfully',
      charge,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
