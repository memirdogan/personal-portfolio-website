// Google Tag Manager utility functions
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// GTM Container ID
export const GTM_ID = 'GTM-54DNXLKH';

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window !== 'undefined' && GTM_ID) {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // GTM script
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtmScript);

    // GTM noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
};

// Push data to GTM dataLayer
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// GTM Events
export const gtmEvents = {
  // Page view
  pageView: (pageName: string, pagePath: string) => {
    pushToDataLayer({
      event: 'page_view',
      page_name: pageName,
      page_path: pagePath,
      page_title: document.title,
    });
  },

  // Custom event
  customEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    pushToDataLayer({
      event: eventName,
      ...parameters,
    });
  },

  // Conversion tracking
  conversion: (conversionName: string, value?: number, currency: string = 'TRY') => {
    pushToDataLayer({
      event: 'conversion',
      conversion_name: conversionName,
      conversion_value: value,
      conversion_currency: currency,
    });
  },

  // User engagement
  engagement: (action: string, category: string, label?: string) => {
    pushToDataLayer({
      event: 'engagement',
      engagement_action: action,
      engagement_category: category,
      engagement_label: label,
    });
  },

  // E-commerce tracking (for project views)
  ecommerce: (action: string, itemName: string, itemCategory: string) => {
    pushToDataLayer({
      event: 'ecommerce',
      ecommerce_action: action,
      item_name: itemName,
      item_category: itemCategory,
    });
  }
};

// Initialize GTM when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGTM);
  } else {
    initGTM();
  }
}
