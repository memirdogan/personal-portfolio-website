interface Brand {
  name: string;
  logo: string;
  alt: string;
}

const BrandLine = () => {
  const brands: Brand[] = [
    { name: 'AWS Cloud Practitioner', logo: '/brands/aws-certified-cloud-practitioner.png', alt: 'AWS Certified Cloud Practitioner badge' },
    { name: 'AWS AI Practitioner', logo: '/brands/aws-certified-ai-practitioner.png', alt: 'AWS Certified AI Practitioner badge' },
    { name: 'AWS Solutions Architect Associate', logo: '/brands/aws-certified-solutions-architect-associate.png', alt: 'AWS Certified Solutions Architect Associate badge' },
    { name: 'AWS CloudOps Engineer Associate', logo: '/brands/aws-certified-cloudops-engineer-associate.png', alt: 'AWS Certified CloudOps Engineer Associate badge' },
    { name: 'AWS Solutions Architect Professional', logo: '/brands/aws-certified-solutions-architect-professional.png', alt: 'AWS Certified Solutions Architect Professional badge' },
    { name: 'AWS User Group Leader', logo: '/brands/usergroups-badges_leader-dark.png', alt: 'AWS User Group Leader badge' },
    { name: 'RenaByte', logo: '/brands/renabyte-logo.png', alt: 'RenaByte team logo' },
    { name: '42 Istanbul', logo: '/brands/42-logo.png', alt: '42 Istanbul School logo' },
  ];

  return (
    <section className="py-8 bg-gray-900 overflow-hidden">
      <div className="relative">
        {/* Gradient fade effects */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* CSS-animated scrolling container */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {/* Render brands twice for seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-32 h-32 mx-8"
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
        </div>
      </div>
    </section>
  );
};

export default BrandLine;
