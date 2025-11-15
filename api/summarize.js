const summarizeText = require('../summarize.js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text_to_summarize } = req.body;

    if (!text_to_summarize) {
      return res.status(400).json({ error: 'No text provided for summarization' });
    }

    console.log('Received text to summarize:', text_to_summarize.substring(0, 100) + '...');

    const summary = await summarizeText(text_to_summarize);
    console.log('Summary generated successfully');
    
    res.status(200).send(summary);
  } catch (error) {
    console.error('Error during summarization:', error.message);
    res.status(500).json({ error: 'Failed to summarize text: ' + error.message });
  }
};