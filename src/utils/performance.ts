// Performance monitoring utilities for Core Web Vitals
export const performanceMetrics = {
  // Measure Core Web Vitals
  measureWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const measureLCP = () => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
          });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // First Input Delay (FID)
    const measureFID = () => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          // Send to Google Analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
            });
          }
        });
      }).observe({ entryTypes: ['first-input'] });
    };

    // Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
        
        // Send to Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
          });
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Measure all metrics
    measureLCP();
    measureFID();
    measureCLS();
  },

  // Measure page load time
  measurePageLoad: () => {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log('Page Load Time:', loadTime);
      
      // Send to Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_load_time', {
          event_category: 'Performance',
          event_label: 'Load Time',
          value: Math.round(loadTime),
        });
      }
    });
  },

  // Measure image load performance
  measureImageLoad: (imageSrc: string) => {
    if (typeof window === 'undefined') return;

    const img = new Image();
    const startTime = performance.now();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image Load Time (${imageSrc}):`, loadTime);
      
      // Send to Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'image_load_time', {
          event_category: 'Performance',
          event_label: imageSrc,
          value: Math.round(loadTime),
        });
      }
    };
    
    img.src = imageSrc;
  },

  // Measure scroll performance
  measureScrollPerformance: () => {
    if (typeof window === 'undefined') return;

    let scrollStartTime = 0;
    let scrollEndTime = 0;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        scrollStartTime = performance.now();
        isScrolling = true;
      }
    };

    const handleScrollEnd = () => {
      if (isScrolling) {
        scrollEndTime = performance.now();
        const scrollDuration = scrollEndTime - scrollStartTime;
        
        console.log('Scroll Duration:', scrollDuration);
        
        // Send to Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'scroll_performance', {
            event_category: 'Performance',
            event_label: 'Scroll Duration',
            value: Math.round(scrollDuration),
          });
        }
        
        isScrolling = false;
      }
    };

    // Throttle scroll events
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      handleScrollStart();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    });
  },

  // Measure resource loading
  measureResourceLoading: () => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          console.log(`Resource Load: ${resource.name} - ${resource.duration}ms`);
          
          // Send to Google Analytics for slow resources
          if (resource.duration > 1000 && typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'slow_resource', {
              event_category: 'Performance',
              event_label: resource.name,
              value: Math.round(resource.duration),
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Wait for page to be fully loaded
  if (document.readyState === 'complete') {
    performanceMetrics.measureWebVitals();
    performanceMetrics.measurePageLoad();
    performanceMetrics.measureScrollPerformance();
    performanceMetrics.measureResourceLoading();
  } else {
    window.addEventListener('load', () => {
      performanceMetrics.measureWebVitals();
      performanceMetrics.measurePageLoad();
      performanceMetrics.measureScrollPerformance();
      performanceMetrics.measureResourceLoading();
    });
  }
};
