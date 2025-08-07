function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '50px',
      fontSize: '24px'
    }}>
      <h1>TEST - Can you see this red background?</h1>
      <p>If you see this, React is working</p>
      <div style={{ backgroundColor: 'blue', padding: '20px', margin: '20px 0' }}>
        Blue box test
      </div>
    </div>
  )
}

export default App