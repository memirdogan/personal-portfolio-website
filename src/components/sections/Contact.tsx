import React from 'react';

import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
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
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FiGithub className="w-5 h-5" />,
    href: 'https://github.com/memirdogan',
    label: 'GitHub',
    color: 'hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900'
  },
  {
    icon: <FiLinkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/mudogan/',
    label: 'LinkedIn',
    color: 'hover:bg-blue-600 hover:text-white'
  },
  {
    icon: <FiMail className="w-5 h-5" />,
    href: 'mailto:musaemird@gmail.com',
    label: 'Email',
    color: 'hover:bg-red-500 hover:text-white'
  }
];

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="bg-white dark:bg-slate-900">
      <div className="container">
        <div
          className="max-w-xl mx-auto text-center"
        >
          <h2>{t('contact.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {t('contact.subtitle')}
          </p>

          {/* Resume Download */}
          <a
            href="/resume/emir-dogan-resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all text-sm font-medium"
            onClick={() => trackEvent('resume_download', 'conversion', 'CV Download', 1)}
          >
            <FiDownload className="w-4 h-4" />
            {t('contact.downloadResume')}
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-200 ${link.color}`}
                onClick={() => trackEvent('external_link_click', 'engagement', `${link.label}: ${link.href}`)}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
