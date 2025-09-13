import { useEffect, useRef } from 'react';
import { trackPortfolioEvent } from '../utils/analytics';

interface UseScrollTrackingOptions {
  sectionName: string;
  threshold?: number; // 0-1 arası, sayfanın yüzde kaçı görünür olunca track edilsin
}

export const useScrollTracking = ({ sectionName, threshold = 0.5 }: UseScrollTrackingOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            const scrollDepth = Math.round((entry.boundingClientRect.top / window.innerHeight) * 100);
            trackPortfolioEvent.sectionView(sectionName, Math.abs(scrollDepth));
            hasTracked.current = true;
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '-10% 0px -10% 0px', // Section'ın %10'u görünür olunca track et
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionName, threshold]);

  return sectionRef;
};

// Time on page tracking hook
export const useTimeOnPage = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackPortfolioEvent.timeOnPage(timeSpent, pageName);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageName]);
};
