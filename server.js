import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Support for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/images', async (req, res) => {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const folder = 'igaming';
    
    let allResources = [];
    let nextCursor = null;
    let moreResults = true;

    while (moreResults) {
      let url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${folder}&max_results=500`;
      
      if (nextCursor) {
        url += `&next_cursor=${nextCursor}`;
      }

      const response = await axios.get(url, {
        auth: {
          username: apiKey,
          password: apiSecret
        }
      });

      allResources = [...allResources, ...response.data.resources];
      nextCursor = response.data.next_cursor;
      moreResults = !!nextCursor;
    }

    res.json({
      resources: allResources,
      count: allResources.length
    });
  } catch (err) {
    console.error('Error fetching Cloudinary images:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch images from Cloudinary',
      details: err.response?.data 
    });
  }
});

// Fallback to frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});