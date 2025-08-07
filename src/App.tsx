import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-4">
                  Green Credit Forge
                </h1>
                <p className="text-gray-600">
                  Your project is now ready for development
                </p>
                <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
                  <p className="text-blue-800">Debug: If you can see this, the app is working!</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App