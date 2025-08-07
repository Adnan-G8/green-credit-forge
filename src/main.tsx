import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: '#ff0000',  // Bright red background
      color: '#ffffff',            // White text
      minHeight: '100vh',          // Full height
      fontSize: '24px',            // Large text
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🟢 GREEN CREDIT FORGE</h1>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>✅ Application is running successfully!</p>
      <div style={{ 
        backgroundColor: '#00ff00', 
        color: '#000000', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
          🎉 If you can see this green box, everything is working perfectly!
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)