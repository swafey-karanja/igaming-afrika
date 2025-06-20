import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoute from './src/routes/registerRouter.js';
import inquiryRoute from './src/routes/inquiryRouter.js'

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://summits.igamingafrika.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // only if needed for cookies
}));

app.options('*', cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/register', registerRoute);
app.use('/api/inquiry', inquiryRoute);

// Health check
app.get("/", (req, res) => {
  res.send("iGaming API is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));