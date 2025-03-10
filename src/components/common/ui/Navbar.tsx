import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${isScrolled ? 'py-3 bg-white/95 shadow-md backdrop-blur-md' : 'py-6 bg-transparent'}
    `}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/assets/logo.png" alt="SIPA Logo" className="w-12 h-12 mr-2" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/pelayanan" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group">
            Pelayanan
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#8B5CF6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="/pengaduan" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group">
            Pengaduan
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#8B5CF6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="/artikel" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group">
            Artikel
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#8B5CF6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/status-pengaduan">
            <Button variant="outline" size="sm">Status Pengaduan</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 mt-2 py-4 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <Link to="/pelayanan" className="text-gray-700 font-medium py-2 border-b border-gray-100">Pelayanan</Link>
            <Link to="/pengaduan" className="text-gray-700 font-medium py-2 border-b border-gray-100">Pengaduan</Link>
            <Link to="/artikel" className="text-gray-700 font-medium py-2 border-b border-gray-100">Artikel</Link>
            <Link to="/status-pengaduan" className="text-gray-700 font-medium py-2">Status Pengaduan</Link>
            <Link to="/login">
              <Button variant="primary" fullWidth>Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;