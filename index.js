const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('Environment check:', {
  ACCESS_TOKEN_EXISTS: !!process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_LENGTH: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN.length : 0,
  ACCESS_TOKEN_PREVIEW: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN.substring(0, 10) + '...' : 'NOT FOUND'
});

const app = express();
const port = process.env.PORT || 3000;
const summarizeText = require('./summarize.js');

app.use(cors());
app.use(express.json());
app.use(express.static('src'));
app.use('/assets', express.static('public'));

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  if (!text) {
    return res.status(400).json({ error: 'No text provided for summarization' });
  }

  console.log('Received text to summarize:', text.substring(0, 100) + '...');

  summarizeText(text)
    .then(response => {
      console.log('Summary generated successfully');
      res.send(response);
    })
    .catch(error => {
      console.error('Error during summarization:', error.message);
      res.status(500).json({ error: 'Failed to summarize text: ' + error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
