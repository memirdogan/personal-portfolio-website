import React from 'react';
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
      role: 'Jr. Cloud & Platform Engineer',
      period: 'Aralık 2024 - Günümüz',
      descriptionKeys: [
        'experience.sufle.desc1',
        'experience.sufle.desc2',
        'experience.sufle.desc3',
        'experience.sufle.desc4',
        'experience.sufle.desc5',
        'experience.sufle.desc6',
        'experience.sufle.desc7',
        'experience.sufle.desc8',
        'experience.sufle.desc9'
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
        'experience.ybs.desc3'
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
  const { t } = useLanguage();
  
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
                      {exp.location}
                    </p>
                  </div>
                  <p className="card-subtitle flex items-center gap-2">
                    <FiCalendar className="text-blue-600 dark:text-blue-500" />
                    {exp.period}
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
