import { motion } from 'framer-motion';
import { FiCloud, FiBox, FiCode, FiServer, FiGitBranch, FiActivity, FiDatabase } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface SkillCategory {
  titleKey: string;
  icon: React.ReactNode;
  skills: string[];
}

const getSkillCategories = (): SkillCategory[] => [
  {
    titleKey: 'skills.cat.cloud',
    icon: <FiCloud className="w-5 h-5" />,
    skills: ['Amazon Web Services (AWS)', 'DigitalOcean', 'Cloudflare', 'VPC', 'Transit Gateway']
  },
  {
    titleKey: 'skills.cat.containers',
    icon: <FiBox className="w-5 h-5" />,
    skills: ['Kubernetes', 'Docker', 'Helm', 'ECS', 'EKS', 'Minikube']
  },
  {
    titleKey: 'skills.cat.devops',
    icon: <FiServer className="w-5 h-5" />,
    skills: ['Terraform', 'Terragrunt', 'Linux', 'Nginx', 'CI/CD', 'GitHub Actions']
  },
  {
    titleKey: 'skills.cat.programming',
    icon: <FiCode className="w-5 h-5" />,
    skills: ['Python', 'Bash', 'C', 'TypeScript', 'React', 'Next.js']
  },
  {
    titleKey: 'skills.cat.databases',
    icon: <FiDatabase className="w-5 h-5" />,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB', 'Microsoft SQL Server']
  },
  {
    titleKey: 'skills.cat.observability',
    icon: <FiActivity className="w-5 h-5" />,
    skills: ['New Relic', 'OpenSearch', 'Prometheus', 'Grafana', 'Git', 'GitHub', 'Bitbucket', 'Jira']
  }
];

const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = getSkillCategories();

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {category.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t(category.titleKey)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
