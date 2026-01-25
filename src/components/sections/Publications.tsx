import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiExternalLink, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  publication: string;
  description: string;
}

const articles: Article[] = [
  {
    title: 'AWS Serverless Essentials: A Beginner\'s Overview',
    link: 'https://medium.com/@musaemird/aws-serverless-essentials-a-beginners-overview-645cd5474041?source=user_profile_page---------0-------------732176f5912f----------------------',
    pubDate: '2024-12-25',
    publication: '👨‍💻 Medium',
    description: 'AWS Serverless teknolojilerine giriş rehberi. Lambda, API Gateway ve diğer serverless servislerin temel kullanımları.'
  },
  {
    title: 'What is terraform state file? | What different ways can it be configured',
    link: 'https://medium.com/@musaemird/what-is-terraform-state-file-what-different-ways-can-it-be-configured-a219acc2d343?source=user_profile_page---------1-------------732176f5912f----------------------',
    pubDate: '2024-10-23',
    publication: '👨‍💻 Medium',
    description: 'Terraform state dosyasının ne olduğu ve farklı yapılandırma yöntemlerinin detaylı açıklaması.'
  },
  {
    title: 'Confusion Matrix nedir? karmaşıklık matrisi ve modelin sınıflandırılması',
    link: 'https://medium.com/@musaemird/confusion-matrix-nedir-karma%C5%9F%C4%B1kl%C4%B1k-matrisi-ve-modelin-s%C4%B1n%C4%B1fland%C4%B1r%C4%B1lmas%C4%B1-eeef0db68519?source=user_profile_page---------2-------------732176f5912f----------------------',
    pubDate: '2024-02-07',
    publication: '👨‍💻 Medium',
    description: 'Machine Learning modellerinin performansını değerlendirmek için kullanılan Confusion Matrix\'in detaylı açıklaması.'
  }
];

const Publications = () => {
  const { t, language } = useLanguage();

  return (
    <section id="publications">
      <div className="container">
        <div className="section-title">
          <h2>{t('publications.title')}</h2>
          <p className="section-subtitle">
            {t('publications.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        <FiBookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                      {article.publication}
                        </p>
                      </div>
                    </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1 line-clamp-3">
                  {article.description}
                </p>
                
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                        <FiCalendar className="w-4 h-4" />
                    {new Date(article.pubDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Publications; 