import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author?: string;
  date?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  id, 
  title, 
  excerpt, 
  image, 
  author = "Admin SIPA", 
  date = "10 Mar 2025" 
}) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/50 to-transparent opacity-80 transition-opacity group-hover:opacity-85"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 transform group-hover:translate-y-[-8px]">
          <div className="flex items-center text-xs font-medium text-teal-50 mb-3">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{author}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-100 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/90 mb-4 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">
            {excerpt}
          </p>
          <Link 
            to={`/artikel/${id}`} 
            className="inline-flex items-center text-sm font-medium text-white bg-teal-600 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-teal-500 shadow-md"
          >
            Baca Artikel
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ArticlesSection: React.FC<{ articles: ArticleCardProps[] }> = ({ articles }) => {
  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-800 mb-4">Artikel Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Informasi terkini seputar perlindungan perempuan dan anak</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/artikel" 
            className="inline-flex items-center justify-center bg-white text-teal-600 font-medium px-6 py-3 rounded-full border border-teal-200 hover:border-teal-600 hover:bg-teal-50 transition-all shadow-sm hover:shadow"
          >
            Lihat Semua Artikel
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;