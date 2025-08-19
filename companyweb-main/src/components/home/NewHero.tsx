import React, { useEffect, useState, Children } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayCircleIcon, GlobeIcon, CheckCircleIcon, BuildingIcon, FileTextIcon, BoxIcon } from 'lucide-react';
import { VideoPopup } from '../VideoPopup';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
export function NewHero() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const stats = [{
    number: '1,200+',
    label: 'Companies Served'
  }, {
    number: '27',
    label: 'EU Countries'
  }, {
    number: '48h',
    label: 'Average Setup Time'
  }, {
    number: '99%',
    label: 'Success Rate'
  }];
  const goals = [{
    id: 'incorporate',
    label: 'Incorporate a New Company',
    icon: BuildingIcon,
    description: 'Set up your business entity in any EU country within 48 hours',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 'banking',
    label: 'Open a Business Bank Account',
    icon: BoxIcon,
    description: 'Get your European business bank account with multi-currency support',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 'compliance',
    label: 'Handle Tax & Compliance',
    icon: FileTextIcon,
    description: 'Stay compliant with automated tax filing and regulatory support',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }];
  // Auto-rotate featured stats
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(current => (current + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return <motion.section className="relative py-20" initial="hidden" animate="visible" viewport={{
    once: true
  }} variants={containerVariants}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0B1F] via-[#1B1537] to-[#0F0B1F]"></div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced with animations */}
          <motion.div className="relative z-10" variants={containerVariants}>
          
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" variants={itemVariants}>
              Launch Your Global Business
              <span className="text-[#EA3A70]"> Without Borders</span>
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-8" variants={itemVariants}>
              One platform to incorporate, manage, and scale your business
              across Europe. Get started in minutes, not months.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 mb-12" variants={itemVariants}>
              <button 
                onClick={() => navigate('/pricing')}
                className="px-6 py-3 bg-[#EA3A70] text-white rounded-xl hover:bg-[#EA3A70]/90 transition-colors flex items-center font-medium shadow-lg shadow-[#EA3A70]/20"
              >
                Start Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-6 py-3 bg-[#1B1537] text-white rounded-xl border border-[#2D2755] hover:bg-[#2D2755]/50 transition-colors flex items-center font-medium group"
              >
                <PlayCircleIcon className="h-5 w-5 mr-2 group-hover:text-[#EA3A70]" />
                Watch Demo
              </button>
            </motion.div>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={containerVariants}>
              {stats.map((stat, index) => <motion.div key={index} variants={itemVariants} className={`p-4 rounded-xl border card-hover transition-all duration-500 ${index === activeIndex ? 'bg-[#EA3A70]/10 border-[#EA3A70]/30 scale-105' : 'bg-[#1B1537]/50 border-[#2D2755] hover:border-[#EA3A70]/30'}`}>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>)}
            </motion.div>
          </motion.div>
          {/* Right Column - Enhanced with animations */}
          <motion.div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-2xl border border-[#2D2755] p-6 relative" variants={imageVariants}>
            <div className="absolute -top-4 -right-4 bg-[#EA3A70]/10 backdrop-blur-sm rounded-xl p-3 border border-[#EA3A70]/30">
              <div className="h-6 w-6 text-[#EA3A70]" />
            </div>
            <div className="flex items-center mb-6">
              <GlobeIcon className="h-6 w-6 text-[#EA3A70] mr-3" />
              <h2 className="text-xl font-medium text-white">
                Start Your Global Journey
              </h2>
            </div>
            <div className="space-y-4 mb-6">
              {goals.map((goal, index) => <button key={goal.id} onClick={() => setSelectedGoal(goal.id)} className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 hover-scale ${selectedGoal === goal.id ? 'bg-[#EA3A70]/20 border-[#EA3A70]/30 text-white' : 'bg-[#2D2755]/20 border-[#2D2755] text-gray-300'}`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <goal.icon className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <span className="font-medium block">{goal.label}</span>
                    {selectedGoal === goal.id && <span className="text-sm text-gray-400 mt-1 block">
                        {goal.description}
                      </span>}
                  </div>
                  {selectedGoal === goal.id && <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] ml-auto flex-shrink-0" />}
                </button>)}
            </div>
            {selectedGoal && <div className="mt-6 animate-zoom-in">
                <img src={goals.find(g => g.id === selectedGoal)?.image} alt="Business visualization" className="w-full h-32 object-cover rounded-lg mb-4" />
                <button className="w-full py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center font-medium">
                  Continue
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>}
          </motion.div>
        </div>
      </div>
      <VideoPopup 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </motion.section>;
}