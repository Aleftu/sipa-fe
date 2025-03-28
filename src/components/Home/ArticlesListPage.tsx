import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import BackToTop from '../Ui/BackToTop'; // Adjust the import path as needed

// Define a more explicit type for the API response
interface RawArticleData {
  id: number;
  judul: string;
  isi: string;
  kategori: string | null;
}

interface Article {
  id: number;
  judul: string;
  isi: string;
  kategori: string | null;
  image: string;
  readTime: string | null;
  date: string | null;
}

const ArticleListPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const articlesPerPage = 6;

  // Categories based on API data
  const categories = ['Semua', 'Edukasi', 'Tips', 'Psikologi'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get<RawArticleData[]>('https://api-sipa-capstone-production.up.railway.app/artikel');
        
        const mappedArticles: Article[] = response.data.map((article: RawArticleData) => ({
          ...article,
          image: '/assets/tokdalang.jpg',
          readTime: null,
          date: null
        }));
        
        setArticles(mappedArticles);
        setLoading(false);
      } catch (err) {
        setError('Gagal mengambil artikel');
        setLoading(false);
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles when category changes
  useEffect(() => {
    const filterArticles = () => {
      const filtered = activeCategory === 'Semua' 
        ? articles 
        : articles.filter(article => article.kategori === activeCategory);
      
      setFilteredArticles(filtered);
      setCurrentPage(1);
    };

    filterArticles();
  }, [activeCategory, articles]);

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const generateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return `${readTimeMinutes} min`;
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === i 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

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

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-white min-h-screen py-20 relative">
      {/* Back to Top Component */}
      <BackToTop />

      <div className="container mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Kembali ke Beranda
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Kumpulan Artikel
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai artikel informatif seputar kesehatan, edukasi, dan tips perlindungan ibu dan anak.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeCategory === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {currentArticles.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            Tidak ada artikel yang ditemukan.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-52">
                    <img 
                      src={article.image || '/assets/tokdalang.jpg'} 
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
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                
                {renderPagination()}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleListPage;