import React from 'react'
import ReactDOM from 'react-dom/client'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#ff0000',
          color: '#ffffff',
          padding: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1>🚨 React Error Detected</h1>
          <p>Error: {this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering...');
  
  React.useEffect(() => {
    console.log('App component mounted successfully');
    
    // Check for any global errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
    
    return () => {
      console.log('App component unmounting');
    };
  }, []);

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
      textAlign: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
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
        ✅ System Online & Ready - {new Date().toLocaleTimeString()}
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

console.log('About to render React app...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)