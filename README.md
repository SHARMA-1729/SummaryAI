# SummaryAI - AI Text Summarizer

A modern web application that transforms lengthy texts into concise, meaningful summaries using advanced AI technology powered by Hugging Face's BART model.

## 🌐 Live Demo

**https://summaryai.onrender.com**

## ✨ Features

- **AI-Powered Summarization** - Uses Facebook's BART-large-CNN model for high-quality text summarization
- **Real-time Character Counter** - Shows character count with validation (200-100,000 characters)
- **Responsive Design** - Beautiful, modern interface that works on all devices
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **Loading States** - Visual feedback during processing
- **Keyboard Shortcuts** - Ctrl/Cmd + Enter to summarize quickly

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API token

### Installation

1. Clone the repository
```bash
git clone https://github.com/Kushagra-42/SummaryAI.git
cd SummaryAI
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```bash
ACCESS_TOKEN=your_hugging_face_api_token_here
```

4. Start the development server
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **AI Model**: Hugging Face BART-large-CNN
- **HTTP Client**: Axios
- **Environment**: dotenv

## 📁 Project Structure

```
SummaryAI/
├── src/                    # Frontend files
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend JavaScript
│   └── stylesheet.css     # CSS styles
├── index.js               # Express server
├── summarize.js           # AI summarization logic
├── package.json           # Dependencies
└── .env                   # Environment variables
```


## 💡 Usage

1. Paste your text (minimum 200 characters) into the input field
2. Click "Generate Summary" or use Ctrl/Cmd + Enter
3. Wait for the AI to process your text
4. View your concise summary with reduction statistics


