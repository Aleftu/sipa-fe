import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/Pages/Home';
import LearnMore from '../src/Pages/About';
import Login from '../src/Pages/Login'
import StatusPengaduan from '../src/Pages/StatusPengaduan'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/status-pengaduan" element={<StatusPengaduan />} />
      </Routes>
    </Router>
  );
};

export default App;