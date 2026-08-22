
import { FiCloud, FiServer, FiCode, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: <FiCloud className="w-5 h-5" />,
      title: t('about.highlight1.title'),
      description: t('about.highlight1.desc')
    },
    {
      icon: <FiServer className="w-5 h-5" />,
      title: t('about.highlight2.title'),
      description: t('about.highlight2.desc')
    },
    {
      icon: <FiCode className="w-5 h-5" />,
      title: t('about.highlight3.title'),
      description: t('about.highlight3.desc')
    }
  ];

  return (
    <section id="about" className="bg-white dark:bg-slate-900">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Text content - takes 3 cols */}
          <div
            className="lg:col-span-3"
          >
            <h2 className="!text-left">{t('about.title')}</h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t('about.intro')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {t('about.details')}
            </p>
            
            <a
              href="https://github.com/memirdogan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              <FiGithub className="w-5 h-5" />
              <span>github.com/memirdogan</span>
              <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Highlight cards - takes 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
