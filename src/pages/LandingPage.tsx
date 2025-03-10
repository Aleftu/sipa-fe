// src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/common/ui/Navbar';
import Hero from '../components/Home/HeroSection';
import WhyChooseUs from '../components/Home/FeatureSection';
import LatestArticles from '../components/Home/ArticleSection';
import Footer from '../components/common/ui/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <LatestArticles />
      <Footer />
    </div>
  );
};

export default Home;