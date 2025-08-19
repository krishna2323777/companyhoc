import React, { useEffect, useState, useRef } from 'react'
import {
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  BuildingIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  MousePointerIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  MessageSquareIcon,
} from 'lucide-react'

export const NetherlandsProductPage = () => {
  // State for scroll animations
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState('one-off')
  const [isVisible, setIsVisible] = useState({})
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mouseCursor, setMouseCursor] = useState({
    x: 0,
    y: 0,
  })
  const [mouseHovering, setMouseHovering] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [typingText, setTypingText] = useState({
    current: '',
    target: 'Launch your business in the Netherlands',
    index: 0,
  })
  const [counting, setCounting] = useState({
    companies: 0,
    hours: 0,
    satisfaction: 0,
    countries: 0,
  })
  const [scrollProgress, setScrollProgress] = useState(0)

  // Refs for intersection observer
  const sectionRefs = useRef([])

  // Handle mouse movement for custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseCursor({
        x: e.clientX,
        y: e.clientY,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle scroll events for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollY(position)
      setShowScrollTop(position > 500)
      // Calculate scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (position / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Typing effect
  useEffect(() => {
    if (typingText.current.length < typingText.target.length) {
      const timeout = setTimeout(() => {
        setTypingText((prev) => ({
          ...prev,
          current: prev.target.substring(0, prev.current.length + 1),
          index: prev.index + 1,
        }))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [typingText])

  // Counter animation effect
  useEffect(() => {
    if (scrollY > 800 && counting.companies < 500) {
      const timeout = setTimeout(() => {
        setCounting((prev) => ({
          companies: Math.min(prev.companies + 10, 500),
          hours: Math.min(prev.hours + 1, 48),
          satisfaction: Math.min(prev.satisfaction + 2, 98),
          countries: Math.min(prev.countries + 1, 27),
        }))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [scrollY, counting])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Custom cursor */}
      {mouseHovering && (
        <div
          className="fixed pointer-events-none z-50 w-8 h-8 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 ease-out"
          style={{
            left: mouseCursor.x - 16,
            top: mouseCursor.y - 16,
            transform: 'scale(1.5)',
          }}
        />
      )}

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Netherlands Business Setup</h1>
                <p className="text-sm text-slate-400">Your gateway to European markets</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-300 hover:text-white transition-colors">
                Services
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#process" className="text-slate-300 hover:text-white transition-colors">
                Process
              </a>
              <button
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
              >
                <MessageSquareIcon className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 text-transparent bg-clip-text">
              {typingText.current}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Establish your business presence in the Netherlands with our comprehensive 
              setup services. From registration to compliance, we handle everything.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <MousePointerIcon className="w-5 h-5" />
              <span>Start Your Journey</span>
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDownIcon className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{counting.companies}+</div>
              <div className="text-slate-400">Companies Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">{counting.hours}h</div>
              <div className="text-slate-400">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{counting.satisfaction}%</div>
              <div className="text-slate-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">{counting.countries}</div>
              <div className="text-slate-400">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Business Services</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From initial registration to ongoing compliance, we provide end-to-end 
              support for your Netherlands business setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BuildingIcon,
                title: 'Company Registration',
                description: 'Fast and efficient business registration with the Dutch Chamber of Commerce.',
                features: ['Legal entity setup', 'Trade name registration', 'KvK registration']
              },
              {
                icon: CreditCardIcon,
                title: 'Banking & Finance',
                description: 'Set up business bank accounts and manage your financial operations.',
                features: ['Business bank account', 'Payment processing', 'Financial planning']
              },
              {
                icon: ShieldCheckIcon,
                title: 'Compliance & Legal',
                description: 'Ensure your business meets all Dutch legal and regulatory requirements.',
                features: ['Tax compliance', 'Employment law', 'Data protection']
              },
              {
                icon: FileTextIcon,
                title: 'Accounting Services',
                description: 'Professional accounting and bookkeeping services for your business.',
                features: ['Bookkeeping', 'Tax filing', 'Financial reporting']
              },
              {
                icon: ClockIcon,
                title: 'Virtual Office',
                description: 'Establish a professional presence with our virtual office services.',
                features: ['Business address', 'Mail handling', 'Meeting rooms']
              },
              {
                icon: CheckIcon,
                title: 'Ongoing Support',
                description: 'Continuous support and guidance for your business operations.',
                features: ['24/7 support', 'Regular updates', 'Compliance monitoring']
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-slate-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-400">
                      <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Flexible Pricing Plans</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the plan that best fits your business needs and budget.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('one-off')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  activeTab === 'one-off'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                One-off Setup
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  activeTab === 'subscription'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Subscription Plans
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Setup',
                price: '€2,500',
                period: 'one-time',
                description: 'Essential business registration and setup',
                features: [
                  'Company registration',
                  'KvK registration',
                  'Basic compliance',
                  'Email support'
                ]
              },
              {
                name: 'Professional',
                price: '€4,500',
                period: 'one-time',
                description: 'Complete business setup with banking',
                features: [
                  'Everything in Basic',
                  'Business bank account',
                  'Virtual office setup',
                  'Priority support'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '€7,500',
                period: 'one-time',
                description: 'Full-service business establishment',
                features: [
                  'Everything in Professional',
                  'Accounting services',
                  'Legal consultation',
                  'Dedicated manager'
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border ${
                  plan.popular
                    ? 'border-purple-500/50 bg-gradient-to-br from-slate-800/50 to-purple-900/20'
                    : 'border-white/10'
                } hover:border-purple-500/50 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-1">{plan.price}</div>
                  <div className="text-slate-400 mb-4">{plan.period}</div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Your journey to establishing a business in the Netherlands is straightforward and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'We discuss your business goals and requirements to create a tailored plan.',
                icon: MessageSquareIcon
              },
              {
                step: '02',
                title: 'Document Preparation',
                description: 'We help you gather and prepare all necessary documentation for registration.',
                icon: FileTextIcon
              },
              {
                step: '03',
                title: 'Registration Process',
                description: 'We handle the complete registration process with Dutch authorities.',
                icon: BuildingIcon
              },
              {
                step: '04',
                title: 'Business Launch',
                description: 'Your business is officially established and ready to operate.',
                icon: CheckIcon
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border-2 border-purple-500">
                    <span className="text-sm font-bold text-purple-400">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Netherlands Business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of successful businesses that have established their presence in the Netherlands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <MousePointerIcon className="w-5 h-5" />
              <span>Start Your Application</span>
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 z-50"
        >
          <ArrowUpIcon className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat widget */}
      {showChat && (
        <div className="fixed bottom-8 left-8 w-80 h-96 bg-slate-800 rounded-xl border border-white/10 shadow-2xl z-50">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Netherlands Business Setup</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-slate-200"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-sm text-slate-300">
                  Welcome! I'm here to help you with your Netherlands business setup. 
                  What would you like to know?
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 