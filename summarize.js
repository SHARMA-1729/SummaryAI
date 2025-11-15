const axios = require('axios');

async function summarizeText(text) {
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    url: 'https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  try {
    console.log('Making request to Hugging Face API...');
    
    if (!process.env.ACCESS_TOKEN) {
      throw new Error('ACCESS_TOKEN environment variable is not set');
    }
    
    const response = await axios.request(config);
    console.log('API response received:', response.status);
    
    if (response.data && response.data.length > 0 && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error('Invalid response format from Hugging Face API');
    }
  } catch (err) {
    console.error('Error in summarizeText:', err.response?.data || err.message);
    throw new Error(`Summarization failed: ${err.response?.data?.error || err.message}`);
  }
}

module.exports = summarizeText;