import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticlesCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-52">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          {article.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.readTime} read</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link 
          to={`/artikel/${article.id}`}
          className="text-purple-600 font-medium inline-flex items-center hover:text-purple-800 transition-colors"
        >
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const Articles: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Edukasi', 'Tips', 'Psikologi'];
  
  const articles: Article[] = [
    { id: 1, title: 'Disease detection, check up in the laboratory', excerpt: 'The role of the health laboratory is very important...', image: '/assets/tokdalang.jpg', category: 'Tips', readTime: '5 min', date: '12 Mar 2025' },
    { id: 2, title: 'Herbal medicines that are safe for consumption', excerpt: 'Herbal medicine is very widely used...', image: '/assets/tokdalang.jpg', category: 'Edukasi', readTime: '3 min', date: '10 Mar 2025' },
    { id: 3, title: 'Natural care for healthy facial skin', excerpt: 'A healthy lifestyle should start from now...', image: '/assets/tokdalang.jpg', category: 'Psikologi', readTime: '6 min', date: '8 Mar 2025' }
  ];
  
  const filteredArticles = activeCategory === 'All' ? articles : articles.filter(article => article.category === activeCategory);
  
  return (
    <div id="articles-section" className="bg-gradient-to-b from-white via-purple-50 to-white w-full min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-purple-600 font-medium">SUMBER PENGETAHUAN</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Artikel Terbaru Kami
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai informasi terkini dan panduan berguna seputar perlindungan ibu dan anak.
          </p>
        </motion.div>
        
        {/* Filter Kategori */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <ArticlesCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;