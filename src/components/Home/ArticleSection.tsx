import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../common/ui/ArticleCard';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
}

const LatestArticles: React.FC = () => {
  // Data dumi
  const fallbackArticles: Article[] = [
    {
      id: 1,
      title: 'Disease detection, check up in the laboratory',
      excerpt: 'In this case, the role of the health laboratory is very important to do a disease detection...',
      image: '/images/article-images/lab-check.jpg',
    },
    {
      id: 2,
      title: 'Herbal medicines that are safe for consumption',
      excerpt: 'Herbal medicine is very widely used at this time because of its very good for your health...',
      image: '/images/article-images/herbal-medicine.jpg',
    },
    {
      id: 3,
      title: 'Natural care for healthy facial skin',
      excerpt: 'A healthy lifestyle should start from now and also for your skin health. There are some...',
      image: '/images/article-images/facial-skin.jpg',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 w-full min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
          Check out our latest article
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackArticles.map(article => (
            <ArticleCard 
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              id={article.id}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link 
            to="/artikel" 
            className="border border-purple-500 text-purple-600 rounded-full px-6 py-2 hover:bg-purple-600 hover:text-white transition-all shadow-md hover:shadow-xl"
          >
            View all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
