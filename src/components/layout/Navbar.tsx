import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.publications'), href: '#publications' },
    { label: t('nav.events'), href: '#events' },
    { label: t('nav.leadership'), href: '#leadership' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass dark:glass-dark backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-display font-bold hover-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gradient">ED</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-full text-xs xl:text-sm font-medium hover:text-accent-blue dark:hover:text-accent-purple transition-colors relative group whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-accent-blue/0 via-accent-blue/70 to-accent-blue/0 dark:from-accent-purple/0 dark:via-accent-purple/70 dark:to-accent-purple/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-white/10 dark:hover:bg-black/10'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${language === 'tr' ? 'English' : 'Turkish'}`}
            >
              <div className="flex items-center gap-1">
                <FiGlobe className="w-4 h-4 text-accent-blue dark:text-accent-purple" />
                <span className="text-sm font-medium text-accent-blue dark:text-accent-purple">
                  {language.toUpperCase()}
                </span>
              </div>
            </motion.button>

          </div>

          {/* Mobile/Tablet Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass dark:glass-dark backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 rounded-full text-base font-medium hover:text-accent-blue dark:hover:text-accent-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-full text-base font-medium hover:text-accent-blue dark:hover:text-accent-purple transition-colors"
                whileHover={{ x: 10 }}
              >
                🌐 {language === 'tr' ? 'English' : 'Türkçe'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 