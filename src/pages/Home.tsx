// src/pages/Home.tsx
import React from 'react';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import Hero from '../Components/Home/HeroSection';
import Features from '../Components/Home/FeaturesSection';
import Articles from '../Components/Home/ArticlesSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Articles />
      <Footer />
    </div>
  );
};

export default Home;