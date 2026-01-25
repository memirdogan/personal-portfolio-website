import React from 'react';
import { motion } from 'framer-motion';
import { FiCloud, FiBox, FiCode, FiServer, FiGitBranch, FiActivity, FiDatabase, FiShield, FiLayers, FiWifi } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface SkillCategory {
  titleKey: string;
  icon: React.ReactNode;
  skills: string[];
}

const getSkillCategories = (t: (k: string) => string): SkillCategory[] => [
  {
    titleKey: 'skills.cat.cloud',
    icon: <FiCloud className="w-6 h-6" />,
    skills: ['Amazon Web Services (AWS)', 'DigitalOcean', 'Cloudflare', 'Supabase', 'Appwrite']
  },
  {
    titleKey: 'skills.cat.aws',
    icon: <FiShield className="w-6 h-6" />,
    skills: ['EC2', 'S3', 'Lambda', 'SQS', 'SNS', 'ECR', 'Route53', 'RDS', 'CloudWatch', 'ECS', 'EKS', 'ALB', 'CloudFront']
  },
  {
    titleKey: 'skills.cat.networking',
    icon: <FiWifi className="w-6 h-6" />,
    skills: ['VPC', 'Transit Gateway', 'Direct Connect', 'Route 53']
  },
  {
    titleKey: 'skills.cat.containers',
    icon: <FiBox className="w-6 h-6" />,
    skills: ['Kubernetes', 'Docker', 'Helm', 'ECS', 'EKS']
  },
  {
    titleKey: 'skills.cat.devops',
    icon: <FiServer className="w-6 h-6" />,
    skills: ['Terraform', 'Terragrunt', 'Linux', 'Nginx', 'CI/CD', 'GitHub Actions']
  },
  {
    titleKey: 'skills.cat.programming',
    icon: <FiCode className="w-6 h-6" />,
    skills: ['Python', 'Bash', 'C']
  },
  {
    titleKey: 'skills.cat.databases',
    icon: <FiDatabase className="w-6 h-6" />,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB', 'SQLite', 'Microsoft SQL Server']
  },
  {
    titleKey: 'skills.cat.observability',
    icon: <FiActivity className="w-6 h-6" />,
    skills: ['New Relic', 'OpenSearch', 'Prometheus', 'Grafana']
  },
  {
    titleKey: 'skills.cat.vcs',
    icon: <FiGitBranch className="w-6 h-6" />,
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Bitbucket', 'Jira', 'Confluence', 'Notion', 'Trello']
  }
];

const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = getSkillCategories(t);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t(category.titleKey)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
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
