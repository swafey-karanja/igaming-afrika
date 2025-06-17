import express from 'express';
import Registration from '../models/registration.js';
import { sendConfirmationEmail } from '../utils/sendEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newEntry = new Registration(req.body);
    await newEntry.save();
    // await sendConfirmationEmail(req.body.email, req.body.firstName);
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
