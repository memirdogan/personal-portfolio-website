import React from 'react';
import { motion } from 'framer-motion';

interface Brand {
  name: string;
  logo: string;
  alt: string;
}

const BrandLine = () => {
  // Brand logoları
  const brands: Brand[] = [
    { name: 'Sufle', logo: '/brands/sufle-logo.png', alt: 'Sufle Teknoloji logo' },
    { name: 'AWS Cloud Practitioner', logo: '/brands/aws-certified.png', alt: 'AWS Certified Cloud Practitioner badge' },
    { name: 'RenaByte', logo: '/brands/renabyte-logo.png', alt: 'RenaByte team logo' },
    { name: 'GDSC', logo: '/brands/gdsc-logo.png', alt: 'Google Developer Student Clubs logo' },
    { name: 'T3 AI', logo: '/brands/t3ai-logo.png', alt: 'T3 AI community logo' },
    { name: '42 School', logo: '/brands/42-logo.png', alt: '42 School logo' },
  ];

  // Logoları beş kez tekrarlayarak kesintisiz döngü oluştur
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-8 bg-gray-900 overflow-hidden">
      <div className="relative">
        {/* Gradient fade effects */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex">
          <motion.div
            className="flex items-center gap-16"
            animate={{
              x: [`0%`, `-${100 / duplicatedBrands.length * brands.length}%`],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ 
              display: 'flex',
              width: 'max-content'
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-40 p-2"
                style={{ marginRight: '4rem' }}
              >
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

export default BrandLine;
