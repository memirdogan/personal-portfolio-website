import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
// Analytics tracking functions
const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
import OptimizedImage from '../OptimizedImage';

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
  const { t } = useLanguage();

  const projects: ProjectItem[] = [
    {
      title: 'RenaByte & Akbis Platform',
      descriptionKey: 'projects.renabyte.desc',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      liveUrl: 'https://renabyte.com',
      image: '/projects/renabyte.webp',
      featured: true
    },
    {
      title: 'Sunoa E-Commerce Platform',
      descriptionKey: 'projects.sunoa.desc',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/memirdogan/sunoa-ecommerce-website',
      liveUrl: 'https://sunoa.memir.codes',
      image: '/projects/sunoa.webp',
      featured: false
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

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">💻 {t('projects.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              {project.image && (
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} - ${project.technologies.join(', ')} project screenshot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 relative z-10">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors hover:scale-110 active:scale-90"
                        onClick={() => {
                          trackEvent('external_link_click', 'engagement', `GitHub: ${project.githubUrl}`);
                          trackEvent('project_view', 'engagement', project.title);
                        }}
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors hover:scale-110 active:scale-90"
                        onClick={() => {
                          trackEvent('external_link_click', 'engagement', `Live Site: ${project.liveUrl}`);
                          trackEvent('project_view', 'engagement', project.title);
                        }}
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {t(project.descriptionKey)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/memirdogan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium hover:scale-105 active:scale-95 relative z-10"
            onClick={(e) => {
              console.log('View All Projects clicked');
            }}
          >
            <FiGithub className="w-5 h-5" />
            <span>{t('projects.viewMore')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
