import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Home';
import LearnMore from './Pages/About';
import Login from './Pages/Login'
import ForgotPassword from './Pages/LupaPassword';
import Register from './Pages/Registrasi';
import StatusPengaduan from './Pages/StatusPengaduan'
import TeamPage from './Pages/TimCapstone'
import FormPengaduan from './Pages/FormPengaduan'
import Terms from './Components/Home/Terms'
import Privacy from './Components/Home/Privacy'
import AnimatedCursor from './Components/Ui/Animated';
import ArticleListPage from './Components/Home/ArticlesListPage';
import PelayananPage from './Pages/Pelayanan'
import HalamanBantuan from './Pages/Bantuan'
import Dashboard from './Pages/AdminDashboard'
import LaporanKorban from './Components/Ui/LaporanKorban'
import TingkatKekerasan from './Components/Ui/TingkatKekerasan';

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedCursor />
      <div className="cursor-none"> {/* This will hide the default cursor */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pengaduan" element={<FormPengaduan />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status-pengaduan" element={<StatusPengaduan />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/artikel" element={<ArticleListPage />} />        
        <Route path="/pelayanan" element={<PelayananPage />} />
        <Route path="/bantuan" element={<HalamanBantuan />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/laporan-korban" element={<LaporanKorban />} />
        <Route path="/tingkat-kekerasan" element={<TingkatKekerasan />} />
        
      </Routes>
      </div>
    </Router>
  );
};

export default App;