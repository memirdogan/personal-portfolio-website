import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub className="w-4 h-4" />,
      url: 'https://github.com/memirdogan'
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin className="w-4 h-4" />,
      url: 'https://www.linkedin.com/in/mudogan/'
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} {t('footer.name')}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
