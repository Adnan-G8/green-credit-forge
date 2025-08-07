import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ color: '#333', fontSize: '32px' }}>Green Credit Forge</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>Application is running successfully!</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)