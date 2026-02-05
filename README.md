# 🛡️ QuestLog AI

> **Live Demo:** https://questlog-ai.vercel.app/

**QuestLog AI** is a gamified productivity application that transforms the daunting process of goal setting into an engaging Role-Playing Game (RPG). By leveraging **Generative AI (Llama 3 via Groq)**, it intelligently breaks down high-level user goals into actionable, bite-sized "quests" with XP rewards.

![Project Screenshot](https://via.placeholder.com/800x450?text=Upload+Your+Screenshot+Here)

## 🚀 Key Features

* **🤖 AI-Powered Task Decomposition:** Integrates the Groq API (Llama 3.3) to analyze user intent and generate structured, context-aware sub-tasks in milliseconds.
* **🎮 Gamification Engine:** Custom backend logic calculates Experience Points (XP) based on task complexity, providing immediate dopamine feedback for productivity.
* **⚡ High-Performance Architecture:** Built with Vite (React) for a sub-second load time and Flask for a lightweight, scalable REST API.
* **🌍 Production Deployed:** Fully hosted with a decoupled architecture—Frontend on **Vercel** and Backend on **Render**.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js + Vite | UI/UX, State Management, Axios |
| **Backend** | Python (Flask) | REST API, AI Logic, CORS Management |
| **AI Model** | Llama 3.3 (70B) | Powered by Groq Cloud for ultra-fast inference |
| **Deployment** | Vercel & Render | CI/CD Pipeline for live hosting |

## ⚙️ How It Works (Architecture)

1.  **User Input:** The user enters a goal (e.g., "Learn Docker").
2.  **Prompt Engineering:** The backend constructs a specialized system prompt to force the AI into a "Game Master" persona.
3.  **Inference:** The Groq API processes the request and returns a strict JSON array of tasks.
4.  **State Update:** The frontend receives the JSON, renders the quest cards, and tracks the user's local XP state.

## 📦 Installation & Local Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/questlog-ai.git](https://github.com/yourusername/questlog-ai.git)
cd questlog-ai

### 2. Backend Setup
```bash
cd server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment
# Create a .env file and add your key:
# GROQ_API_KEY=your_gsk_key_here

# Run Server
python main.py


## 🔑 Environment Variables

To run this project, you will need the following environment variables:

**Backend (.env)**
* `GROQ_API_KEY`: Your API key from [Groq Console](https://console.groq.com)

**Frontend (Vercel)**
* `VITE_API_URL`: The URL of your deployed backend (e.g., `https://questlog-backend.onrender.com`)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
