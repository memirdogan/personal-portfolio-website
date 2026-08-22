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

  // 4x repeat ensures seamless infinite loop at any screen width
  const repeated = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="py-8 bg-slate-900 overflow-hidden">
      <div className="relative">
        {/* Gradient fade effects - matches bg exactly */}
        <div className="absolute left-0 top-0 w-28 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-28 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll">
          {repeated.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-28 h-28 mx-10"
            >
              <img
                src={brand.logo}
                alt={brand.alt}
                className="w-full h-full object-contain opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLine;
