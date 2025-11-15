const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const charCounter = document.getElementById("char-counter");
const summaryCounter = document.getElementById("summary-counter");
const statusMessage = document.getElementById("status-message");

submitButton.disabled = true;

textArea.addEventListener("input", handleTextInput);
submitButton.addEventListener("click", submitData);

updateCharCounter(); 

function handleTextInput(e) {
  updateCharCounter();
  verifyTextLength(e);
}

function updateCharCounter() {
  const length = textArea.value.length;
  charCounter.textContent = `${length.toLocaleString()} / 100,000 characters`;
  
  charCounter.classList.remove('valid', 'invalid');
  if (length >= 200 && length <= 100000) {
    charCounter.classList.add('valid');
  } else if (length > 0) {
    charCounter.classList.add('invalid');
  }
}

function verifyTextLength(e) {
  const textarea = e.target;
  const length = textarea.value.length;
  
  clearStatusMessage();
  
  if (length >= 200 && length <= 100000) {
    submitButton.disabled = false;
    if (length > 200) {
      showStatusMessage('Ready to summarize!', 'success');
    }
  } else {
    submitButton.disabled = true;
    if (length > 0 && length < 200) {
      showStatusMessage(`Need ${200 - length} more characters to summarize`, 'error');
    } else if (length > 100000) {
      showStatusMessage('Text is too long. Please reduce to under 100,000 characters.', 'error');
    }
  }
}

function showStatusMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';
}

function clearStatusMessage() {
  statusMessage.style.display = 'none';
  statusMessage.className = 'status-message';
}

function submitData(e) {
  e.preventDefault();
  
  submitButton.disabled = true;
  submitButton.classList.add("submit-button--loading");
  
  summarizedTextArea.value = '';
  summaryCounter.textContent = 'Generating summary...';
  showStatusMessage('🤖 AI is analyzing your text...', 'loading');

  const text_to_summarize = textArea.value;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text_to_summarize": text_to_summarize
    })
  };

  const baseUrl = window.location.origin;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiEndpoint = 'https://summary-ai-zeta.vercel.app/summarize';

  fetch(`${apiEndpoint}`, requestOptions)
    .then(response => {
      console.log('Response status:', response.status);
      console.log('Base URL used:', baseUrl);
      console.log('API endpoint used:', apiEndpoint);
      console.log('Is localhost:', isLocalhost);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      return response.text();
    })
    .then(summary => {
      console.log('Summary received:', summary);
      
      summarizedTextArea.value = summary;
      
      const summaryLength = summary.length;
      const originalLength = text_to_summarize.length;
      const reduction = Math.round(((originalLength - summaryLength) / originalLength) * 100);
      summaryCounter.textContent = `${summaryLength} characters (${reduction}% reduction)`;
      
      showStatusMessage('✅ Summary generated successfully!', 'success');
      
      summarizedTextArea.parentElement.style.animation = 'fadeIn 0.6s ease';
    })
    .catch(error => {
      console.error('Error occurred:', error);
      
      summarizedTextArea.value = `❌ Failed to generate summary: ${error.message}\n\nPlease try again or check your internet connection.`;
      summaryCounter.textContent = 'Error occurred';
      
      showStatusMessage(`❌ Error: ${error.message}`, 'error');
    })
    .finally(() => {
      submitButton.classList.remove("submit-button--loading");
      
      const length = textArea.value.length;
      if (length >= 200 && length <= 100000) {
        submitButton.disabled = false;
      }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animationDelay = `${index * 0.2}s`;
    }, 100);
  });
});

textArea.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (!submitButton.disabled) {
      submitData(e);
    }
  }
});
