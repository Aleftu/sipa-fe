import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { FaPhoneAlt, FaHospital, FaShieldAlt, FaHandsHelping } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const emergencyDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emergencyDropdownRef.current && !emergencyDropdownRef.current.contains(event.target as Node)) {
        setIsEmergencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const emergencyContacts = [
    { name: 'Polisi', number: '110', icon: <FaShieldAlt className="text-blue-600" /> },
    { name: 'Ambulans', number: '118', icon: <FaHospital className="text-red-600" /> },
    { name: 'Hotline Pengaduan Kekerasan', number: '0800-123-456', icon: <FaHandsHelping className="text-purple-600" /> },
    { name: 'Pusat Layanan Terpadu', number: '0800-987-654', icon: <FaPhoneAlt className="text-green-600" /> }
  ];

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
          {/* Emergency Button with Dropdown */}
          <div className="relative" ref={emergencyDropdownRef}>
            <button 
              onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
              className="flex items-center px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              <FaPhoneAlt className="mr-2" />
              Darurat
            </button>
            
            {isEmergencyOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100 animate-fadeDown z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Kontak Darurat</h3>
                  <p className="text-sm text-gray-600">Pilih nomor untuk menghubungi</p>
                </div>
                <div className="py-2">
                  {emergencyContacts.map((contact, index) => (
                    <a 
                      key={index}
                      href={`tel:${contact.number.replace(/-/g, '')}`}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.number}</div>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                        <FaPhoneAlt className="text-green-600 text-sm" />
                      </div>
                    </a>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">Layanan darurat 24/7</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/status-pengaduan">
            <Button variant="outline" size="sm">Status Pengaduan</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Emergency Button */}
          <button 
            onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
            className="flex items-center p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
            aria-label="Menu darurat"
          >
            <FaPhoneAlt className="text-sm" />
          </button>

          <button 
            className="text-gray-700 focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 mt-2 py-4 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <Link to="/pelayanan" className="text-gray-700 font-medium py-2 border-b border-gray-100">Pelayanan</Link>
            <Link to="/pengaduan" className="text-gray-700 font-medium py-2 border-b border-gray-100">Pengaduan</Link>
            <Link to="/artikel" className="text-gray-700 font-medium py-2 border-b border-gray-100">Artikel</Link>
            <Link to="/status-pengaduan" className="text-gray-700 font-medium py-2 border-b border-gray-100">Status Pengaduan</Link>
            <Link to="/login">
              <Button variant="primary" fullWidth>Login</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Emergency Contacts Dropdown */}
      {isEmergencyOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-2xl mx-4 mt-2 py-2 px-4 animate-fadeIn">
          <div className="py-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Kontak Darurat</h3>
            <p className="text-sm text-gray-600">Pilih nomor untuk menghubungi</p>
          </div>
          <div className="py-2">
            {emergencyContacts.map((contact, index) => (
              <a 
                key={index}
                href={`tel:${contact.number.replace(/-/g, '')}`}
                className="flex items-center py-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.number}</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                  <FaPhoneAlt className="text-green-600 text-sm" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;