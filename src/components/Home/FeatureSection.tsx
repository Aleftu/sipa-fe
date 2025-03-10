import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group"
    >
      <div className="w-14 h-14 mb-4 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
        <div className="text-purple-600 text-2xl group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.172 5.172a4.005 4.005 0 015.656 0L12 8.343l3.172-3.171a4.005 4.005 0 115.656 5.656L12 20.828l-8.828-8.828a4.005 4.005 0 010-5.656z" />
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0M12 3v4M9.172 9.172a4 4 0 015.656 0" />
  </svg>
);

const FeatureSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Mengapa Memilih SIPA?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Platform yang aman, terpercaya, dan efektif untuk melaporkan tindak kekerasan terhadap ibu dan anak.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={<ShieldIcon />} title="Keamanan & Privasi" description="Identitas pelapor dijamin kerahasiaannya." delay={0.1} />
          <FeatureCard icon={<LightbulbIcon />} title="Edukasi & Pencegahan" description="Akses ke sumber daya edukasi." delay={0.2} />
          <FeatureCard icon={<HeartIcon />} title="Dukungan Psikologis" description="Layanan konsultasi dan dukungan psikologis." delay={0.3} />
          <FeatureCard icon={<SupportIcon />} title="Respon Cepat 24/7" description="Tim respons siap membantu kapanpun." delay={0.4} />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
