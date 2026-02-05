import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

# 1. Load Secrets
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Setup Groq Client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# 3. In-Memory Database (We will upgrade to SQL later)
# Structure: { id: 1, title: "Learn React", xp: 50, completed: False }
QUESTS = []

@app.route('/api/generate-quest', methods=['POST'])
def generate_quest():
    data = request.json
    user_goal = data.get('goal') # e.g., "Learn Python"

    # 4. The AI Prompt
    system_prompt = """
    You are a Gamified Quest Master. 
    Break the user's goal into 3-5 small, actionable "Quests".
    For each quest, assign XP (Experience Points) based on difficulty (10-50).
    Return ONLY a JSON list like this:
    [
        {"title": "Watch Tutorial", "xp": 10},
        {"title": "Write Hello World", "xp": 20}
    ]
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"My Goal: {user_goal}"}
            ],
            model="llama-3.3-70b-versatile", # The "Strong" Model
            temperature=0.7,
        )

        # Parse the AI response
        ai_response = chat_completion.choices[0].message.content
        # Sometimes AI adds text around JSON, so we clean it
        clean_json = ai_response.replace("```json", "").replace("```", "").strip()
        new_quests = json.loads(clean_json)

        # Add to our database
        for q in new_quests:
            quest_obj = {
                "id": len(QUESTS) + 1,
                "title": q['title'],
                "xp": q['xp'],
                "completed": False
            }
            QUESTS.append(quest_obj)

        return jsonify(QUESTS)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/quests', methods=['GET'])
def get_quests():
    return jsonify(QUESTS)

@app.route('/api/quests/<int:quest_id>/complete', methods=['POST'])
def complete_quest(quest_id):
    for q in QUESTS:
        if q['id'] == quest_id:
            q['completed'] = not q['completed'] # Toggle
            return jsonify(q)
    return jsonify({"error": "Quest not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=8080)