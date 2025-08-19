import React, { useState, Children, createElement } from 'react';
import { ClockIcon, CheckIcon, ArrowRightIcon, BuildingIcon, FileTextIcon, GlobeIcon, ShieldCheckIcon, UserIcon, BookOpenIcon, BoxIcon } from 'lucide-react';
import { motion } from 'framer-motion';
  import { Link } from 'react-router-dom';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
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
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [{
    title: 'Strategic Planning',
    description: 'Comprehensive market analysis and entry strategy',
    time: '1-2 days',
    icon: BookOpenIcon,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    details: ['Market opportunity assessment', 'Regulatory requirement analysis', 'Cost structure planning', 'Growth strategy development'],
    metrics: {
      success: '98%',
      timeframe: '24h',
      support: '24/7'
    }
  }, {
    title: 'Legal Formation',
    description: 'Company registration and compliance setup',
    time: '2-3 days',
    icon: BuildingIcon,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    details: ['Entity structure optimization', 'Registration documentation', 'Regulatory compliance setup', 'Legal framework establishment'],
    metrics: {
      success: '100%',
      timeframe: '48h',
      support: 'Local'
    }
  }, {
    title: 'Financial Setup',
    description: 'Banking and financial infrastructure',
    time: '3-4 days',
    icon: BoxIcon,
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    details: ['Business account setup', 'Payment infrastructure', 'Tax registration', 'Financial compliance'],
    metrics: {
      success: '96%',
      timeframe: '72h',
      support: 'Expert'
    }
  }, {
    title: 'Operational Launch',
    description: 'Full business activation and growth support',
    time: '1-2 days',
    icon: GlobeIcon,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    details: ['Systems integration', 'Team onboarding', 'Vendor setup', 'Growth acceleration'],
    metrics: {
      success: '95%',
      timeframe: '24h',
      support: 'Ongoing'
    }
  }];
  return <motion.section className="py-20 bg-[#0A0826] relative overflow-hidden" initial="hidden" whileInView="visible" viewport={{
    once: true,
    margin: '-100px'
  }} variants={containerVariants}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#EA3A70]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#4A2D80]/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced header section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#EA3A70]/10 border border-[#EA3A70]/20 mb-4 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            <GlobeIcon className="h-4 w-4 text-[#EA3A70] mr-2" />
            <span className="text-[#EA3A70] font-medium">
              Global Expansion Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Journey to Global Business Success
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A streamlined, AI-powered process designed for modern businesses
            expanding internationally
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced timeline */}
          <motion.div className="relative" variants={containerVariants}>
            <div className="absolute left-12 top-0 h-full w-0.5 bg-gradient-to-b from-[#EA3A70]/30 to-[#2D2755] md:block hidden"></div>
            <div className="space-y-8">
              {steps.map((step, index) => <motion.div key={index} variants={itemVariants} className={`relative flex items-start md:items-center flex-col md:flex-row cursor-pointer group`} onClick={() => setActiveStep(index)}>
                  <div className="flex items-center md:w-48 mb-4 md:mb-0">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center z-10 transition-all duration-500 transform hover:scale-110
                        ${index <= activeStep ? 'bg-[#EA3A70] shadow-lg shadow-[#EA3A70]/20' : 'bg-[#2D2755] hover:bg-[#2D2755]/70'}`}>
                      {index < activeStep ? <CheckIcon className="h-6 w-6 text-white" /> : <step.icon className="h-6 w-6 text-white" />}
                    </div>
                    <div className="hidden md:block h-0.5 w-full bg-gradient-to-r from-[#2D2755] to-transparent ml-4"></div>
                  </div>
                  <div className={`md:ml-8 rounded-xl transition-all duration-500 w-full md:w-auto backdrop-blur-sm
                      ${activeStep === index ? 'bg-[#1B1537]/80 border border-[#EA3A70]/30 shadow-lg shadow-[#EA3A70]/5 transform hover:scale-[1.02]' : 'bg-[#1B1537]/50 border border-[#2D2755] group-hover:border-[#EA3A70]/20 transform hover:translate-x-2'}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {step.title}
                        </h3>
                        <div className="flex items-center text-[#EA3A70]">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            {step.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      {activeStep === index && <div className="space-y-4 animate-fadeIn">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-[#2D2755]/50 rounded-lg p-3 text-center">
                              <div className="text-[#EA3A70] font-bold">
                                {step.metrics.success}
                              </div>
                              <div className="text-gray-400 text-xs">
                                Success Rate
                              </div>
                            </div>
                            <div className="bg-[#2D2755]/50 rounded-lg p-3 text-center">
                              <div className="text-[#EA3A70] font-bold">
                                {step.metrics.timeframe}
                              </div>
                              <div className="text-gray-400 text-xs">
                                Processing
                              </div>
                            </div>
                            <div className="bg-[#2D2755]/50 rounded-lg p-3 text-center">
                              <div className="text-[#EA3A70] font-bold">
                                {step.metrics.support}
                              </div>
                              <div className="text-gray-400 text-xs">
                                Support
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {step.details.map((detail, i) => <div key={i} className="flex items-center text-gray-300">
                                <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2" />
                                <span className="text-sm">{detail}</span>
                              </div>)}
                          </div>
                        </div>}
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
          {/* Enhanced preview panel */}
          <motion.div className="bg-[#1B1537]/80 backdrop-blur-xl rounded-xl border border-[#2D2755] overflow-hidden sticky top-4 transform hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-[#EA3A70]/5" variants={itemVariants}>
            <div className="relative h-48">
              <img src={steps[activeStep].image} alt={steps[activeStep].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1537] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#1B1537]/90 backdrop-blur-sm rounded-lg p-3 border border-[#2D2755]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Create a new instance of the icon component */}
                    {createElement(steps[activeStep].icon, {
                    className: 'h-5 w-5 text-[#EA3A70] mr-2'
                  })}
                    <span className="text-white font-medium">
                      Stage {activeStep + 1}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {steps[activeStep].time}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {steps[activeStep].title}
              </h3>
              <div className="space-y-6">
                {steps[activeStep].details.map((detail, index) => <div key={index} className="flex items-start">
                    <div className="p-2 bg-[#EA3A70]/10 rounded-lg mr-3">
                      <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                    </div>
                    <div>
                      <p className="text-gray-300">{detail}</p>
                    </div>
                  </div>)}
              </div>
              <Link 
                to="/pricing"
                className="mt-8 w-full px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center font-medium shadow-lg shadow-[#EA3A70]/20 group"
              >
                Begin Your Global Journey
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>;
}