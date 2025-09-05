import React from 'react';
import { motion } from 'framer-motion';
import { FiServer, FiCloud, FiCode, FiGithub } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: <FiCloud className="w-6 h-6" />,
      title: t('about.highlight1.title'),
      description: t('about.highlight1.desc')
    },
    {
      icon: <FiServer className="w-6 h-6" />,
      title: t('about.highlight2.title'),
      description: t('about.highlight2.desc')
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: t('about.highlight3.title'),
      description: t('about.highlight3.desc')
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                {t('about.role')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('about.intro')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('about.details')}
              </p>
              
              {/* GitHub Link */}
              <motion.a
                href="https://github.com/memirdogan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-5 h-5" />
                <span>github.com/memirdogan</span>
              </motion.a>
            </motion.div>

            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-blue-500 mr-4">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 