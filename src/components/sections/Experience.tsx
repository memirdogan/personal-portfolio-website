
import { FiCalendar, FiMapPin } from 'react-icons/fi';
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
      period: 'Eylül 2024 - Günümüz',
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
      company: 'RenaByte',
      location: 'İstanbul, Türkiye',
      role: 'Co-Founder & Team Lead',
      period: 'Temmuz 2024 - Ekim 2025',
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
    <section id="experience" className="bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="section-title">
          <h2>{t('experience.title')}</h2>
          <p className="section-subtitle">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item"
            >
              <div className="timeline-dot" />
              
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 mb-6 last:mb-0">
                <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {translatePeriod(exp.period)}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3.5 h-3.5" />
                      {translateLocation(exp.location)}
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {exp.descriptionKeys.map((descKey, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0">•</span>
                      {t(descKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 
