import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface LeadershipItem {
  organization: string;
  location: string;
  role: string;
  period: string;
  descriptionKeys: string[];
  image?: string;  // We'll add the image URL later when you provide it
}

const leadershipItems: LeadershipItem[] = [
  {
    organization: 'RenaByte',
    location: 'İstanbul, Türkiye',
          role: 'Co-Founder & Team Lead',
    period: 'Temmuz 2024 - Günümüz',
    descriptionKeys: [
      'leadership.renabyte.desc1',
      'leadership.renabyte.desc2',
      'leadership.renabyte.desc3',
      'leadership.renabyte.desc4',
      'leadership.renabyte.desc5',
      'leadership.renabyte.desc6'
    ],
    image: '/leadership-community/renabyte.webp'
  },
  {
    organization: 'Google Developer Student Clubs',
    location: 'İstanbul, Türkiye',
    role: 'Co-Lead',
    period: 'Ağustos 2023 - Haziran 2024',
    descriptionKeys: [
      'leadership.gdsc.desc1',
      'leadership.gdsc.desc2',
      'leadership.gdsc.desc3',
      'leadership.gdsc.desc4',
      'leadership.gdsc.desc5',
      'leadership.gdsc.desc6'
    ],
    image: '/leadership-community/gdsc.webp'
  },
  {
    organization: 'T3 AI\'LE',
    location: 'Türkiye',
    role: 'Topluluk Gönüllüsü',
    period: 'Ağustos 2024 - Günümüz',
    descriptionKeys: [
      'leadership.t3ai.desc1',
      'leadership.t3ai.desc2',
      'leadership.t3ai.desc3',
      'leadership.t3ai.desc4'
    ],
    image: '/leadership-community/t3ai.webp'
  }
];

const Leadership = () => {
  const { t } = useLanguage();
  
  return (
    <section id="leadership" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">🏆 {t('leadership.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-8">
          {leadershipItems.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass dark:glass-dark rounded-xl overflow-hidden group"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.organization} logo - ${item.role} leadership experience`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-accent-blue dark:text-accent-purple">
                        {item.organization}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                        {item.role}
                      </h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      {item.descriptionKeys.map((descKey, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-blue dark:text-accent-purple mt-1.5">•</span>
                          <span className="leading-relaxed">{t(descKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership; 