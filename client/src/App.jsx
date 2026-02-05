import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [goal, setGoal] = useState("")
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [xp, setXp] = useState(0)

  // Load quests on startup
  useEffect(() => {
    fetchQuests()
  }, [])

  const fetchQuests = () => {
    axios.get('http://localhost:8080/api/quests')
      .then(res => setQuests(res.data))
  }

  const handleGenerate = () => {
    if (!goal) return
    setLoading(true)
    axios.post('http://localhost:8080/api/generate-quest', { goal })
      .then(res => {
        setQuests(res.data)
        setLoading(false)
        setGoal("")
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const toggleQuest = (id, currentStatus, rewardXp) => {
    axios.post(`http://localhost:8080/api/quests/${id}/complete`)
      .then(res => {
        fetchQuests() // Refresh list
        // Simple XP logic for demo
        if (!currentStatus) setXp(xp + rewardXp)
        else setXp(xp - rewardXp)
      })
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>🛡️ QuestLog AI</h1>
      
      {/* XP Bar */}
      <div style={{ background: '#333', borderRadius: '10px', height: '20px', marginBottom: '20px' }}>
        <div style={{ 
          background: 'gold', 
          width: `${Math.min(xp, 100)}%`, 
          height: '100%', 
          borderRadius: '10px',
          transition: 'width 0.5s' 
        }}></div>
      </div>
      <p>Level 1 • {xp} XP</p>

      {/* Input Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What do you want to achieve? (e.g. Learn Python)"
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleGenerate} disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? "Summoning..." : "Generate Quests"}
        </button>
      </div>

      {/* Quest List */}
      <div style={{ textAlign: 'left' }}>
        {quests.map(q => (
          <div key={q.id} style={{ 
            background: '#1a1a1a', 
            padding: '15px', 
            marginBottom: '10px', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: q.completed ? '1px solid green' : '1px solid #444',
            opacity: q.completed ? 0.5 : 1
          }}>
            <div>
              <h3 style={{ margin: 0, textDecoration: q.completed ? 'line-through' : 'none' }}>
                {q.title}
              </h3>
              <small style={{ color: 'gold' }}>+{q.xp} XP</small>
            </div>
            <button onClick={() => toggleQuest(q.id, q.completed, q.xp)}>
              {q.completed ? "Undo" : "Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App