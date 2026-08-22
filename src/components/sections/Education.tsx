import { motion } from 'framer-motion';
import { FiBook, FiAward, FiCalendar, FiMapPin, FiShield, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface EducationItem {
  school: string;
  location: string;
  degree: string;
  period: string;
  type: 'education' | 'certification';
  logo?: string;
  level?: string;
  credlyUrl?: string;
}

const educationItems: EducationItem[] = [
  {
    school: 'İstanbul Aydın Üniversitesi',
    location: 'İstanbul, Türkiye',
    degree: 'Lisans Derecesi - Yönetim Bilişim Sistemleri (Onur Derecesi ile Mezun)',
    period: '2022 - 2026',
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
    degree: 'AWS Certified Solutions Architect – Professional',
    period: 'Ağustos 2026 - Ağustos 2029',
    type: 'certification',
    location: 'AWS Cloud',
    level: 'Professional',
    logo: '/brands/aws-certified-solutions-architect-professional.png',
    credlyUrl: 'https://www.credly.com/badges/8170efc5-22b5-489d-ac33-f79cf9e79c1e/linked_in_profile'
  },
  {
    school: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified CloudOps Engineer – Associate',
    period: 'Mayıs 2026 - Mayıs 2029',
    type: 'certification',
    location: 'AWS Cloud',
    level: 'Associate',
    logo: '/brands/aws-certified-cloudops-engineer-associate.png',
    credlyUrl: 'https://www.credly.com/badges/6d8c1e4b-2118-4802-8601-0739a59e394c/linked_in_profile'
  },
  {
    school: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified Solutions Architect – Associate',
    period: 'Nisan 2026 - Nisan 2029',
    type: 'certification',
    location: 'AWS Cloud',
    level: 'Associate',
    logo: '/brands/aws-certified-solutions-architect-associate.png',
    credlyUrl: 'https://www.credly.com/badges/faa0a655-43d7-4419-9cf6-5d15d47ec4fb/linked_in_profile'
  },
  {
    school: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified AI Practitioner',
    period: 'Kasım 2025 - Kasım 2028',
    type: 'certification',
    location: 'AI/ML & Generative AI',
    level: 'Foundational',
    logo: '/brands/aws-certified-ai-practitioner.png',
    credlyUrl: 'https://www.credly.com/badges/ac608757-008f-4935-8c96-80e3e4d1f3cf/linked_in_profile'
  },
  {
    school: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified Cloud Practitioner',
    period: 'Nisan 2025 - Mayıs 2029',
    type: 'certification',
    location: 'AWS Cloud',
    level: 'Foundational',
    logo: '/brands/aws-certified-cloud-practitioner.png',
    credlyUrl: 'https://www.credly.com/badges/67396968-ff1e-4b20-8457-bcb7a90e0dd9/linked_in_profile'
  },
  {
    school: 'Cambly Inc.',
    degree: 'Cambly Certificate of Accomplishment',
    period: 'Ağustos 2025',
    type: 'certification',
    location: 'common.english',
    level: 'Certificate',
    credlyUrl: 'https://www.cambly.com/en/certificate/verify/e7ec2720?lang=en'
  }
];

const Education = () => {
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

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Professional':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Associate':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Foundational':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <section id="education" className="bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="section-title">
          <h2>{t('education.title')}</h2>
          <p className="section-subtitle">
            {t('education.subtitle')}
          </p>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="card-title flex items-center gap-2 mb-4">
            <FiBook className="text-blue-700 dark:text-blue-400" />
            {t('education.education')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationItems.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-blue-900/40 p-5 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <FiBook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white leading-tight mb-1">
                      {item.degree}
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {item.school}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {translatePeriod(item.period)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-3.5 h-3.5" />
                        {item.location.startsWith('common.') ? t(item.location) : translateLocation(item.location)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title flex items-center gap-2">
              <FiAward className="text-blue-700 dark:text-blue-400" />
              {t('education.certifications')}
            </h3>
            <a
              href="https://www.credly.com/users/musa-emir-dogan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <FiExternalLink className="w-4 h-4" />
              Credly
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-0.5"
              >
                {cert.credlyUrl && (
                  <a
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`View ${cert.degree} credential`}
                  />
                )}
                <div className="flex items-start gap-3">
                  {/* Badge/Logo */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.degree}
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <FiShield className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cert.degree.replace('AWS Certified ', '')}
                      </h4>
                      {cert.credlyUrl && (
                        <FiExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {cert.school}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {cert.level && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </span>
                      )}
                      <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {translatePeriod(cert.period)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
