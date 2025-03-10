import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-purple-50 py-8 border-t border-purple-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-purple-800">Sipa</h2>
            <p className="text-sm text-purple-600">© {currentYear} Sipa. All rights reserved</p>
          </div>
          
          {/* Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li><a href="/about" className="text-purple-600 hover:text-purple-800 transition duration-200">About</a></li>
              <li><a href="/services" className="text-purple-600 hover:text-purple-800 transition duration-200">Services</a></li>
              <li><a href="/contact" className="text-purple-600 hover:text-purple-800 transition duration-200">Contact</a></li>
              <li><a href="/privacy" className="text-purple-600 hover:text-purple-800 transition duration-200">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-500 hover:text-purple-700 transition duration-200"><FaFacebook size={20} /></a>
              <a href="#" className="text-purple-500 hover:text-purple-700 transition duration-200"><FaTwitter size={20} /></a>
              <a href="#" className="text-purple-500 hover:text-purple-700 transition duration-200"><FaInstagram size={20} /></a>
              <a href="#" className="text-purple-500 hover:text-purple-700 transition duration-200"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        {/* Accent Bar */}
        <div className="mt-6 pt-6 border-t border-purple-200">
          <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;