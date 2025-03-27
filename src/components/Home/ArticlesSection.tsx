import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

interface ApiArticle {
  id: number;
  judul: string;
  isi: string;
  kategori: string | null;
  image?: string;
  readTime?: string | null;
  date?: string | null;
}

interface ArticleCardProps {
  article: ApiArticle;
  index: number;
}

const ArticlesCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  // Generate a fallback image and read time
  const fallbackImage = '/assets/tokdalang.jpg';
  const generateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return `${readTimeMinutes} min`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-52">
        <img 
          src={article.image || fallbackImage} 
          alt={article.judul} 
          className="w-full h-full object-cover" 
        />
        {article.kategori && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {article.kategori}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{article.date || new Date().toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{generateReadTime(article.isi)} read</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
          {article.judul}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.isi.substring(0, 150)}...
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
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiArticle[]>('https://api-sipa-capstone-production.up.railway.app/artikel');
        
        // Map API response to match our Article interface
        const mappedArticles = response.data.map((article: ApiArticle) => ({
          ...article,
          image: article.image || '/assets/tokdalang.jpg',
          readTime: article.readTime || null,
          date: article.date || null
        }));
        
        setArticles(mappedArticles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
        console.error('Error fetching articles:', err);
      }
    };
  
    fetchArticles();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  // Take only the first 3 articles
  const displayedArticles = articles.slice(0, 3);

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

        {displayedArticles.length === 0 ? (
          <div className="text-center text-gray-600">
            Tidak ada artikel yang ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedArticles.map((article, index) => (
              <ArticlesCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="text-center">
          <Link
            to="/artikel"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
          >
            Lihat Artikel Lainnya
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;