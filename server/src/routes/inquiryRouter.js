import express from 'express';
import Inquiry from '../models/inquiry.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newEntry = new Inquiry(req.body);
    await newEntry.save();
    // await sendConfirmationEmail(req.body.email, req.body.firstName);
    res.status(201).json({ message: 'Inquiry made successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
