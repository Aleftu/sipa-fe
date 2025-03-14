// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import Hero from '../Components/Home/HeroSection';
import Features from '../Components/Home/FeaturesSection';
import ArticlesPage from '../Components/Home/ArticlesSection';
import Loading from '../Components/Ui/Loading';
import BackToTop from '../Components/Ui/BackToTop';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <ArticlesPage />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;