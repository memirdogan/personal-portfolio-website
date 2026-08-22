import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiX } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface LeadershipItem {
  organization: string;
  location: string;
  role: string;
  period: string;
  descriptionKeys: string[];
  image?: string;
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
    image: '/leadership-community/user-group-istanbul.webp'
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
    image: '/leadership-community/mentor.webp'
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
  const { t, language } = useLanguage();
  const isTR = language === 'tr';
  const [selectedItem, setSelectedItem] = useState<LeadershipItem | null>(null);

  // Lock body scroll when modal open
  const openModal = (item: LeadershipItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  };

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

  // Split: top row 3, bottom row 2
  const topRow = leadershipItems.slice(0, 3);
  const bottomRow = leadershipItems.slice(3);

  const Card = ({ item }: { item: LeadershipItem; index: number }) => (
    <div
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex flex-col justify-end cursor-pointer"
      onClick={() => openModal(item)}
    >
      <img
        src={item.image}
        alt={item.organization}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Dark overlay - stronger at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative p-4 sm:p-5">
        {(item.period.includes('Günümüz') || item.period.includes('Present')) && (
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-[10px] font-semibold text-emerald-300 mb-2">
            {isTR ? 'Aktif' : 'Active'}
          </span>
        )}
        <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-0.5">
          {item.organization}
        </h3>
        <p className="text-xs text-blue-300 font-medium mb-2">{item.role}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            {translatePeriod(item.period)}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin className="w-3 h-3" />
            {translateLocation(item.location)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="leadership" className="bg-white dark:bg-slate-900">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="text-gradient">🏆 {t('leadership.title')}</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {/* Top row - 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRow.map((item, index) => (
              <Card key={item.organization} item={item} index={index} />
            ))}
          </div>

          {/* Bottom row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-[calc(66.666%+0.5rem)] mx-auto">
            {bottomRow.map((item, index) => (
              <Card key={item.organization} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto sm:mx-4 mx-0 sm:rounded-2xl rounded-none sm:max-h-[90vh] max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.organization}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => closeModal()}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-lg font-bold text-white">{selectedItem.organization}</h3>
                  <p className="text-sm text-blue-300 font-medium">{selectedItem.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {translatePeriod(selectedItem.period)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5" />
                    {translateLocation(selectedItem.location)}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {selectedItem.descriptionKeys.map((descKey, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <span className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>{t(descKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Leadership;
