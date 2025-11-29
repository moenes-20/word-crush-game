import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Admin from './pages/Admin';
import Player from './pages/Player';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Player />} />
          </Routes>
        </Router>
      </SocketProvider>
    </ErrorBoundary>
  );
}

export default App;
