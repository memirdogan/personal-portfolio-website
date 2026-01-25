import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  descriptionKeys: string[];
}

const experiences: ExperienceItem[] = [
    {
      company: 'Sufle Teknoloji Araştırma Geliştirme A.Ş.',
      location: 'İstanbul, Türkiye',
      role: 'Cloud & Platform Engineer',
      period: 'Aralık 2024 - Günümüz',
      descriptionKeys: [
        'experience.sufle.fulltime.desc1',
        'experience.sufle.fulltime.desc2',
        'experience.sufle.fulltime.desc3',
        'experience.sufle.fulltime.desc4',
        'experience.sufle.fulltime.desc5',
        'experience.sufle.fulltime.desc6',
        'experience.sufle.fulltime.desc7',
        'experience.sufle.fulltime.desc8',
        'experience.sufle.fulltime.desc9',
        'experience.sufle.fulltime.desc10',
        'experience.sufle.fulltime.desc11'
      ]
    },
    {
      company: 'Sufle Teknoloji Araştırma Geliştirme A.Ş.',
      location: 'İstanbul, Türkiye',
      role: 'Cloud & Platform Engineer Intern',
      period: 'Eylül 2024 - Aralık 2024',
      descriptionKeys: [
        'experience.sufle.intern.desc1',
        'experience.sufle.intern.desc2',
        'experience.sufle.intern.desc3',
        'experience.sufle.intern.desc4',
        'experience.sufle.intern.desc5',
        'experience.sufle.intern.desc6'
      ]
    },
    {
      company: 'RenaByte',
      location: 'İstanbul, Türkiye',
      role: 'Co-Founder & Team Lead',
      period: 'Temmuz 2024 - Günümüz',
      descriptionKeys: [
        'experience.renabyte.desc1',
        'experience.renabyte.desc2',
        'experience.renabyte.desc3',
        'experience.renabyte.desc4',
        'experience.renabyte.desc5',
        'experience.renabyte.desc6'
      ]
    },
    {
      company: 'Yönetilen Bilgi Sistemleri A.Ş.',
      location: 'İstanbul, Türkiye',
      role: 'Software Engineer Intern',
      period: 'Haziran 2024 - Eylül 2024',
      descriptionKeys: [
        'experience.ybs.desc1',
        'experience.ybs.desc2',
        'experience.ybs.desc3',
        'experience.ybs.desc4'
      ]
    },
    {
      company: 'EtruscAI',
      location: 'İstanbul, Türkiye',
      role: 'Machine Learning Engineer Intern',
      period: 'Ocak 2024 - Mart 2024',
      descriptionKeys: [
        'experience.etruskai.desc1',
        'experience.etruskai.desc2',
        'experience.etruskai.desc3',
        'experience.etruskai.desc4'
      ]
    }
  ];

const Experience = () => {
  const { t, language } = useLanguage();
  const isTR = language === 'tr';

  const translateLocation = (location: string) => {
    if (isTR) return location;
    return location
      .replace('İstanbul, Türkiye', 'Istanbul, Turkey')
      .replace('Türkiye', 'Turkey');
  };

  const translatePeriod = (period: string) => {
    if (isTR) return period;
    return period
      .replaceAll('Günümüz', 'Present')
      .replaceAll('Ocak', 'January')
      .replaceAll('Şubat', 'February')
      .replaceAll('Mart', 'March')
      .replaceAll('Nisan', 'April')
      .replaceAll('Mayıs', 'May')
      .replaceAll('Haziran', 'June')
      .replaceAll('Temmuz', 'July')
      .replaceAll('Ağustos', 'August')
      .replaceAll('Eylül', 'September')
      .replaceAll('Ekim', 'October')
      .replaceAll('Kasım', 'November')
      .replaceAll('Aralık', 'December');
  };
  
  return (
    <section id="experience">
      <div className="container">
        <div className="section-title">
          <h2>{t('experience.title')}</h2>
          <p className="section-subtitle">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="timeline-item"
            >
              <div className="timeline-dot" />
              
              <div className="card mb-8 last:mb-0">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                  <div>
                    <h3 className="card-title flex items-center gap-2">
                      <FiBriefcase className="text-blue-700 dark:text-blue-400" />
                      {exp.role} @ {exp.company}
                    </h3>
                    <p className="card-subtitle flex items-center gap-2">
                      <FiMapPin className="text-blue-600 dark:text-blue-500" />
                      {translateLocation(exp.location)}
                    </p>
                  </div>
                  <p className="card-subtitle flex items-center gap-2">
                    <FiCalendar className="text-blue-600 dark:text-blue-500" />
                    {translatePeriod(exp.period)}
                  </p>
                </div>

                <ul className="space-y-2">
                  {exp.descriptionKeys.map((descKey, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                      className="text-blue-900 dark:text-blue-100 flex items-start gap-2"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                      {t(descKey)}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 
