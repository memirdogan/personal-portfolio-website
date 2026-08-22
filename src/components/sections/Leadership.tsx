import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface LeadershipItem {
  organization: string;
  location: string;
  role: string;
  period: string;
  descriptionKeys: string[];
  image?: string;
  featured?: boolean;
}

const leadershipItems: LeadershipItem[] = [
  {
    organization: 'AWS User Group Istanbul',
    location: 'İstanbul, Türkiye',
    role: 'Co-Organizer / Community Lead',
    period: 'Ekim 2025 - Günümüz',
    descriptionKeys: [
      'leadership.awsug.desc1',
      'leadership.awsug.desc2',
      'leadership.awsug.desc3',
      'leadership.awsug.desc4'
    ],
    image: '/leadership-community/user-group-istanbul.webp',
    featured: true
  },
  {
    organization: 'RenaByte',
    location: 'İstanbul, Türkiye',
    role: 'Co-Founder & Team Lead',
    period: 'Temmuz 2024 - Ekim 2025',
    descriptionKeys: [
      'leadership.renabyte.desc1',
      'leadership.renabyte.desc2',
      'leadership.renabyte.desc3',
      'leadership.renabyte.desc4',
      'leadership.renabyte.desc5',
      'leadership.renabyte.desc6'
    ],
    image: '/leadership-community/renabyte.webp',
    featured: true
  },
  {
    organization: 'Student Mentorship Program',
    location: 'İstanbul, Türkiye',
    role: 'Mentor',
    period: 'Ekim 2024 - Günümüz',
    descriptionKeys: [
      'leadership.sufle.desc1',
      'leadership.sufle.desc2',
      'leadership.sufle.desc3',
      'leadership.sufle.desc4',
      'leadership.sufle.desc5'
    ],
    image: '/leadership-community/mentor.webp',
    featured: true
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
    image: '/leadership-community/gdsc.webp',
    featured: false
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
    image: '/leadership-community/t3ai.webp',
    featured: false
  }
];

const Leadership = () => {
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

  const featuredItems = leadershipItems.filter(item => item.featured);
  const otherItems = leadershipItems.filter(item => !item.featured);
  
  return (
    <section id="leadership" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      
      <div className="container relative">
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

        {/* Featured - Compact cards with image on left */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.organization}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {item.organization}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">{item.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {translatePeriod(item.period)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" />
                    {translateLocation(item.location)}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {item.descriptionKeys.map((descKey, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{t(descKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other communities - Compact row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherItems.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.organization}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.organization}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-0.5">
                    <FiCalendar className="w-3 h-3" />
                    {translatePeriod(item.period)}
                  </span>
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
