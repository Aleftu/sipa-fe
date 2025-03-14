import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/Pages/Home';
import LearnMore from '../src/Pages/About';
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Registrasi';
import StatusPengaduan from '../src/Pages/StatusPengaduan'
import TeamPage from '../src/Pages/TimCapstone'
import FormPengaduan from '../src/Pages/FormPengaduan'
import Terms from '../src/Components/Home/Terms'
import Privacy from '../src/Components/Home/Privacy'
import AnimatedCursor from './Components/Ui/Animated';
import ArticlesPage from '../src/Components/Home/ArticlesSection'; // Import the full Articles page

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedCursor />
      <div className="cursor-none"> {/* This will hide the default cursor */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pengaduan" element={<FormPengaduan />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status-pengaduan" element={<StatusPengaduan />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/artikel" element={<ArticlesPage />} /> {/* Add the articles page route */}
      </Routes>
      </div>
    </Router>
  );
};

export default App;