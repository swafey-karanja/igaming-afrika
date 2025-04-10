// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/api/gaming-news', async (req, res) => {
  try {
    const response = await fetch('https://www.gamerpower.com/api/giveaways');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
