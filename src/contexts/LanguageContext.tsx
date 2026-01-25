import React, { createContext, useContext, useState, useEffect } from 'react';
// Analytics tracking function
const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

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
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    // Prefer URL param (?lang=tr|en), then localStorage, default 'en'
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang') as Language | null;
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const initialLang: Language = (urlLang === 'tr' || urlLang === 'en')
      ? urlLang
      : (savedLanguage === 'tr' || savedLanguage === 'en')
        ? savedLanguage
        : 'tr';
    setLanguage(initialLang);
  }, []);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.lang = language;
    // Reflect language in URL for shareability and SEO signals
    const params = new URLSearchParams(window.location.search);
    params.set('lang', language);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
    // Update meta title & descriptions for i18n
    const title = (translations[language] as any)['meta.title'] || document.title;
    const desc = (translations[language] as any)['meta.description'];
    if (title) document.title = title;
    if (desc) {
      const setMeta = (selector: string, attr: 'content' | 'value' = 'content') => {
        const el = document.querySelector<HTMLMetaElement>(selector);
        if (el) el.setAttribute(attr, desc);
      };
      setMeta('meta[name="description"]');
      const setProp = (property: string, content: string) => {
        const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
        if (el) el.setAttribute('content', content);
      };
      setProp('og:title', title);
      setProp('og:description', desc);
      setProp('twitter:title', title);
      setProp('twitter:description', desc);
    }
    
    // Track language switch
    trackEvent('language_switch', 'engagement', language);
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
     // Meta
     'meta.title': 'Musa Emir Doğan | Cloud & Platform Engineer @Sufle | DevOps | AWS Certified',
     'meta.description': 'Musa Emir Doğan - Sufle\'de Cloud & Platform Engineer. AWS Certified, Kubernetes, Docker, Terraform. Bulut altyapısı ve DevOps süreçlerinde deneyimli. Projelerimi inceleyin.',
    // Navigation
    'nav.about': 'Hakkında',
    'nav.experience': 'Deneyim',
    'nav.skills': 'Yetenekler',
    'nav.projects': 'Projeler',
    'nav.leadership': 'Liderlik',
    'nav.education': 'Eğitim',
    'nav.publications': 'Yayınlar',
    'nav.events': 'Etkinlikler',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.position': 'Cloud & Platform Engineer',
    'hero.description': 'AWS, Kubernetes ve Infrastructure as Code ile ölçeklenebilir bulut çözümleri geliştirme ve altyapı optimizasyonu',
    'hero.contactMe': 'İletişime Geç',
    
    // About Section
    'about.title': 'Hakkımda',
    'about.role': 'Cloud & Platform Engineer',
    'about.intro': 'Merhaba! Ben Musa Emir Doğan. Sufle\'de Cloud & Platform Engineer olarak çalışıyorum. AWS production altyapılarını yönetiyor, Kubernetes ortamları kuruyor ve DevOps süreçlerini optimize ediyorum. AWS Certified Cloud Practitioner sertifikasına sahibim.',
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
    'skills.cat.cloud': 'Bulut ve Backend Platformları',
    'skills.cat.aws': 'AWS Servisleri',
    'skills.cat.networking': 'Networking',
    'skills.cat.containers': 'Container ve Orkestrasyon',
    'skills.cat.devops': 'Altyapı ve DevOps',
    'skills.cat.programming': 'Programlama ve Script',
    'skills.cat.databases': 'Veritabanları',
    'skills.cat.observability': 'İzleme ve Gözlemlenebilirlik',
    'skills.cat.vcs': 'Versiyon Kontrol ve Proje Yönetimi',
    
    // Experience Section
    'experience.title': 'Profesyonel Deneyim',
    'experience.subtitle': 'Modern DevOps uygulamaları ile bulut altyapısı inşa etme ve ölçeklendirme',
    // Sufle Full-time Experience
    'experience.sufle.fulltime.desc1': 'AWS üzerinde bulut tabanlı mimarileri tasarlama ve işletme',
    'experience.sufle.fulltime.desc2': 'Terragrunt kullanarak AWS production altyapısını yönetme ve Infrastructure as Code iş akışlarını optimize etme',
    'experience.sufle.fulltime.desc3': 'MSSQL veritabanını Amazon RDS\'e migrate ederek operasyonel yükü ve maliyetleri %50 azaltma',
    'experience.sufle.fulltime.desc4': 'Sıfırdan Kubernetes ortamı kurma: Karpenter, Metric-Server, Ingress Nginx, AWS Load Balancer Controller ve Cert-Manager entegrasyonu',
    'experience.sufle.fulltime.desc5': 'Bitbucket CI/CD pipeline\'ları ile microservices deployment\'ını otomatikleştirme',
    'experience.sufle.fulltime.desc6': 'New Relic\'te logging, metrics ve alert sistemleri kurma, on-call rotasyonlarda performans izleme',
    'experience.sufle.fulltime.desc7': 'Fluent Bit - OpenSearch log forwarding ve parsing geliştirerek log analytics yeteneklerini artırma',
    'experience.sufle.fulltime.desc8': 'Transit Gateway ve Direct Connect kullanarak birden fazla AWS hesabında merkezi internet egress ve inspection mimarisi kurma',
    'experience.sufle.fulltime.desc9': 'Merkezi inspection VPC\'ler üzerinden gelen ve giden internet trafiğini yönetme',
    'experience.sufle.fulltime.desc10': 'Gateway Load Balancer (GWLB) ile AWS üzerinde Palo Alto NGFW deploy etme ve işletme',
    'experience.sufle.fulltime.desc11': 'Müşteri taleplerinin teslimat süresini %50 azaltarak takım verimliliğini artırma',
    
    // Sufle Internship Experience
    'experience.sufle.intern.desc1': 'Terraform kullanarak altyapı otomasyonu gerçekleştirmek ve yeniden kullanılabilir yapılandırmalar oluşturmak',
    'experience.sufle.intern.desc2': 'EC2, Load Balancer, NAT Gateway gibi AWS servislerini yapılandırarak güvenli ve optimize edilmiş mimariler tasarlamak',
    'experience.sufle.intern.desc3': 'Nginx ve Python web sunucularını kullanarak statik dosyaların barındırılmasını sağlamak',
    'experience.sufle.intern.desc4': 'Kubernetes ile yerel ortamda cluster yönetimi ve Helm chart oluşturma üzerine çalışmalar yapmak',
    'experience.sufle.intern.desc5': 'Proje teslimlerinde Terraform state yönetimi ve versiyon kontrolü stratejileri uygulamak',
    'experience.sufle.intern.desc6': 'Mentor rehberliğinde DevOps süreçleri ve CI/CD otomasyonları hakkında derinlemesine bilgi edinmek',
    'experience.renabyte.desc1': 'Sağlık teknolojileri alanında RenaByte Teknofest takımını kurma ve Co-Founder & Team Lead olarak yönetme',
    'experience.renabyte.desc2': 'TEKNOFEST 2025 İnsanlık Yararına Teknoloji yarışmasında İstanbul 1., genel 7. sırada yarı finale çıkma',
    'experience.renabyte.desc3': '8 kişilik multidisipliner takımın tüm cloud altyapısını tasarlama ve yönetme (renabyte.com)',
    'experience.renabyte.desc4': 'Takım koordinasyonu, sprint planlama, task takibi ve literatür düzenlemesi yapma',
    'experience.renabyte.desc5': 'Akbis platformu için end-to-end proje yönetimi ve teknik liderlik',
    'experience.renabyte.desc6': 'DevOps süreçleri, CI/CD pipeline kurulumu ve production deployment yönetimi',
    'experience.ybs.desc1': 'SQL sorguları kullanarak yapılandırılmış verileri analiz etme ve manipüle etme',
    'experience.ybs.desc2': 'BeautifulSoup ve Selenium ile web scraping yaparak veri çıkarma ve analiz süreçlerini gerçekleştirme',
    'experience.ybs.desc3': 'Python tabanlı araçlar kullanarak rutin görevleri ve veri toplama süreçlerini otomatikleştirme',
    'experience.ybs.desc4': 'Bash script yazarak Linux iş akışlarını %30 artırma',
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
    'leadership.awsug.desc1': 'AWS User Group Istanbul topluluğunu kurma ve aktif olarak yönetme',
    'leadership.awsug.desc2': 'Hands-on lab\'lar ve teknik workshop\'lar dahil AWS ve cloud-native etkinlikleri organize etme',
    'leadership.awsug.desc3': 'AWS en iyi uygulamalarını paylaşmak için bulut mühendisleri, geliştiriciler ve uygulayıcıları bir araya getirme',
    'leadership.awsug.desc4': 'Konuşmacı, içerik ve topluluk odaklı bilgi paylaşım girişimlerini koordine etme',
    'leadership.sufle.desc1': 'Sufle Teknoloji bünyesindeki Mentörlük Programı\'nda aktif mentor olarak görev alma',
    'leadership.sufle.desc2': 'Mentee\'lere kariyer yolculuklarında rehberlik ederek teknik ve profesyonel gelişimlerini destekleme',
    'leadership.sufle.desc3': 'Cloud, DevOps ve platform mühendisliği alanlarında bilgi ve deneyim paylaşımı yapma',
    'leadership.sufle.desc4': 'Düzenli 1:1 görüşmeler ile mentee\'lerin hedeflerini belirleme ve ilerleme takibi yapma',
    'leadership.sufle.desc5': 'Şirket kültürüne uyum ve takım içi iletişim konularında yeni çalışanlara destek sağlama',
    
    // Projects Section
    'projects.title': 'Projeler',
    'projects.subtitle': 'Geliştirdiğim web siteleri, uygulamalar ve açık kaynak projeler',
    'projects.akbis.desc': 'Bağışçıları ihtiyaç sahibi hastalarla buluşturan güvenli kan bağışı platformu. Tüm bulut, DevOps ve otomasyon yaşam döngüsü tasarlandı. Veri gizliliği ve güvene odaklanan güvenli bağışçı-alıcı eşleştirme mantığı. TEKNOFEST "İnsanlık Yararına Teknoloji" yarışması için oluşturuldu.',
    'projects.sunoa.desc': 'Premium güneş kremi ürünleri için modern e-ticaret platformu. Next.js 15, React 19 ve TypeScript ile JAMstack mimarisi kullanılarak geliştirildi. Performans ve SEO için statik site üretimi (SSG) uygulandı.',
    'projects.minikube2048.desc': 'Minikube üzerinde Kubernetes ile 2048 oyun dağıtımı. Yapılandırılabilir kaynak yönetimi ve Helm ile güvenli secret entegrasyonu içerir.',
    'projects.terraform.desc': 'Terraform ile yönetilen mimari tasarım. Uygulamalar özel subnet\'lerde güvenli çalışır, NAT gateway ile internet erişimi ve load balancer ile trafik dağıtımı.',
    'projects.webscraping.desc': 'Beautiful Soup ve Selenium ile web scraping rehberi. Veri çıkarma, HTML temelleri, XPath ve CSS selector\'ları içerir. Trendyol scraping projesi dahil.',
    'projects.42piscine.desc': 'Ecole 42\'nin piscine eğitiminden projeler. C, C++, embedded sistemler, shell scripting ve diğer teknolojilerin karışımını sergiler.',
    'projects.viewMore': 'Tüm Projeleri GitHub\'da Görüntüle',
    
    // Events Section
    'events.title': 'Etkinlikler',
    'events.subtitle': 'Katıldığım ve organize ettiğim teknoloji etkinlikleri, konferanslar ve workshop\'lar',
    'events.reinvent2025.title': 'AWS re:Invent 2025 Recap',
    'events.reinvent2025.desc': 'AWS User Group Istanbul olarak ilk etkinliğimizi tamamladık! 🎉\n\nAWS User Group Istanbul\'un ilk topluluk buluşmasını, Amazon Web Services Türkiye Ofisi\'nde gerçekleştirmek bizim için gerçekten çok özeldi.\n\n🔍 Neler yaptık?\n• AWS re:Invent 2025\'te duyurulan güncel ve heyecan verici yenilikleri birlikte değerlendirdik\n• Berkay Demirbas ile AWS üzerinde Multi-Instance Orchestration ve First-Party Analytics iş yüklerini ölçeklendirme konusunu gerçek dünya senaryoları üzerinden konuştuk\n• Gizem Gür bizlere re:Invent\'te öne çıkan yeni servisler ve gelişmelerden bahsetti\n• Pizza eşliğinde bol bol networking, teknik sohbet ve fikir paylaşımı yaptık\n\nBu ilk etkinlikte gösterilen ilgi ve enerji, AWS User Group Istanbul\'un ne kadar güçlü bir topluluk olabileceğini bize bir kez daha gösterdi. Bu daha başlangıç 🚀',
    'events.druludag.title': 'Bulutta Felaket Kurtarma ve İş Sürekliliği',
    'events.druludag.desc': '1.5 saatlik "Bulutta Felaket Kurtarma ve İş Sürekliliği" eğitimimizi başarıyla tamamladık! ☁️\n\nUludağ Üniversitesi Veri Bilimi Topluluğu ile bir araya gelip şu konuları derinlemesine ele aldık:\n\n📍 AWS Region / AZ mimarisi ve fiziksel dayanıklılık\n📍 RTO – RPO hesaplamaları ve farklı iş yükleri için hedef belirleme\n📍 Felaket türleri ve gerçek dünyadaki yüksek maliyetli kesinti örnekleri\n📍 DR stratejileri: Snapshot, replication, multi-region, active-active\n📍 İş sürekliliği & kriz yönetimi planları\n📍 Chaos engineering kültürü ve AWS FIS\n📍 Canlı DR Demo: Multi-AZ ALB + Auto Scaling + FIS ile instance failure simülasyonu\n\nBulutta dayanıklı sistemler tasarlamak sadece teknoloji değil; bir kültür meselesi.\n\n"Disaster Recovery, sadece IT\'nin işi değildir. Business Continuity tüm şirketin sorumluluğudur."',
    'events.cloudday2025.title': 'AWS Cloud Day Türkiye 2025',
    'events.cloudday2025.desc': 'Sufle ekibiyle birlikte AWS Cloud Day Türkiye 2025\'te standımızda yer aldık ve gerçekten harika geçti! ☁️\n\n🔗 Gün boyunca birçok değerli insanla tanıştık, fikir alışverişi yaptık ve Cloud Native çözümler, yüksek erişilebilirlik, modern mimariler ve AWS servisleri üzerine keyifli sohbetler gerçekleştirdik.\n\n🚀 Hem network hem de bilgi paylaşımı açısından çok verimli bir etkinlikti. Bizim için bulutun gücünü daha fazla insana anlatma ve yeni iş birliklerinin temelini atma fırsatı oldu.\n\nStandımıza uğrayan, bizlerle sohbet eden herkese teşekkürler. 🙌',
    'events.kcd2025.title': 'Kubernetes Community Day İstanbul 2025',
    'events.kcd2025.desc': 'İstanbul Bilgi Üniversitesi\'nde gerçekleştirilen KCD\'e Sufle ekibi olarak katıldık! 🚀\n\n📅 1. Gün:\n• KEDA, CI/CD süreçleri, ölçeklenebilirlik konularında ilham verici konuşmalar\n• Kubernetes ekosistemindeki yeni gelişmeler\n\n📅 2. Gün:\n• Telemetry, Fluent Bit, Observability oturumları\n• Kubernetes altyapılarında log yönetimi\n\nToplulukla bir arada olmak, öğrenmek ve paylaşmak çok keyifliydi ☁️\n\nOrganizasyonda emeği geçen Kubernetes Community Days Istanbul ekibine ve değerli ekip liderimiz Alp Kahvecioğlu\'na teşekkürler! 👏',
    'events.communityday2025.title': 'AWS Community Day Türkiye 2025',
    'events.communityday2025.desc': 'Bu yıl Sufle ile AWS Community Day Türkiye 2025 etkinliğine katılmak çok zevkliydi! 🌩️\n\nGeçtiğimiz yıl öğrenci olarak katıldığım bu etkinliğe bu kez bir Cloud & Platform Engineer olarak, sektörün içinden ve daha farklı bir perspektifle dahil oldum.\n\nStandda birçok kişiyle tanışıp sohbet etme fırsatı bulmak, deneyimlerimizi paylaşmak ve topluluğun bir parçası olmak harikaydı.\n\nBöylesine güzel bir organizasyona katkı sağlayan herkese başta Cloud Türkiye olmak üzere teşekkür ederim. 🙌',
    
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
     // Meta
     'meta.title': 'Musa Emir Doğan | Cloud & Platform Engineer @Sufle | DevOps | AWS Certified',
     'meta.description': 'Musa Emir Doğan - Cloud & Platform Engineer at Sufle. AWS Certified, experienced with Kubernetes, Docker, and Terraform. Skilled in cloud infrastructure and DevOps.',
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.leadership': 'Leadership',
    'nav.education': 'Education',
    'nav.publications': 'Publications',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.position': 'Cloud & Platform Engineer',
    'hero.description': 'Building scalable cloud solutions and optimizing infrastructure with AWS, Kubernetes, and Infrastructure as Code',
    'hero.contactMe': 'Contact Me',
    
    // About Section
    'about.title': 'About Me',
    'about.role': 'Cloud & Platform Engineer',
    'about.intro': 'Hello! I\'m Musa Emir Doğan. I work as a Cloud & Platform Engineer at Sufle. I manage AWS production infrastructures, set up Kubernetes environments, and optimize DevOps processes. I hold AWS Certified Cloud Practitioner certification.',
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
    'skills.cat.cloud': 'Cloud & Backend Platforms',
    'skills.cat.aws': 'AWS Services',
    'skills.cat.networking': 'Networking',
    'skills.cat.containers': 'Container & Orchestration',
    'skills.cat.devops': 'Infrastructure & DevOps',
    'skills.cat.programming': 'Programming & Scripting',
    'skills.cat.databases': 'Databases',
    'skills.cat.observability': 'Monitoring & Observability',
    'skills.cat.vcs': 'Version Control & Project Management',
    
    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'Building and scaling cloud infrastructure with modern DevOps practices',
    // Sufle Full-time Experience
    'experience.sufle.fulltime.desc1': 'Design and operate cloud-based architectures on AWS',
    'experience.sufle.fulltime.desc2': 'Manage AWS production infrastructure with Terragrunt and optimize Infrastructure as Code workflows',
    'experience.sufle.fulltime.desc3': 'Migrate MSSQL databases to Amazon RDS, reducing operational workload and costs by 50%',
    'experience.sufle.fulltime.desc4': 'Build Kubernetes environments from scratch with integrations such as Karpenter, Metric Server, Ingress Nginx, AWS Load Balancer Controller, and Cert-Manager',
    'experience.sufle.fulltime.desc5': 'Automate microservices deployment using Bitbucket CI/CD pipelines',
    'experience.sufle.fulltime.desc6': 'Set up logging, metrics, and alert systems in New Relic, and monitor performance during on-call rotations',
    'experience.sufle.fulltime.desc7': 'Improve log analytics capabilities by developing Fluent Bit – OpenSearch log forwarding and parsing',
    'experience.sufle.fulltime.desc8': 'Built centralized internet egress and inspection architecture across multiple AWS accounts using Transit Gateway and Direct Connect',
    'experience.sufle.fulltime.desc9': 'Managed inbound and outbound internet traffic via centralized inspection VPCs',
    'experience.sufle.fulltime.desc10': 'Deployed and operated Palo Alto NGFW on AWS with Gateway Load Balancer (GWLB)',
    'experience.sufle.fulltime.desc11': 'Increase team efficiency by reducing customer request delivery time by 50%',
    
    // Sufle Internship Experience
    'experience.sufle.intern.desc1': 'Implemented infrastructure automation using Terraform and created reusable configurations',
    'experience.sufle.intern.desc2': 'Configured AWS services such as EC2, Load Balancer, and NAT Gateway to design secure and optimized architectures',
    'experience.sufle.intern.desc3': 'Hosted static files using Nginx and Python web servers',
    'experience.sufle.intern.desc4': 'Worked on cluster management in local environment with Kubernetes and Helm chart creation',
    'experience.sufle.intern.desc5': 'Applied Terraform state management and version control strategies in project deliveries',
    'experience.sufle.intern.desc6': 'Gained in-depth knowledge about DevOps processes and CI/CD automation under mentor guidance',
    'experience.renabyte.desc1': 'Founded RenaByte Teknofest team in health technology sector, serving as Co-Founder & Team Lead',
    'experience.renabyte.desc2': 'Achieved TEKNOFEST 2025 semi-finals: 1st in Istanbul, 7th overall in Technology for Humanity competition',
    'experience.renabyte.desc3': 'Designed and managed entire cloud infrastructure for 8-person multidisciplinary team (renabyte.com)',
    'experience.renabyte.desc4': 'Led team coordination, sprint planning, task tracking, and literature organization',
    'experience.renabyte.desc5': 'Managed end-to-end project management and technical leadership for Akbis platform',
    'experience.renabyte.desc6': 'Established DevOps processes, CI/CD pipelines, and production deployment management',
    'experience.ybs.desc1': 'Analyzing and manipulating structured data using SQL queries',
    'experience.ybs.desc2': 'Performing data extraction and analysis through web scraping with BeautifulSoup and Selenium',
    'experience.ybs.desc3': 'Automating routine tasks and data collection processes using Python-based tools',
    'experience.ybs.desc4': 'Increase Linux workflows by 30% by writing scripts with Bash',
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
    'leadership.awsug.desc1': 'Co-founded and actively manage the AWS User Group Istanbul community',
    'leadership.awsug.desc2': 'Organize AWS and cloud-native events, including hands-on labs and technical workshops',
    'leadership.awsug.desc3': 'Bring together cloud engineers, developers, and practitioners to share AWS best practices',
    'leadership.awsug.desc4': 'Coordinate speakers, content, and community-driven knowledge sharing initiatives',
    'leadership.sufle.desc1': 'Serve as an active mentor in Sufle Technology\'s Mentorship Program',
    'leadership.sufle.desc2': 'Guide mentees in their career journey, supporting their technical and professional development',
    'leadership.sufle.desc3': 'Share knowledge and experience in Cloud, DevOps, and Platform Engineering domains',
    'leadership.sufle.desc4': 'Conduct regular 1:1 meetings to set mentee goals and track their progress',
    'leadership.sufle.desc5': 'Support new employees in adapting to company culture and team communication',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle': 'Websites, applications, and open source projects I\'ve developed',
    'projects.akbis.desc': 'Secure blood donation platform connecting donors with patients in need. Designed and implemented the entire cloud, DevOps, and automation lifecycle. Secure donor-recipient matching logic with a strong focus on data privacy and trust. Created for the TEKNOFEST "Technology for Humanity" competition.',
    'projects.sunoa.desc': 'Modern e-commerce platform for premium sunscreen products. Built with Next.js 15, React 19, and TypeScript using a JAMstack architecture. Implemented static site generation (SSG) for improved performance and SEO.',
    'projects.minikube2048.desc': '2048 game deployment with Kubernetes on Minikube. Includes configurable resource management and secure secret integration using Helm.',
    'projects.terraform.desc': 'Terraform-managed architecture where applications run securely within private subnets. Internet access via NAT gateway and load balancer for traffic distribution.',
    'projects.webscraping.desc': 'Web scraping guide with Beautiful Soup and Selenium. Covers data extraction, HTML basics, XPath, and CSS selectors. Includes Trendyol scraping project.',
    'projects.42piscine.desc': 'Projects from Ecole 42\'s piscine training, showcasing a blend of C, C++, embedded systems, shell scripting, and other cutting-edge technologies.',
    'projects.viewMore': 'View All Projects on GitHub',
    
    // Events Section
    'events.title': 'Events',
    'events.subtitle': 'Technology events, conferences, and workshops I\'ve participated in and organized',
    'events.reinvent2025.title': 'AWS re:Invent 2025 Recap',
    'events.reinvent2025.desc': 'We completed our first event as AWS User Group Istanbul! 🎉\n\nHosting the first community meetup of AWS User Group Istanbul at the Amazon Web Services Turkey Office was truly special for us.\n\n🔍 What did we do?\n• We reviewed the latest and exciting announcements from AWS re:Invent 2025\n• Discussed Multi-Instance Orchestration and First-Party Analytics workload scaling with Berkay Demirbas through real-world scenarios\n• Gizem Gür shared insights about new services and developments highlighted at re:Invent\n• Enjoyed plenty of networking, technical discussions, and idea sharing over pizza\n\nThe interest and energy shown at this first event once again demonstrated how strong a community AWS User Group Istanbul can be. This is just the beginning 🚀',
    'events.druludag.title': 'Disaster Recovery & Business Continuity in the Cloud',
    'events.druludag.desc': 'Successfully completed our 1.5-hour "Disaster Recovery and Business Continuity in the Cloud" training! ☁️\n\nWe gathered with Uludağ University Data Science Community and covered these topics in depth:\n\n📍 AWS Region / AZ architecture and physical resilience\n📍 RTO – RPO calculations and target setting for different workloads\n📍 Disaster types and real-world high-cost outage examples\n📍 DR strategies: Snapshot, replication, multi-region, active-active\n📍 Business continuity & crisis management plans\n📍 Chaos engineering culture and AWS FIS\n📍 Live DR Demo: Instance failure simulation with Multi-AZ ALB + Auto Scaling + FIS\n\nDesigning resilient systems in the cloud is not just about technology; it\'s a cultural matter.\n\n"Disaster Recovery is not just IT\'s job. Business Continuity is the responsibility of the entire company."',
    'events.cloudday2025.title': 'AWS Cloud Day Turkey 2025',
    'events.cloudday2025.desc': 'We participated at our booth with the Sufle team at AWS Cloud Day Turkey 2025 and it was truly amazing! ☁️\n\n🔗 Throughout the day, we met many valuable people, exchanged ideas, and had enjoyable conversations about Cloud Native solutions, high availability, modern architectures, and AWS services.\n\n🚀 It was a very productive event in terms of both networking and knowledge sharing. It was an opportunity for us to explain the power of the cloud to more people and lay the foundation for new collaborations.\n\nThanks to everyone who stopped by our booth and chatted with us. 🙌',
    'events.kcd2025.title': 'Kubernetes Community Day Istanbul 2025',
    'events.kcd2025.desc': 'We participated in KCD held at Istanbul Bilgi University with the Sufle team! 🚀\n\n📅 Day 1:\n• Inspiring talks on KEDA, CI/CD processes, scalability\n• New developments in the Kubernetes ecosystem\n\n📅 Day 2:\n• Telemetry, Fluent Bit, Observability sessions\n• Log management in Kubernetes infrastructures\n\nBeing together with the community, learning and sharing was very enjoyable ☁️\n\nThanks to the Kubernetes Community Days Istanbul team and our valuable team leader Alp Kahvecioğlu for their efforts in the organization! 👏',
    'events.communityday2025.title': 'AWS Community Day Turkey 2025',
    'events.communityday2025.desc': 'It was a pleasure to participate in AWS Community Day Turkey 2025 with Sufle this year! 🌩️\n\nThis time, I joined this event as a Cloud & Platform Engineer, from within the industry and with a different perspective, whereas last year I participated as a student.\n\nIt was wonderful to have the opportunity to meet and chat with many people at the booth, share our experiences, and be part of the community.\n\nThanks to everyone who contributed to such a beautiful organization, especially Cloud Türkiye. 🙌',
    
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
