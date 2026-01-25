import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiChevronLeft, FiChevronRight, FiX, FiMaximize2 } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventItem {
  titleKey: string;
  organization: string;
  location: string;
  date: string;
  descriptionKey: string;
  images: string[];
  type: 'speaker' | 'organizer' | 'participant' | 'workshop';
}

const Events = () => {
  const { t, language } = useLanguage();
  const isTR = language === 'tr';
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const translateLocation = (location: string) => {
    if (isTR) return location;
    return location
      .replace(/İstanbul, Türkiye/g, 'Istanbul, Turkey')
      .replace(/Türkiye/g, 'Turkey')
      .replace(/Ankara/g, 'Ankara')
      .replace(/Online/g, 'Online');
  };

  const translateDate = (date: string) => {
    if (isTR) return date;
    return date
      .replace(/Ocak/g, 'January')
      .replace(/Şubat/g, 'February')
      .replace(/Mart/g, 'March')
      .replace(/Nisan/g, 'April')
      .replace(/Mayıs/g, 'May')
      .replace(/Haziran/g, 'June')
      .replace(/Temmuz/g, 'July')
      .replace(/Ağustos/g, 'August')
      .replace(/Eylül/g, 'September')
      .replace(/Ekim/g, 'October')
      .replace(/Kasım/g, 'November')
      .replace(/Aralık/g, 'December');
  };

  const getTypeLabel = (type: EventItem['type']) => {
    const labels = {
      speaker: isTR ? 'Konuşmacı' : 'Speaker',
      organizer: isTR ? 'Organizatör' : 'Organizer',
      participant: isTR ? 'Katılımcı' : 'Participant',
      workshop: isTR ? 'Workshop' : 'Workshop'
    };
    return labels[type];
  };

  const getTypeBadgeColor = (type: EventItem['type']) => {
    const colors = {
      speaker: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      organizer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      participant: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      workshop: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    };
    return colors[type];
  };

  const events: EventItem[] = [
    {
      titleKey: 'events.druludag.title',
      organization: 'Uludağ Üniversitesi Veri Bilimi Topluluğu',
      location: 'Online',
      date: 'Aralık 2025',
      descriptionKey: 'events.druludag.desc',
      images: [
        '/events/dr-uludag-uni/1.webp',
        '/events/dr-uludag-uni/2.webp',
        '/events/dr-uludag-uni/3.webp',
        '/events/dr-uludag-uni/4.webp',
        '/events/dr-uludag-uni/5.webp'
      ],
      type: 'speaker'
    },
    {
      titleKey: 'events.reinvent2025.title',
      organization: 'AWS User Group Istanbul',
      location: 'AWS Türkiye Ofisi, İstanbul, Türkiye',
      date: 'Aralık 2025',
      descriptionKey: 'events.reinvent2025.desc',
      images: [
        '/events/ugi-reinvent-recap/1.webp',
        '/events/ugi-reinvent-recap/2.webp',
        '/events/ugi-reinvent-recap/3.webp',
        '/events/ugi-reinvent-recap/4.webp'
      ],
      type: 'organizer'
    },
    {
      titleKey: 'events.cloudday2025.title',
      organization: 'AWS & Sufle Teknoloji',
      location: 'İstanbul, Türkiye',
      date: 'Ekim 2025',
      descriptionKey: 'events.cloudday2025.desc',
      images: [
        '/events/cloud-day-2025/1.webp',
        '/events/cloud-day-2025/2.webp',
        '/events/cloud-day-2025/3.webp',
        '/events/cloud-day-2025/4.webp',
        '/events/cloud-day-2025/5.webp'
      ],
      type: 'participant'
    },
    {
      titleKey: 'events.kcd2025.title',
      organization: 'Kubernetes Community Days Istanbul',
      location: 'İstanbul Bilgi Üniversitesi, İstanbul, Türkiye',
      date: 'Mayıs 2025',
      descriptionKey: 'events.kcd2025.desc',
      images: [
        '/events/kcd-2025/1.webp',
        '/events/kcd-2025/2.webp',
        '/events/kcd-2025/3.webp'
      ],
      type: 'participant'
    },
    {
      titleKey: 'events.communityday2025.title',
      organization: 'Cloud Türkiye & Sufle Teknoloji',
      location: 'İstanbul, Türkiye',
      date: 'Nisan 2025',
      descriptionKey: 'events.communityday2025.desc',
      images: [
        '/events/community-day-2025/1.webp',
        '/events/community-day-2025/2.webp',
        '/events/community-day-2025/3.webp',
        '/events/community-day-2025/4.webp',
        '/events/community-day-2025/5.webp'
      ],
      type: 'participant'
    },
  ];

  // Carousel navigation
  const itemsPerView = 3; // Desktop'ta 3 kart göster
  const maxSlide = Math.max(0, events.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Gallery functions
  const openGallery = (event: EventItem, index: number = 0) => {
    setSelectedEvent(event);
    setCurrentImageIndex(index);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <>
      <section id="events" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
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
              <span className="text-gradient">🎤 {t('events.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('events.subtitle')}
          </p>
        </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {events.length > itemsPerView && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all ${
                    currentSlide === 0 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110'
                  }`}
                >
                  <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide >= maxSlide}
                  className={`absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all ${
                    currentSlide >= maxSlide 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110'
                  }`}
                >
                  <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </>
            )}

            {/* Slider */}
            <div className="overflow-hidden" ref={sliderRef}>
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${currentSlide * (100 / itemsPerView + 2)}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {events.map((event, index) => (
                  <motion.div
                    key={`${event.titleKey}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                  >
                    {/* Event Image with Gallery */}
                    <div 
                      className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                      onClick={() => openGallery(event)}
                    >
                      <img
                        src={event.images[0]}
                        alt={t(event.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(event.type)}`}>
                          {getTypeLabel(event.type)}
                        </span>
                      </div>
                      {event.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium">
                          📷 {event.images.length} {isTR ? 'fotoğraf' : 'photos'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Event Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t(event.titleKey)}
                      </h3>
                      
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {event.organization}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                        {t(event.descriptionKey)}
                      </p>

                      <button
                        onClick={(e) => { e.stopPropagation(); setDetailEvent(event); }}
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1 mb-3"
                      >
                        <FiMaximize2 className="w-3.5 h-3.5" />
                        {isTR ? 'Detayları Gör' : 'View Details'}
                      </button>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {translateDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-3.5 h-3.5" />
                          {translateLocation(event.location)}
                        </span>
            </div>
          </div>
                  </motion.div>
                ))}
              </motion.div>
          </div>

            {/* Dots Indicator */}
            {events.length > itemsPerView && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentSlide 
                        ? 'bg-blue-600 dark:bg-blue-400 w-8' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
              />
            ))}
          </div>
        )}
      </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {detailEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setDetailEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={detailEvent.images[0]}
                  alt={t(detailEvent.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  className="absolute top-4 right-4 text-white/80 hover:text-white p-2 bg-black/30 rounded-full"
                  onClick={() => setDetailEvent(null)}
                >
                  <FiX className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getTypeBadgeColor(detailEvent.type)}`}>
                    {getTypeLabel(detailEvent.type)}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {t(detailEvent.titleKey)}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[40vh]">
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {detailEvent.organization}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {translateDate(detailEvent.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {translateLocation(detailEvent.location)}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {t(detailEvent.descriptionKey)}
                </p>

                {/* Photo Gallery Preview */}
                {detailEvent.images.length > 1 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      📷 {isTR ? 'Etkinlik Fotoğrafları' : 'Event Photos'} ({detailEvent.images.length})
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {detailEvent.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setDetailEvent(null); openGallery(detailEvent, idx); }}
                          className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={() => { setDetailEvent(null); openGallery(detailEvent); }}
                  className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  📷 {isTR ? 'Galeriyi Aç' : 'Open Gallery'}
                </button>
                <button
                  onClick={() => setDetailEvent(null)}
                  className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isTR ? 'Kapat' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
              onClick={closeGallery}
            >
              <FiX className="w-8 h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white/80 text-sm">
              {currentImageIndex + 1} / {selectedEvent.images.length}
            </div>

            {/* Navigation Buttons */}
            {selectedEvent.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/30 rounded-full"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                >
                  <FiChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/30 rounded-full"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                >
                  <FiChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Main Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedEvent.images[currentImageIndex]}
              alt={`${t(selectedEvent.titleKey)} - ${currentImageIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Thumbnail Strip */}
            {selectedEvent.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedEvent.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? 'border-white opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-75'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Events; 
