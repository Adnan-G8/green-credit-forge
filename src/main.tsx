import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        background: 'linear-gradient(45deg, #00ff88, #00ccff)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: 'bold'
      }}>
        🌱 Green Credit Forge
      </h1>
      
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '2rem',
        opacity: 0.9
      }}>
        Sustainable Finance Platform
      </p>
      
      <div style={{
        backgroundColor: '#00ff88',
        color: '#000000',
        padding: '15px 30px',
        borderRadius: '25px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        boxShadow: '0 8px 32px rgba(0, 255, 136, 0.3)'
      }}>
        ✅ System Online & Ready
      </div>
      
      <div style={{
        marginTop: '2rem',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Ready for development and deployment
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)