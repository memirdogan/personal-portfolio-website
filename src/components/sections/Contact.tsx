import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
// Analytics tracking functions
const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  onClick?: () => void;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FiGithub className="w-6 h-6" />,
    href: 'https://github.com/memirdogan',
    label: 'GitHub'
  },
  {
    icon: <FiLinkedin className="w-6 h-6" />,
    href: 'https://www.linkedin.com/in/mudogan/',
    label: 'LinkedIn'
  },
  {
    icon: <FiMail className="w-6 h-6" />,
    href: 'mailto:musaemird@gmail.com',
    label: 'Email',
    onClick: () => trackEvent('email_click', 'conversion', 'primary_email', 1)
  }
];

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">📫 {t('contact.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t('contact.subtitle')}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <a
              href="/resume/emir-dogan-resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 glass dark:glass-dark rounded-xl hover:scale-105 transition-transform"
              onClick={() => trackEvent('resume_download', 'conversion', 'CV Download', 1)}
            >
              <FiDownload className="w-5 h-5 text-accent-blue dark:text-accent-purple" />
              <span className="font-medium">{t('contact.downloadResume')}</span>
            </a>
          </motion.div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass dark:glass-dark rounded-xl hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  }
                  trackEvent('external_link_click', 'engagement', `${link.label}: ${link.href}`);
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent-blue dark:text-accent-purple">
                  {link.icon}
                </span>
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 