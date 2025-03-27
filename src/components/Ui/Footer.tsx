import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-bold text-purple-700 mb-3">Sipa</h2>
            <p className="text-gray-600 text-sm mb-3">Platform pelaporan untuk kasus kekerasan terhadap perempuan dan anak.</p>
            <div className="space-y-2">
              <div className="flex items-center text-xs">
                <MdLocationOn className="text-purple-600 mr-2" />
                <span>Jl. Raya Kebebasan No. 17</span>
              </div>
              <div className="flex items-center text-xs">
                <MdPhone className="text-purple-600 mr-2" />
                <span>+62 812 3456 7890</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              © {currentYear} Sipa. Dibuat dengan <FaHeart className="inline text-red-500 mx-1" size={12} /> 
              oleh <Link 
                to="/team" 
                className="text-purple-600 hover:text-purple-800 font-medium transition duration-200"
              >
                Tim Capstone
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;