import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiGrid, FiList } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import OptimizedImage from '../OptimizedImage';

// Analytics tracking functions
const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

interface ProjectItem {
  title: string;
  descriptionKey: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

const Projects = () => {
  const { t, language } = useLanguage();
  const isTR = language === 'tr';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const projects: ProjectItem[] = [
    {
      title: 'AKBIS (RenaByte) – Blood Donation Platform',
      descriptionKey: 'projects.akbis.desc',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'DevOps'],
      liveUrl: 'https://renabyte.com',
      image: '/projects/renabyte.webp',
      featured: true
    },
    {
      title: 'Sunoa – E-Commerce Platform',
      descriptionKey: 'projects.sunoa.desc',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'JAMstack'],
      githubUrl: 'https://github.com/memirdogan/sunoa-ecommerce-website',
      liveUrl: 'https://sunoa.memir.codes',
      image: '/projects/sunoa.webp',
      featured: true
    },
    {
      title: 'Minikube-2048',
      descriptionKey: 'projects.minikube2048.desc',
      technologies: ['Kubernetes', 'Minikube', 'Helm', 'Docker'],
      githubUrl: 'https://github.com/memirdogan/k8s-minikube-2048',
      image: '/projects/minikube2048.webp',
      featured: false
    },
    {
      title: 'Terraform Architecture Design',
      descriptionKey: 'projects.terraform.desc',
      technologies: ['Terraform', 'AWS', 'VPC', 'NAT Gateway', 'Load Balancer'],
      githubUrl: 'https://github.com/memirdogan/Terraform-Architecture-deploy',
      image: '/projects/terraform.webp',
      featured: false
    },
    {
      title: 'Web Scraping with Beautiful Soup',
      descriptionKey: 'projects.webscraping.desc',
      technologies: ['Python', 'Beautiful Soup', 'Selenium', 'HTML'],
      githubUrl: 'https://github.com/memirdogan/Web-Scraping-with-Beautiful-Soup-and-Selenium',
      image: '/projects/webscraping.webp',
      featured: false
    },
    {
      title: '42 Piscine Projects',
      descriptionKey: 'projects.42piscine.desc',
      technologies: ['C', 'C++', 'Shell Scripting', 'Embedded Systems'],
      githubUrl: 'https://github.com/memirdogan/42Piscine',
      image: '/projects/42piscine.webp',
      featured: false
    },
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="text-gradient">💻 {t('projects.title')}</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Featured Projects - Full cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {project.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Floating action buttons on hover */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-md transition-colors"
                        onClick={() => trackEvent('project_view', 'engagement', project.title)}
                      >
                        <FiGithub className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-blue-500/90 hover:bg-blue-600 shadow-md transition-colors"
                        onClick={() => trackEvent('project_view', 'engagement', project.title)}
                      >
                        <FiExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {t(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects - View mode toggle */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {isTR ? 'Diğer Projeler' : 'Other Projects'}
            </h3>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                >
                  {project.image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        fill
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-1">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => trackEvent('project_view', 'engagement', project.title)}
                          >
                            <FiGithub className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => trackEvent('project_view', 'engagement', project.title)}
                          >
                            <FiExternalLink className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-gray-400 dark:text-gray-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                >
                  {project.image && (
                    <div className="flex-shrink-0 w-16 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fill
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => trackEvent('project_view', 'engagement', project.title)}
                      >
                        <FiGithub className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => trackEvent('project_view', 'engagement', project.title)}
                      >
                        <FiExternalLink className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/memirdogan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            <FiGithub className="w-4 h-4" />
            <span>{t('projects.viewMore')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
