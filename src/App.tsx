import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/Pages/Home';
import LearnMore from '../src/Pages/About';
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Registrasi';
import StatusPengaduan from '../src/Pages/StatusPengaduan'
import TeamPage from '../src/Pages/TimCapstone'
import FormPengaduan from '../src/Pages/FormPengaduan'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pengaduan" element={<FormPengaduan />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status-pengaduan" element={<StatusPengaduan />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

export default App;