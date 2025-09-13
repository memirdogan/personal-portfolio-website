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

// Track custom events with enhanced parameters
export const trackEvent = (action: string, category: string, label?: string, value?: number, customParameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters,
    });
  }
};

// Track conversion events
export const trackConversion = (conversionName: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'conversion',
      event_label: conversionName,
      value: value,
      currency: currency || 'TRY',
    });
  }
};

// Track specific portfolio events with enhanced parameters
export const trackPortfolioEvent = {
  // Language switch with user preference tracking
  languageSwitch: (language: string) => {
    trackEvent('language_switch', 'engagement', language, undefined, {
      user_language_preference: language,
      page_language: document.documentElement.lang,
    });
  },
  
  // Project view with detailed project info
  projectView: (projectName: string, projectType?: string) => {
    trackEvent('project_view', 'engagement', projectName, undefined, {
      project_name: projectName,
      project_type: projectType || 'portfolio',
      page_section: 'projects',
    });
  },
  
  // External link click with destination tracking
  externalLinkClick: (linkType: string, url: string, linkContext?: string) => {
    trackEvent('external_link_click', 'engagement', `${linkType}: ${url}`, undefined, {
      link_type: linkType,
      destination_url: url,
      link_context: linkContext || 'portfolio',
      outbound_link: true,
    });
  },
  
  // Resume download as conversion
  resumeDownload: () => {
    trackEvent('resume_download', 'conversion', 'CV Download', 1, {
      conversion_type: 'lead_generation',
      file_type: 'pdf',
    });
    trackConversion('CV Download', 1, 'TRY');
  },
  
  // Email click as conversion
  emailClick: (emailType: string) => {
    trackEvent('email_click', 'conversion', emailType, 1, {
      conversion_type: 'contact',
      contact_method: 'email',
    });
    trackConversion('Email Contact', 1, 'TRY');
  },
  
  // Contact form interaction
  contactInteraction: (action: string, formType?: string) => {
    trackEvent('contact_interaction', 'engagement', action, undefined, {
      interaction_type: action,
      form_type: formType || 'contact',
    });
  },
  
  // Section view with scroll depth
  sectionView: (sectionName: string, scrollDepth?: number) => {
    trackEvent('section_view', 'engagement', sectionName, scrollDepth, {
      section_name: sectionName,
      scroll_depth: scrollDepth || 0,
      page_section: sectionName.toLowerCase(),
    });
  },
  
  // Social media engagement
  socialMediaClick: (platform: string, action: string) => {
    trackEvent('social_media_click', 'engagement', `${platform}: ${action}`, undefined, {
      social_platform: platform,
      social_action: action,
      conversion_type: 'social_engagement',
    });
  },
  
  // Time on page tracking
  timeOnPage: (timeSpent: number, page: string) => {
    trackEvent('time_on_page', 'engagement', page, timeSpent, {
      time_spent_seconds: timeSpent,
      page_name: page,
      engagement_level: timeSpent > 30 ? 'high' : timeSpent > 10 ? 'medium' : 'low',
    });
  }
};
