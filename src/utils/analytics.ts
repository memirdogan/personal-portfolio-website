// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-CVPZDJ1DQK';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = function() {
      (window.gtag as any).q = (window.gtag as any).q || [];
      (window.gtag as any).q.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific portfolio events
export const trackPortfolioEvent = {
  // Language switch
  languageSwitch: (language: string) => {
    trackEvent('language_switch', 'engagement', language);
  },
  
  // Project view
  projectView: (projectName: string) => {
    trackEvent('project_view', 'engagement', projectName);
  },
  
  // External link click
  externalLinkClick: (linkType: string, url: string) => {
    trackEvent('external_link_click', 'engagement', `${linkType}: ${url}`);
  },
  
  // Resume download
  resumeDownload: () => {
    trackEvent('resume_download', 'conversion', 'CV Download');
  },
  
  // Contact form interaction
  contactInteraction: (action: string) => {
    trackEvent('contact_interaction', 'engagement', action);
  },
  
  // Section view (scroll tracking)
  sectionView: (sectionName: string) => {
    trackEvent('section_view', 'engagement', sectionName);
  }
};
