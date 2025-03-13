import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-purple-50 pt-12 pb-6 border-t border-purple-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Sipa</h2>
            <p className="text-gray-700 mb-4">Platform pelaporan dan pendampingan untuk kasus kekerasan terhadap perempuan dan anak.</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <MdLocationOn className="text-purple-600 mr-2" />
                <span className="text-gray-700 text-sm">Jl. Raya Kebebasan No. 17 Indonesia</span>
              </div>
              <div className="flex items-center">
                <MdPhone className="text-purple-600 mr-2" />
                <span className="text-gray-700 text-sm">+62 812 3456 7890</span>
              </div>
              <div className="flex items-center">
                <MdEmail className="text-purple-600 mr-2" />
                <span className="text-gray-700 text-sm">hellosipa@gmail.com</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Tetap Terhubung</h3>
            <p className="text-gray-600 mb-4">Dapatkan informasi terbaru seputar program dan kegiatan kami.</p>
            <form className="mb-4">
              <div className="flex flex-col sm:flex-row max-w-xs">
                <input 
                  type="email" 
                  placeholder="Alamat email Anda" 
                  className="px-3 py-2 text-sm rounded-l border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-r border border-purple-600 transition duration-200 mt-2 sm:mt-0"
                >
                  Kirim
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#" className="bg-purple-100 p-2 rounded-full text-purple-600 hover:text-purple-800 hover:bg-purple-200 transition duration-200">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="bg-purple-100 p-2 rounded-full text-purple-600 hover:text-purple-800 hover:bg-purple-200 transition duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="bg-purple-100 p-2 rounded-full text-purple-600 hover:text-purple-800 hover:bg-purple-200 transition duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="bg-purple-100 p-2 rounded-full text-purple-600 hover:text-purple-800 hover:bg-purple-200 transition duration-200">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gradient-to-r from-purple-100 via-purple-300 to-purple-100 mb-6"></div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600">
            © {currentYear} Sipa. Hak Cipta Dilindungi
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/about" className="text-sm text-purple-600 hover:text-purple-800 transition duration-200">
              Tentang
            </Link>
            <Link to="/services" className="text-sm text-purple-600 hover:text-purple-800 transition duration-200">
              Layanan
            </Link>
            <Link to="/contact" className="text-sm text-purple-600 hover:text-purple-800 transition duration-200">
              Kontak
            </Link>
            <Link to="/privacy" className="text-sm text-purple-600 hover:text-purple-800 transition duration-200">
              Kebijakan Privasi
            </Link>
          </div>
          
          <p className="text-sm text-gray-600 flex items-center">
            Dibuat dengan <FaHeart className="text-red-500 mx-1" size={14} /> oleh{" "}
            <Link to="/team" className="text-purple-600 hover:text-purple-800 transition duration-200 ml-1 font-medium">
              Tim Capstone
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;