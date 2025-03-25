import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { FaPhoneAlt, FaHospital, FaShieldAlt, FaHandsHelping, FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const emergencyDropdownRef = useRef<HTMLDivElement>(null);
  const emergencyButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emergencyDropdownRef.current && 
        !emergencyDropdownRef.current.contains(event.target as Node) &&
        emergencyButtonRef.current &&
        !emergencyButtonRef.current.contains(event.target as Node)
      ) {
        setIsEmergencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if we're on the home page
  const isHomePage = () => {
    return location.pathname === '/';
  };

  // Scroll to articles section if on home page, otherwise navigate to articles page
  const handleArticlesClick = (e: React.MouseEvent) => {
    if (isHomePage()) {
      e.preventDefault();
      const articlesSection = document.getElementById('articles-section');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Compact Floating Emergency Button */}
      <div className="fixed right-0 top-1/3 transform -translate-y-1/2 z-50" ref={emergencyDropdownRef}>
        <button 
          ref={emergencyButtonRef}
          onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
          className="group flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 shadow-md rounded-l-md border-r-0"
          style={{
            minHeight: "45px",
            boxShadow: "0 3px 10px rgba(220, 38, 38, 0.3)",
            animation: "subtle-pulse 3s infinite"
          }}
          aria-label="Emergency Contact"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <FaPhoneAlt className="text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <span className="mt-1 text-xs font-bold">DARURAT</span>
          </div>
        </button>

        {isEmergencyOpen && (
          <div className="absolute right-0 top-full w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn overflow-hidden mt-2"
              style={{
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto"
              }}>
            <div className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-yellow-300 mr-2 text-base" />
                <h3 className="font-bold text-sm">Kontak Darurat</h3>
              </div>
              <p className="text-xs text-red-100">Pilih nomor untuk menghubungi</p>
            </div>
            <div className="py-1">
              {[
                { name: 'Polisi', number: '110', icon: <FaShieldAlt className="text-blue-600" /> },
                { name: 'Ambulans', number: '118', icon: <FaHospital className="text-red-600" /> },
                { name: 'Hotline Pengaduan Kekerasan', number: '0800-123-456', icon: <FaHandsHelping className="text-purple-600" /> },
                { name: 'Pusat Layanan Terpadu', number: '0800-987-654', icon: <FaPhoneAlt className="text-green-600" /> }
              ].map((contact, index) => (
                <a 
                  key={index}
                  href={`tel:${contact.number.replace(/-/g, '')}`}
                  className="flex items-center px-3 py-2 hover:bg-red-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-600">{contact.number}</div>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                    <FaPhoneAlt className="text-green-600 text-xs" />
                  </div>
                </a>
              ))}
            </div>
            <div className="px-3 py-1 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">Layanan darurat 24/7</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar - Keeping the original with minimal changes */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/95 shadow-md backdrop-blur-md' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.png" alt="SIPA Logo" className="w-12 h-12 mr-2" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/pelayanan" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group">
              Pelayanan
            </Link>
            <Link to="/pengaduan" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group">
              Pengaduan
            </Link>
            <Link
              to={isHomePage() ? '#articles-section' : '/artikel'}
              onClick={handleArticlesClick}
              className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
            >
              Artikel
            </Link>
          </div>

          {/* Login and Registration Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/status-pengaduan">
              <Button variant="outline" size="sm">Status Pengaduan</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="sm" className="flex items-center">
                <FaUserPlus className="mr-2" />
                Registrasi
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 mt-2 py-4 px-6">
            <Link to="/pelayanan" className="block py-2 text-gray-700 font-medium hover:text-[#8B5CF6]" onClick={() => setIsMobileMenuOpen(false)}>Pelayanan</Link>
            <Link to="/pengaduan" className="block py-2 text-gray-700 font-medium hover:text-[#8B5CF6]" onClick={() => setIsMobileMenuOpen(false)}>Pengaduan</Link>
            <Link 
              to={isHomePage() ? '#articles-section' : '/artikel'} 
              className="block py-2 text-gray-700 font-medium hover:text-[#8B5CF6]" 
              onClick={handleArticlesClick}
            >
              Artikel
            </Link>
            <div className="flex flex-col space-y-2 mt-3 pt-3 border-t border-gray-100">
              <Link to="/status-pengaduan" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Status Pengaduan</Button>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full flex items-center justify-center">
                  <FaUserPlus className="mr-2" />
                  Registrasi
                </Button>
              </Link>
              <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* More subtle animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default Navbar;