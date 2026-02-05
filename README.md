🛡️ QuestLog AI - Gamified Productivity
Live Demo: Click Here to View App (https://questlog-ai.vercel.app/)

QuestLog AI is a productivity application that leverages Generative AI (Llama 3 via Groq) to combat procrastination. It transforms vague goals (e.g., "Learn Python") into actionable, gamified tasks with XP rewards, turning self-improvement into an RPG.

🚀 Key Features
AI-Powered Breakdown: Uses Large Language Models (LLMs) to intelligently decompose complex goals into 3-5 sub-tasks.

Gamification Engine: Custom logic calculates XP rewards based on task difficulty.

Real-time State Management: React hooks manage live updates for XP bars and quest completion status.

Production Architecture: Decoupled Frontend/Backend deployed on Vercel and Render.

🛠️ Tech Stack
Frontend: React.js, Vite, Axios, CSS3

Backend: Python, Flask, Groq SDK

AI Model: Llama 3.3 70B (via Groq Cloud)

Deployment: Vercel (Client), Render (Server)

⚙️ Architecture
The application follows a standard Client-Server architecture:

User Input: User submits a goal via the React UI.

API Request: Frontend sends a POST request to the Flask Backend.

Prompt Engineering: Backend constructs a system prompt optimized for JSON output.

Inference: The Groq API generates the task list in milliseconds.

Response: Backend parses the JSON and serves it to the Client.

📦 Installation & Setup
1. Clone the repository:
Bash
git clone https://github.com/puneeeeth88/questlog-ai.git
cd questlog-ai


2. Backend Setup:
Bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create a .env file and add: GROQ_API_KEY=your_key_here
python main.py


3. Frontend Setup:
Bash
cd client
npm install
npm run dev
How to Add This to GitHub
Create the file README.md in your root folder and paste the text above.

(Optional) Take a screenshot of your app, upload it to the folder, and replace the Insert+Screenshot+Here link with the filename (e.g., screenshot.png).

Run:

Bash
git add .
git commit -m "Added professional documentation"
git push
