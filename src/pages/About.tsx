import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import BackToTop from '../Components/Ui/BackToTop';
import Button from '../Components/Ui/Button';

const LearnMore: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Pelajari Lebih Lanjut
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-center text-[#6B7280] max-w-3xl mx-auto"
          >
            Ketahui lebih banyak tentang aplikasi pelaporan dan perlindungan ibu dan anak dari tindak kekerasan
          </motion.p>
        </div>
      </div>
      
      {/* Remaining sections remain the same as in the original code */}
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-24 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Untuk Bertindak?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Jadilah bagian dari perubahan. Laporkan tindak kekerasan dan bantu menciptakan lingkungan yang lebih aman untuk ibu dan anak di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pengaduan">
              <Button variant="outline">Buat Pengaduan Sekarang</Button>
            </Link>
            <Link to="/hotline">
              <Button variant="outline">Hubungi Hotline</Button>
            </Link>
          </div>
        </motion.div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default LearnMore;