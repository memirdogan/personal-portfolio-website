import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Default to English
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object
const translations = {
  tr: {
    // Navigation
    'nav.about': 'Hakkında',
    'nav.experience': 'Deneyim',
    'nav.skills': 'Yetenekler',
    'nav.projects': 'Projeler',
    'nav.leadership': 'Liderlik',
    'nav.education': 'Eğitim',
    'nav.publications': 'Yayınlar',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.position': 'Jr. Cloud & Platform Engineer',
    'hero.description': 'AWS, Kubernetes ve Infrastructure as Code ile ölçeklenebilir bulut çözümleri geliştirme ve altyapı optimizasyonu',
    'hero.contactMe': 'İletişime Geç',
    
    // About Section
    'about.title': 'Hakkımda',
    'about.role': 'Jr. Cloud & Platform Engineer',
    'about.intro': 'Merhaba! Ben Musa Emir Doğan. Sufle\'de Jr. Cloud & Platform Engineer olarak çalışıyorum. AWS production altyapılarını yönetiyor, Kubernetes ortamları kuruyor ve DevOps süreçlerini optimize ediyorum. AWS Certified Cloud Practitioner sertifikasına sahibim.',
    'about.details': 'İstanbul Aydın Üniversitesi\'nde Yönetim Bilişim Sistemleri okuyorum ve 42 İstanbul\'da yazılım eğitimi aldım. Terraform, Kubernetes, Docker, Machine Learning ve bulut teknolojileri alanlarında uzmanlaşıyorum. Projelerimi açık kaynak olarak GitHub\'da yayınlıyorum: github.com/memirdogan',
    'about.highlight1.title': 'AWS Bulut Mühendisliği',
    'about.highlight1.desc': 'Amazon Web Services mimarisi ve çözümlerinde uzmanlaşma',
    'about.highlight2.title': 'DevOps Uygulamaları',
    'about.highlight2.desc': 'Modern DevOps metodolojileri ve otomasyon uygulama',
    'about.highlight3.title': 'Infrastructure as Code',
    'about.highlight3.desc': 'Kod aracılığıyla ölçeklenebilir ve sürdürülebilir altyapı inşa etme',
    
    // Skills Section
    'skills.title': 'Teknik Yetenekler',
    'skills.subtitle': 'DevOps uygulamaları, bulut teknolojileri ve altyapı otomasyonunda sahip olduğum teknik yetenekler',
    
    // Experience Section
    'experience.title': 'Profesyonel Deneyim',
    'experience.subtitle': 'Modern DevOps uygulamaları ile bulut altyapısı inşa etme ve ölçeklendirme',
    'experience.sufle.desc1': 'Terragrunt kullanarak AWS production altyapısını yönetme ve Infrastructure as Code iş akışlarını optimize etme',
    'experience.sufle.desc2': 'MSSQL veritabanını EC2\'dan Amazon RDS\'e migrate ederek operasyonel yükü ve maliyetleri %50 azaltma',
    'experience.sufle.desc3': 'Sıfırdan Kubernetes ortamı kurma: Karpenter, Metric-Server, Ingress Nginx, AWS Load Balancer Controller ve Cert-Manager entegrasyonu',
    'experience.sufle.desc4': 'Bitbucket CI/CD pipeline\'ları ile AWS ECR entegrasyonu yaparak microservices deployment\'ını otomatikleştirme',
    'experience.sufle.desc5': 'New Relic\'te logging, metrics ve alert sistemleri kurma, on-call rotasyonlarda performans izleme',
    'experience.sufle.desc6': 'Fluent Bit - OpenSearch log forwarding ve parsing geliştirerek log analytics yeteneklerini artırma',
    'experience.sufle.desc7': 'S3 static site migration\'ında VPN, PrivateLink ve Route 53 Private Hosted Zone entegrasyonu',
    'experience.sufle.desc8': 'ECS blue/green deployment\'lar ve production workload\'lar için RDS Proxy troubleshooting',
    'experience.sufle.desc9': 'Müşteri taleplerinin teslimat süresini %50 azaltarak takım verimliliğini artırma',
    'experience.renabyte.desc1': 'Sağlık teknolojileri alanında RenaByte Teknofest takımını kurma ve Co-Founder & Team Lead olarak yönetme',
    'experience.renabyte.desc2': 'TEKNOFEST 2025 İnsanlık Yararına Teknoloji yarışmasında İstanbul 1., genel 7. sırada yarı finale çıkma',
    'experience.renabyte.desc3': '8 kişilik multidisipliner takımın tüm cloud altyapısını tasarlama ve yönetme (renabyte.com)',
    'experience.renabyte.desc4': 'Takım koordinasyonu, sprint planlama, task takibi ve literatür düzenlemesi yapma',
    'experience.renabyte.desc5': 'Akbis platformu için end-to-end proje yönetimi ve teknik liderlik',
    'experience.renabyte.desc6': 'DevOps süreçleri, CI/CD pipeline kurulumu ve production deployment yönetimi',
    'experience.ybs.desc1': 'SQL sorguları kullanarak yapılandırılmış verileri analiz etme ve manipüle etme',
    'experience.ybs.desc2': 'BeautifulSoup ve Selenium ile web scraping yaparak veri çıkarma ve analiz süreçlerini gerçekleştirme',
    'experience.ybs.desc3': 'Python tabanlı araçlar kullanarak rutin görevleri ve veri toplama süreçlerini otomatikleştirme',
    'experience.etruskai.desc1': 'Kaggle yarışması için DeBERTa mimarisine dayalı büyük dil modeli (LLM) geliştirme ve fine-tune etme',
    'experience.etruskai.desc2': 'Metin verilerinde Kişisel Tanımlanabilir Bilgileri (PII) tespit etmek ve çıkarmak için model oluşturma',
    'experience.etruskai.desc3': 'Dataset inceleme, preprocessing ve model performansını etkileyen temel kalıpları belirleme (EDA)',
    'experience.etruskai.desc4': 'Python ve Jupyter Notebook kullanarak makine öğrenimi modelleri oluşturma ve geliştirme',
    
    // Leadership Section
    'leadership.title': 'Liderlik & Topluluk',
    'leadership.subtitle': 'Teknoloji topluluklarına liderlik etme, inovasyonu teşvik etme ve işbirlikçi takımlar kurma',
    'leadership.renabyte.desc1': 'RenaByte Teknofest takımını kurarak "Teknolojiyle Umudu Yeniden Canlandır" vizyonuyla sağlık teknolojileri alanında liderlik',
    'leadership.renabyte.desc2': 'TEKNOFEST 2025\'te 120 takım arasında İstanbul 1., genel sıralamada 7. olarak yarı finale çıkarma',
    'leadership.renabyte.desc3': 'Web Developer, Mobile Developer, Backend Developer, Database Admin, Researcher ekibini yönetme',
    'leadership.renabyte.desc4': 'Takım web sitesi (renabyte.com), sosyal medya stratejisi ve marka kimliği oluşturma',
    'leadership.renabyte.desc5': 'Agile metodolojisi, sprint planlaması ve cross-functional team coordination',
    'leadership.renabyte.desc6': 'Akbis kan bağışı platformu için product management ve stakeholder communication',
    'leadership.gdsc.desc1': 'Google Developer Student Clubs Co-Lead olarak öğrenci topluluğunu yönetme ve büyütme',
    'leadership.gdsc.desc2': 'Coffee Talk etkinlikleri, buluşmalar ve Cloud Horizon içerik üretimi organize etme',
    'leadership.gdsc.desc3': 'Yazılım dersleri verme, Build with AI konuşmaları yapma ve teknik webinar\'larda konuşmacı olarak katılım',
    'leadership.gdsc.desc4': 'Takım çalışması projeleri oluşturma ve ekip için collaborative development süreçleri yönetme',
    'leadership.gdsc.desc5': 'Google teknolojileri workshop\'ları ve hands-on training sessionları koordine etme',
    'leadership.gdsc.desc6': 'Öğrenci gelişimi için mentorship programları ve networking etkinlikleri organize etme',
    'leadership.t3ai.desc1': 'Türkiye\'nin yerli üretken yapay zeka modellerinin geliştirilmesine katkı',
    'leadership.t3ai.desc2': 'Yapay zeka teknolojilerinin hizmetlere entegrasyonu konusunda çalışma',
    'leadership.t3ai.desc3': 'AI alanında yetkin iş gücü oluşturulmasına destek verme',
    'leadership.t3ai.desc4': 'Topluluk etkinlikleri ve bilgi paylaşım platformları organize etme',
    
    // Projects Section
    'projects.title': 'Projeler',
    'projects.subtitle': 'Geliştirdiğim web siteleri, uygulamalar ve açık kaynak projeler',
    'projects.renabyte.desc': 'Teknolojiyle umudu yeniden canlandıran sağlık teknolojileri projesi. Sağlık alanında inovatif fikirler ve ileri teknolojilerle toplum sağlığına katkıda bulunan RenaByte takım web sitesi.',
    'projects.sunoa.desc': 'Premium güneş kremi ürünleri için modern e-ticaret platformu. Next.js 15, React 19 ve TypeScript ile geliştirildi. JAMstack mimarisi ve statik site üretimi özellikli.',
    'projects.minikube2048.desc': 'Minikube üzerinde Kubernetes ile 2048 oyun dağıtımı. Yapılandırılabilir kaynak yönetimi ve Helm ile güvenli secret entegrasyonu içerir.',
    'projects.terraform.desc': 'Terraform ile yönetilen mimari tasarım. Uygulamalar özel subnet\'lerde güvenli çalışır, NAT gateway ile internet erişimi ve load balancer ile trafik dağıtımı.',
    'projects.webscraping.desc': 'Beautiful Soup ve Selenium ile web scraping rehberi. Veri çıkarma, HTML temelleri, XPath ve CSS selector\'ları içerir. Trendyol scraping projesi dahil.',
    'projects.42piscine.desc': 'Ecole 42\'nin piscine eğitiminden projeler. C, C++, embedded sistemler, shell scripting ve diğer teknolojilerin karışımını sergiler.',
    'projects.viewMore': 'Tüm Projeleri GitHub\'da Görüntüle',
    
    // Publications Section
    'publications.title': 'Yayınlar',
    'publications.subtitle': 'Bulut teknolojileri, DevOps uygulamaları ve makine öğrenimi konularında bilgi ve deneyim paylaşımı',
    
    // Education Section
    'education.title': 'Eğitim & Sertifikalar',
    'education.subtitle': 'Bulut ve güvenlik alanlarında akademik geçmiş ve profesyonel sertifikalar',
    'education.education': 'Eğitim',
    'education.certifications': 'Profesyonel Sertifikalar',
    
    // Contact Section
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Bu platformlardan herhangi biri aracılığıyla bana ulaşmaktan çekinmeyin',
    'contact.downloadResume': 'CV İndir',
    
    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',
    
    // Common
    'common.readMore': 'Devamını Oku',
    'common.viewProject': 'Projeyi Görüntüle',
    'common.external': 'Harici Link',
    'common.english': 'İngilizce'
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.leadership': 'Leadership',
    'nav.education': 'Education',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.position': 'Jr. Cloud & Platform Engineer',
    'hero.description': 'Building scalable cloud solutions and optimizing infrastructure with AWS, Kubernetes, and Infrastructure as Code',
    'hero.contactMe': 'Contact Me',
    
    // About Section
    'about.title': 'About Me',
    'about.role': 'Jr. Cloud & Platform Engineer',
    'about.intro': 'Hello! I\'m Musa Emir Doğan. I work as a Jr. Cloud & Platform Engineer at Sufle. I manage AWS production infrastructures, set up Kubernetes environments, and optimize DevOps processes. I hold AWS Certified Cloud Practitioner certification.',
    'about.details': 'I study Management Information Systems at Istanbul Aydın University and completed software training at 42 Istanbul. I specialize in Terraform, Kubernetes, Docker, Machine Learning, and cloud technologies. I publish my projects as open source on GitHub: github.com/memirdogan',
    'about.highlight1.title': 'AWS Cloud Engineering', 
    'about.highlight1.desc': 'Specializing in Amazon Web Services architecture and solutions',
    'about.highlight2.title': 'DevOps Practices',
    'about.highlight2.desc': 'Implementing modern DevOps methodologies and automation',
    'about.highlight3.title': 'Infrastructure as Code',
    'about.highlight3.desc': 'Building scalable and maintainable infrastructure through code',
    
    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Technical skills in DevOps practices, cloud technologies, and infrastructure automation',
    
    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'Building and scaling cloud infrastructure with modern DevOps practices',
    'experience.sufle.desc1': 'Managed AWS production infrastructure using Terragrunt and optimized Infrastructure as Code workflows',
    'experience.sufle.desc2': 'Migrated MSSQL database from EC2 to Amazon RDS, reducing operational overhead and costs by 50%',
    'experience.sufle.desc3': 'Built Kubernetes environment from scratch: Karpenter, Metric-Server, Ingress Nginx, AWS Load Balancer Controller, and Cert-Manager integration',
    'experience.sufle.desc4': 'Automated microservices deployment via Bitbucket CI/CD pipelines integrated with AWS ECR',
    'experience.sufle.desc5': 'Implemented logging, metrics, and alert systems in New Relic, actively participating in on-call rotations for performance monitoring',
    'experience.sufle.desc6': 'Developed and configured Fluent Bit – OpenSearch log forwarding and parsing, enhancing log analytics capabilities',
    'experience.sufle.desc7': 'Participated in S3 static site migration behind VPN with PrivateLink and Route 53 Private Hosted Zone integration',
    'experience.sufle.desc8': 'Contributed to ECS blue/green deployments and RDS Proxy troubleshooting for production workloads',
    'experience.sufle.desc9': 'Improved team throughput by reducing delivery time for customer requests by 50%',
    'experience.renabyte.desc1': 'Founded RenaByte Teknofest team in health technology sector, serving as Co-Founder & Team Lead',
    'experience.renabyte.desc2': 'Achieved TEKNOFEST 2025 semi-finals: 1st in Istanbul, 7th overall in Technology for Humanity competition',
    'experience.renabyte.desc3': 'Designed and managed entire cloud infrastructure for 8-person multidisciplinary team (renabyte.com)',
    'experience.renabyte.desc4': 'Led team coordination, sprint planning, task tracking, and literature organization',
    'experience.renabyte.desc5': 'Managed end-to-end project management and technical leadership for Akbis platform',
    'experience.renabyte.desc6': 'Established DevOps processes, CI/CD pipelines, and production deployment management',
    'experience.ybs.desc1': 'Analyzing and manipulating structured data using SQL queries',
    'experience.ybs.desc2': 'Performing data extraction and analysis through web scraping with BeautifulSoup and Selenium',
    'experience.ybs.desc3': 'Automating routine tasks and data collection processes using Python-based tools',
    'experience.etruskai.desc1': 'Built and fine-tuned a large language model (LLM) based on DeBERTa architecture for Kaggle competition',
    'experience.etruskai.desc2': 'Developed model to detect and extract Personally Identifiable Information (PII) in text data',
    'experience.etruskai.desc3': 'Contributed to exploratory data analysis (EDA), including dataset inspection, preprocessing, and identifying key patterns',
    'experience.etruskai.desc4': 'Built and developed machine learning models using Python and Jupyter Notebook',
    
    // Leadership Section
    'leadership.title': 'Leadership & Community',
    'leadership.subtitle': 'Leading technology communities, fostering innovation and building collaborative teams',
    'leadership.renabyte.desc1': 'Founded RenaByte Teknofest team with vision "Reviving Hope with Technology" leading health technology innovation',
    'leadership.renabyte.desc2': 'Led team to TEKNOFEST 2025 semi-finals: 1st in Istanbul, 7th among 120 teams nationally',
    'leadership.renabyte.desc3': 'Managed multidisciplinary team: Web Developer, Mobile Developer, Backend Developer, Database Admin, Researchers',
    'leadership.renabyte.desc4': 'Built team website (renabyte.com), social media strategy, and brand identity',
    'leadership.renabyte.desc5': 'Implemented Agile methodology, sprint planning, and cross-functional team coordination',
    'leadership.renabyte.desc6': 'Led product management and stakeholder communication for Akbis blood donation platform',
    'leadership.gdsc.desc1': 'Served as Google Developer Student Clubs Co-Lead, managing and growing student community',
    'leadership.gdsc.desc2': 'Organized Coffee Talk events, meetups, and Cloud Horizon content production',
    'leadership.gdsc.desc3': 'Delivered software courses, presented Build with AI talks, and spoke at technical webinars',
    'leadership.gdsc.desc4': 'Created team collaboration projects and managed collaborative development processes',
    'leadership.gdsc.desc5': 'Coordinated Google technologies workshops and hands-on training sessions',
    'leadership.gdsc.desc6': 'Organized mentorship programs and networking events for student development',
    'leadership.t3ai.desc1': 'Contributing to the development of Turkey\'s indigenous generative AI models',
    'leadership.t3ai.desc2': 'Working on integration of AI technologies into services',
    'leadership.t3ai.desc3': 'Supporting the creation of competent workforce in AI field',
    'leadership.t3ai.desc4': 'Organizing community events and knowledge sharing platforms',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle': 'Websites, applications, and open source projects I\'ve developed',
    'projects.renabyte.desc': 'Healthcare technology project that revives hope through technology. RenaByte team website contributing to public health with innovative ideas and advanced technologies in healthcare.',
    'projects.sunoa.desc': 'Modern e-commerce platform for premium sunscreen products. Built with Next.js 15, React 19, and TypeScript. Features JAMstack architecture and static site generation.',
    'projects.minikube2048.desc': '2048 game deployment with Kubernetes on Minikube. Includes configurable resource management and secure secret integration using Helm.',
    'projects.terraform.desc': 'Terraform-managed architecture where applications run securely within private subnets. Internet access via NAT gateway and load balancer for traffic distribution.',
    'projects.webscraping.desc': 'Web scraping guide with Beautiful Soup and Selenium. Covers data extraction, HTML basics, XPath, and CSS selectors. Includes Trendyol scraping project.',
    'projects.42piscine.desc': 'Projects from Ecole 42\'s piscine training, showcasing a blend of C, C++, embedded systems, shell scripting, and other cutting-edge technologies.',
    'projects.viewMore': 'View All Projects on GitHub',
    
    // Publications Section
    'publications.title': 'Publications',
    'publications.subtitle': 'Sharing knowledge and experiences in cloud technologies, DevOps practices, and machine learning',
    
    // Education Section
    'education.title': 'Education & Certifications',
    'education.subtitle': 'Academic background and professional certifications in cloud and security',
    'education.education': 'Education',
    'education.certifications': 'Professional Certifications',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Feel free to reach out through any of these platforms',
    'contact.downloadResume': 'Download Resume',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.readMore': 'Read More',
    'common.viewProject': 'View Project',
    'common.external': 'External Link',
    'common.english': 'English'
  }
};
