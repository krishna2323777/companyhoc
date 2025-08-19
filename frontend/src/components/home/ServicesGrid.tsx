import React, { Children } from 'react';
import { BuildingIcon, ScaleIcon, FileTextIcon, BoxIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Animation variants
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
const titleVariants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
export function ServicesGrid() {
  const services = [{
    icon: BuildingIcon,
    title: 'Company Formation',
    description: 'Quick and compliant company registration across Europe',
    link: '/services/company-formation'
  }, {
    icon: BoxIcon,
    title: 'Banking Services',
    description: 'Business account setup and financial solutions',
    link: '/services/banking'
  }, {
    icon: ScaleIcon,
    title: 'Legal Services',
    description: 'Comprehensive legal support and compliance',
    link: '/services/legal'
  }, {
    icon: FileTextIcon,
    title: 'Tax & Accounting',
    description: 'Full-service accounting and tax management',
    link: '/services/accounting'
  }];
  return <motion.section className="py-20 bg-[#0F0B1F]" initial="hidden" whileInView="visible" viewport={{
    once: true,
    margin: '-100px'
  }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={titleVariants}>
          <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive business solutions for your global expansion
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants}>
          {services.map((service, index) => <motion.div key={index} variants={itemVariants} className="will-change-transform">
              <Link to={service.link} className="block bg-[#1B1537] rounded-xl p-6 border border-[#2D2755] hover:border-[#EA3A70] transition-all duration-300 hover:shadow-lg hover:shadow-[#EA3A70]/10 transform hover:-translate-y-1">
                <div className="bg-[#EA3A70]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </Link>
            </motion.div>)}
        </motion.div>
      </div>
    </motion.section>;
}