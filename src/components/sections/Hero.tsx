import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.1]" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 bg-blue-100 dark:bg-blue-800/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-700/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.1
            }}
            className="mb-8 relative inline-block"
          >
            <div className="w-48 h-48 rounded-full border-2 border-blue-900/20 p-1 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 opacity-20 animate-spin-slow" />
              <img
                src="/pp/pp.webp"
                alt="Musa Emir Doğan - Jr. Cloud & Platform Engineer professional profile photo"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={192}
                height={192}
                className="w-full h-full rounded-full object-cover relative z-10 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 dark:from-blue-300 dark:via-blue-400 dark:to-blue-300">
              Emir Doğan
            </h1>
            <div className="glass dark:glass-dark rounded-2xl p-6 mb-8 backdrop-blur-lg">
              <p className="text-xl sm:text-2xl text-blue-950 dark:text-blue-100 leading-relaxed">
                {t('hero.position')}
              </p>
              <p className="text-lg text-blue-800 dark:text-blue-300 mt-4">
                {t('hero.description')}
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 shadow-lg shadow-blue-900/25 hover:shadow-xl hover:shadow-blue-800/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FiMail className="w-5 h-5" />
              {t('hero.contactMe')}
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-6 text-blue-900 dark:text-blue-400"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 
