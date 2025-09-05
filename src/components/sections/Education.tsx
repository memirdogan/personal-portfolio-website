import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface EducationItem {
  school: string;
  location: string;
  degree: string;
  period: string;
  type: 'education' | 'certification';
  logo?: string;
}

const educationItems: EducationItem[] = [
  {
    school: 'İstanbul Aydın Üniversitesi',
    location: 'İstanbul, Türkiye',
    degree: 'Lisans Derecesi - Yönetim Bilişim Sistemleri',
    period: '2022 - Günümüz',
    type: 'education'
  },
  {
    school: '42 İstanbul',
    location: 'İstanbul, Türkiye',
    degree: 'Common Core - Cadet',
    period: 'Ağustos 2023 - Kasım 2024',
    type: 'education'
  }
];

const certifications: EducationItem[] = [
  {
    school: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified Cloud Practitioner',
    period: 'Nisan 2025 - Nisan 2028',
    type: 'certification',
    location: 'AWS Cloud'
  },
  {
    school: 'Cambly Inc.',
    degree: 'Cambly Certificate of Accomplishment',
    period: 'Ağustos 2025',
    type: 'certification',
    location: 'common.english'
  }
];

const Education = () => {
  const { t } = useLanguage();
  const isTR = document.documentElement.lang === 'tr';
  
  return (
    <section id="education">
      <div className="container">
        <div className="section-title">
          <h2>{t('education.title')}</h2>
          <p className="section-subtitle">
            {t('education.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="card-title flex items-center gap-2 mb-6">
              <FiBook className="text-blue-700 dark:text-blue-400" />
              {t('education.education')}
            </h3>

            {educationItems.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                      {item.degree}
                    </h4>
                    <p className="card-subtitle flex items-center gap-2">
                      {item.school}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-blue-800 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {isTR ? item.period : item.period
                      .replace('Günümüz', 'Present')
                      .replace('Ağustos', 'August')}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {item.location.startsWith('common.') ? t(item.location) : item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="card-title flex items-center gap-2 mb-6">
              <FiAward className="text-blue-700 dark:text-blue-400" />
              {t('education.certifications')}
            </h3>

            {certifications.map((cert, index) => (
              <motion.div
                key={cert.degree}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                      {cert.degree}
                    </h4>
                    <p className="card-subtitle flex items-center gap-2">
                      {cert.school}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-blue-800 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {isTR ? cert.period : cert.period
                      .replace('Nisan', 'April')
                      .replace('Ağustos', 'August')}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {cert.location.startsWith('common.') ? t(cert.location) : cert.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education; 