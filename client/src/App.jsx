import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Connect to our Python Backend
    axios.get('http://localhost:8080/api/home')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error("Error connecting to backend:", error)
      })
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🛡️ QuestLog AI</h1>
      {data ? (
        <div>
          <p>Status: <span style={{color: 'green'}}>Connected</span></p>
          <h2>Current Level: {data.level}</h2>
          <h3>XP: {data.xp} / 100</h3>
          <p>Backend Message: {data.message}</p>
        </div>
      ) : (
        <p>Loading Quest Data...</p>
      )}
    </div>
  )
}

export default App