import React, { useEffect, useState, Component } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon, CalendarIcon, CheckCircleIcon, ClockIcon, FileTextIcon, GlobeIcon, InfoIcon, UserIcon, BuildingIcon, MapPinIcon, ShieldCheckIcon, ScanIcon, XIcon, MaximizeIcon, ChevronRightIcon, ChevronDownIcon, FlagIcon, LayoutGridIcon, BarChart3Icon, ClipboardCheckIcon, ChevronLeftIcon, HeartIcon, EuroIcon, BriefcaseIcon, TimerIcon, CheckIcon, BookOpenIcon } from 'lucide-react';
import { countries } from '../../constants/countries';
// Country groups based on complexity
const COUNTRY_GROUPS = {
  FAST: ['netherlands', 'ireland', 'estonia', 'lithuania', 'latvia'],
  MEDIUM: ['germany', 'france', 'spain', 'italy', 'belgium', 'luxembourg'],
  COMPLEX: ['austria', 'poland', 'hungary', 'greece', 'romania', 'bulgaria']
};
// Country-specific data
const COUNTRY_DATA = {
  netherlands: {
    name: 'Netherlands',
    flag: '🇳🇱',
    color: '#EA3A70',
    processingTime: '6-10 business days',
    complexity: 'Low',
    capitalRequirement: '€0',
    icon: <BuildingIcon />,
    requirements: [{
      id: 'doc1',
      title: 'Parent company documents',
      description: 'Certificate of incorporation, articles of association'
    }, {
      id: 'doc2',
      title: 'Proof of address',
      description: 'Business address in the Netherlands'
    }, {
      id: 'doc3',
      title: 'Director identification',
      description: 'Passport copies of directors and representatives'
    }, {
      id: 'doc4',
      title: 'Business activities',
      description: 'Description of planned activities in the Netherlands'
    }, {
      id: 'doc5',
      title: 'UBO information',
      description: 'Details of Ultimate Beneficial Owners'
    }],
    benefits: ['Favorable tax system with extensive treaty network', 'Streamlined registration process', 'International business environment with English widely spoken', 'Strategic location for European operations']
  },
  germany: {
    name: 'Germany',
    flag: '🇩🇪',
    color: '#003E6B',
    processingTime: '14-21 business days',
    complexity: 'Medium',
    capitalRequirement: '€0',
    icon: <BuildingIcon />,
    requirements: [{
      id: 'doc1',
      title: 'Parent company documents',
      description: 'Certificate of incorporation, articles of association (German translation required)'
    }, {
      id: 'doc2',
      title: 'Proof of address',
      description: 'Business address in Germany'
    }, {
      id: 'doc3',
      title: 'Director identification',
      description: 'Passport copies and residence permits if applicable'
    }, {
      id: 'doc4',
      title: 'Business activities',
      description: 'Detailed description of planned activities in Germany'
    }, {
      id: 'doc5',
      title: 'UBO information',
      description: 'Details of Ultimate Beneficial Owners'
    }, {
      id: 'doc6',
      title: 'Local representative',
      description: 'Appointment of a local representative may be required'
    }],
    benefits: ["Access to Europe's largest economy", 'Strong legal protection and stability', 'Prestigious business reputation', 'Excellent infrastructure and central location in Europe']
  },
  france: {
    name: 'France',
    flag: '🇫🇷',
    color: '#002654',
    processingTime: '14-21 business days',
    complexity: 'Medium',
    capitalRequirement: '€0',
    icon: <BuildingIcon />,
    requirements: [{
      id: 'doc1',
      title: 'Parent company documents',
      description: 'Certificate of incorporation, articles of association (French translation required)'
    }, {
      id: 'doc2',
      title: 'Proof of address',
      description: 'Business address in France'
    }, {
      id: 'doc3',
      title: 'Director identification',
      description: 'Passport copies of directors and representatives'
    }, {
      id: 'doc4',
      title: 'Business activities',
      description: 'Description of planned activities in France'
    }, {
      id: 'doc5',
      title: 'UBO information',
      description: 'Details of Ultimate Beneficial Owners'
    }],
    benefits: ["Access to one of Europe's largest markets", 'Strong protection of intellectual property', 'Strategic location in Western Europe', 'Excellent transportation infrastructure']
  },
  spain: {
    name: 'Spain',
    flag: '🇪🇸',
    color: '#AA151B',
    processingTime: '14-28 business days',
    complexity: 'Medium',
    capitalRequirement: '€0',
    icon: <BuildingIcon />,
    requirements: [{
      id: 'doc1',
      title: 'Parent company documents',
      description: 'Certificate of incorporation, articles of association (Spanish translation required)'
    }, {
      id: 'doc2',
      title: 'Proof of address',
      description: 'Business address in Spain'
    }, {
      id: 'doc3',
      title: 'Director identification',
      description: 'Passport copies of directors and representatives'
    }, {
      id: 'doc4',
      title: 'Business activities',
      description: 'Description of planned activities in Spain'
    }, {
      id: 'doc5',
      title: 'UBO information',
      description: 'Details of Ultimate Beneficial Owners'
    }, {
      id: 'doc6',
      title: 'Tax identification',
      description: 'Obtaining a NIE (Foreigner Identification Number)'
    }],
    benefits: ['Gateway to Spanish-speaking markets', 'Attractive quality of life for relocated staff', 'Growing startup ecosystem', 'Lower operational costs than other Western European countries']
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    color: '#169B62',
    processingTime: '5-10 business days',
    complexity: 'Low',
    capitalRequirement: '€1',
    icon: <BuildingIcon />,
    requirements: [{
      id: 'doc1',
      title: 'Parent company documents',
      description: 'Certificate of incorporation, articles of association'
    }, {
      id: 'doc2',
      title: 'Proof of address',
      description: 'Business address in Ireland'
    }, {
      id: 'doc3',
      title: 'Director identification',
      description: 'Passport copies of directors and representatives'
    }, {
      id: 'doc4',
      title: 'Business activities',
      description: 'Description of planned activities in Ireland'
    }, {
      id: 'doc5',
      title: 'UBO information',
      description: 'Details of Ultimate Beneficial Owners'
    }],
    benefits: ['Low corporate tax rate (12.5%)', 'Only English-speaking country in the Eurozone', 'Strong ties to US and UK markets', 'Highly educated workforce']
  }
};
// Default country data for any country not explicitly defined
const DEFAULT_COUNTRY_DATA = {
  processingTime: '14-30 business days',
  complexity: 'Medium to High',
  capitalRequirement: 'Varies by country',
  icon: <BuildingIcon />,
  requirements: [{
    id: 'doc1',
    title: 'Parent company documents',
    description: 'Certificate of incorporation, articles of association (local translation may be required)'
  }, {
    id: 'doc2',
    title: 'Proof of address',
    description: 'Local business address'
  }, {
    id: 'doc3',
    title: 'Director identification',
    description: 'Passport copies of directors and representatives'
  }, {
    id: 'doc4',
    title: 'Business activities',
    description: 'Description of planned business activities'
  }, {
    id: 'doc5',
    title: 'UBO information',
    description: 'Details of Ultimate Beneficial Owners'
  }],
  benefits: ['Access to the EU single market', 'EU regulatory compliance', 'European business presence', 'Pathway to European expansion']
};
export function BranchRegistrationTutorial() {
  const {
    country
  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showFullScreenDemo, setShowFullScreenDemo] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('company-formation');
  const [selectedCountry, setSelectedCountry] = useState('netherlands');
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [isChangingCountry, setIsChangingCountry] = useState(false);
  // Popular countries to display in the selector
  const popularCountries = ['netherlands', 'germany', 'france', 'spain', 'ireland'];
  // Get the data for the currently selected country
  const getCountryData = countryCode => {
    return COUNTRY_DATA[countryCode] || {
      ...DEFAULT_COUNTRY_DATA,
      name: countries[countryCode],
      flag: '🇪🇺',
      color: '#004494'
    };
  };
  // Set country from URL parameter if available
  useEffect(() => {
    if (country && countries[country]) {
      setSelectedCountry(country);
      // Save to localStorage
      localStorage.setItem('preferredCountry', country);
    } else {
      // If no country in URL, check localStorage
      const savedCountry = localStorage.getItem('preferredCountry');
      if (savedCountry && countries[savedCountry]) {
        setSelectedCountry(savedCountry);
        // Update URL to include the country
        if (!country) {
          navigate(`/tutorials/branch-registration/${savedCountry}`, {
            replace: true
          });
        }
      }
    }
  }, [country, navigate]);
  const currentCountryData = getCountryData(selectedCountry);
  // Function to determine country complexity group
  const getCountryComplexityGroup = countryCode => {
    if (COUNTRY_GROUPS.FAST.includes(countryCode)) return 'Fast';
    if (COUNTRY_GROUPS.MEDIUM.includes(countryCode)) return 'Medium';
    if (COUNTRY_GROUPS.COMPLEX.includes(countryCode)) return 'Complex';
    return 'Medium';
  };
  // Handle country change with animation and URL update
  const handleCountryChange = country => {
    if (country === selectedCountry) return;
    setIsChangingCountry(true);
    // Update URL to reflect the new country
    navigate(`/tutorials/branch-registration/${country}`);
    setTimeout(() => {
      setSelectedCountry(country);
      setIsChangingCountry(false);
      setShowAllCountries(false);
      // Save country preference to localStorage
      localStorage.setItem('preferredCountry', country);
      // Scroll to top when changing country
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 300);
  };
  // Tutorial categories with their tutorials
  const tutorialCategories = {
    'company-formation': [{
      title: `Setting Up a ${currentCountryData.name} Company`,
      slug: `setting-up-${selectedCountry}-company`,
      duration: '10 min read'
    }, {
      title: `Branch Registration in ${currentCountryData.name}`,
      slug: `branch-registration/${selectedCountry}`,
      duration: '15 min read',
      isCurrent: true
    }, {
      title: 'Articles of Association: Key Components',
      slug: 'articles-of-association',
      duration: '7 min read'
    }, {
      title: `Appointing Directors for Your ${currentCountryData.name} Entity`,
      slug: 'appointing-directors',
      duration: '5 min read'
    }],
    taxation: [{
      title: `Understanding ${currentCountryData.name} VAT Requirements`,
      slug: `${selectedCountry}-vat-requirements`,
      duration: '8 min read'
    }, {
      title: `Corporate Tax Filing in ${currentCountryData.name}`,
      slug: `${selectedCountry}-corporate-tax-filing`,
      duration: '14 min read'
    }, {
      title: `Tax Incentives for ${currentCountryData.name} Businesses`,
      slug: 'tax-incentives',
      duration: '8 min read'
    }],
    banking: [{
      title: `Opening a ${currentCountryData.name} Business Bank Account`,
      slug: `${selectedCountry}-business-bank-account`,
      duration: '6 min read'
    }, {
      title: `Business Financing Options in ${currentCountryData.name}`,
      slug: `${selectedCountry}-business-financing`,
      duration: '11 min read'
    }, {
      title: 'Managing International Payments',
      slug: 'managing-international-payments',
      duration: '6 min read'
    }]
  };
  // Tutorial steps data
  const tutorialSteps = [{
    title: 'Understanding Branch Registration',
    content: `A branch office is an extension of your foreign company in ${currentCountryData.name}, allowing you to conduct business activities without establishing a separate legal entity. Unlike a subsidiary, a branch is not a distinct legal entity but rather a permanent establishment of your foreign company. This means your parent company remains fully liable for all obligations and debts of the branch. Branch registration is ideal for companies looking to test the ${currentCountryData.name} market before committing to a full subsidiary.`,
    isCompleted: currentStep > 1,
    isActive: currentStep === 1
  }, {
    title: 'Required Documents',
    content: `Before starting the branch registration process in ${currentCountryData.name}, you'll need to gather several important documents: 1) Parent company documents including certificate of incorporation and articles of association${currentCountryData.name !== 'Netherlands' && currentCountryData.name !== 'Ireland' ? ' with certified translation' : ''}, 2) Proof of address for your business location in ${currentCountryData.name}, 3) Identification documents for directors and representatives, 4) A detailed description of your planned business activities in ${currentCountryData.name}, and 5) Information about Ultimate Beneficial Owners (UBOs). All foreign documents typically need to be apostilled or legalized and may require certified translations.`,
    isCompleted: currentStep > 2,
    isActive: currentStep === 2
  }, {
    title: 'Registration Process Overview',
    content: `The branch registration process in ${currentCountryData.name} involves several key steps: First, we'll help you prepare and submit the required registration forms to the ${currentCountryData.name === 'Netherlands' ? 'Dutch Chamber of Commerce (KVK)' : currentCountryData.name === 'Germany' ? 'German Commercial Register' : `local business registry in ${currentCountryData.name}`}. Next, we'll register the officials of your company, and if needed, authorized representatives. Our AI-powered system will extract information from your documents to pre-fill these forms, saving you significant time and reducing errors. The entire process typically takes ${currentCountryData.processingTime} from submission to formal registration.`,
    isCompleted: currentStep > 3,
    isActive: currentStep === 3
  }, {
    title: 'Regulatory Compliance',
    content: `Operating a branch in ${currentCountryData.name} requires compliance with several regulatory obligations. Your branch must register with the ${currentCountryData.name} Tax Authorities for corporate income tax and potentially VAT. You'll need to maintain proper administration and file annual financial statements with the business registry. If your branch has employees, you'll also need to register as an employer and comply with ${currentCountryData.name} labor laws. Our platform continuously monitors compliance deadlines and requirements to ensure your branch remains in good standing with ${currentCountryData.name} authorities.`,
    isCompleted: currentStep > 4,
    isActive: currentStep === 4
  }, {
    title: 'Post-Registration Setup',
    content: `After your branch is officially registered in ${currentCountryData.name}, several additional steps are necessary to become fully operational. These include: 1) Opening a ${currentCountryData.name} business bank account, 2) Setting up accounting and payroll systems that comply with ${currentCountryData.name} requirements, 3) Registering with industry-specific regulatory bodies if applicable, 4) Obtaining necessary permits or licenses for your specific business activities, and 5) Setting up proper tax administration. Our platform provides guidance and support for all these post-registration activities to ensure a smooth start to your operations in ${currentCountryData.name}.`,
    isCompleted: currentStep > 5,
    isActive: currentStep === 5
  }, {
    title: 'Using Our AI-Powered Platform',
    content: `Our platform streamlines the branch registration process in ${currentCountryData.name} through advanced AI technology. The system can extract relevant information from your uploaded documents, automatically populate registration forms, and validate data for compliance with ${currentCountryData.name} requirements. The interactive demo below shows how our platform guides you through each step of the process, from document upload to final submission. Our AI also provides real-time assistance and answers to common questions throughout the registration journey.`,
    isCompleted: currentStep > 6,
    isActive: currentStep === 6
  }];
  // Document requirements from current country data
  const requirements = currentCountryData.requirements;
  // Registration process steps
  const registrationSteps = [{
    title: 'Document Preparation',
    description: 'Upload and verify required documents',
    duration: '1-2 days',
    features: ['AI-powered document scanning', 'Automatic data extraction', 'Real-time validation']
  }, {
    title: 'Information Review',
    description: 'Review and confirm company details',
    duration: '1-2 days',
    features: ['Pre-filled forms from documents', 'Compliance checks', 'Error detection']
  }, {
    title: 'Official Registration',
    description: `Submit to ${currentCountryData.name} authorities`,
    duration: currentCountryData.name === 'Netherlands' ? '3-4 days' : currentCountryData.name === 'Germany' ? '5-7 days' : '4-6 days',
    features: ['Digital submission', 'Progress tracking', 'Authority communications']
  }, {
    title: 'Final Setup',
    description: 'Complete post-registration tasks',
    duration: '1-2 days',
    features: ['Tax registration', 'Bank account assistance', 'Digital certificate delivery']
  }];
  // Related tutorials
  const relatedTutorials = [{
    title: `Setting Up a ${currentCountryData.name} Company`,
    category: 'Company Formation',
    duration: '10 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: `/tutorials/setting-up-${selectedCountry}-company`
  }, {
    title: `Understanding ${currentCountryData.name} VAT Requirements`,
    category: 'Tax',
    duration: '8 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: `/tutorials/${selectedCountry}-vat-requirements`
  }, {
    title: `Opening a ${currentCountryData.name} Business Bank Account`,
    category: 'Banking',
    duration: '6 min read',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: `/tutorials/${selectedCountry}-business-bank-account`
  }];
  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of the step content
      document.getElementById(`step-${currentStep + 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of the step content
      document.getElementById(`step-${currentStep - 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  // Store selected country in localStorage
  useEffect(() => {
    localStorage.setItem('preferredCountry', selectedCountry);
  }, [selectedCountry]);
  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry');
    if (savedCountry && countries[savedCountry]) {
      setSelectedCountry(savedCountry);
    }
  }, []);
  return <MainLayout>
      {/* Enhanced Tutorial Header with Country Selector */}
      <div className="bg-gradient-to-r from-indigo-900/80 to-[#0F0B1F]/90 backdrop-blur-sm border-b border-indigo-500/30 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <Link to="/tutorials" className="mr-2 p-2 rounded-full bg-indigo-900/50 hover:bg-indigo-800/70 transition-colors">
                  <ChevronLeftIcon className="h-5 w-5 text-white" />
                </Link>
                <div>
                  <div className="flex items-center">
                    <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                    <span className="text-indigo-200 text-sm">Tutorial</span>
                  </div>
                  <h1 className="text-xl font-bold text-white">
                    Branch Registration Tutorial
                  </h1>
                </div>
              </div>
              {/* Country Selector */}
              <div className="relative">
                <div className="flex items-center bg-indigo-900/50 hover:bg-indigo-800/70 transition-colors rounded-lg p-2 cursor-pointer border border-indigo-500/30" onClick={() => setShowAllCountries(!showAllCountries)}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2" aria-hidden="true">
                      {currentCountryData.flag}
                    </span>
                    <div>
                      <div className="text-xs text-indigo-300">
                        Currently viewing
                      </div>
                      <div className="text-white font-medium">
                        {currentCountryData.name}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 p-1 rounded-full bg-indigo-800/50">
                    <ChevronDownIcon className="h-4 w-4 text-indigo-300" />
                  </div>
                </div>
                {/* Country Dropdown */}
                {showAllCountries && <div className="absolute right-0 mt-2 w-80 bg-[#1B1537] rounded-lg shadow-lg border border-indigo-500/30 p-4 z-50 animate-fadeIn">
                    <div className="mb-3">
                      <h3 className="text-white font-medium mb-1">
                        Personalize your experience
                      </h3>
                      <p className="text-indigo-300 text-sm">
                        Select your country of interest to see tailored branch
                        registration information
                      </p>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs font-medium text-indigo-400 mb-2">
                        POPULAR COUNTRIES
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {popularCountries.map(countryCode => <button key={countryCode} onClick={() => handleCountryChange(countryCode)} className={`flex items-center justify-between p-2 rounded-md transition-colors ${selectedCountry === countryCode ? `bg-[${getCountryData(countryCode).color}]/20 border border-[${getCountryData(countryCode).color}]/30` : 'hover:bg-indigo-800/50'}`}>
                            <div className="flex items-center">
                              <span className="text-xl mr-2" aria-hidden="true">
                                {getCountryData(countryCode).flag}
                              </span>
                              <span className="text-white">
                                {getCountryData(countryCode).name}
                              </span>
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${getCountryComplexityGroup(countryCode) === 'Fast' ? 'bg-green-900/50 text-green-300 border border-green-500/30' : getCountryComplexityGroup(countryCode) === 'Medium' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' : 'bg-red-900/50 text-red-300 border border-red-500/30'}`}>
                              {getCountryComplexityGroup(countryCode)}
                            </div>
                          </button>)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-indigo-400 mb-2">
                        OTHER EU COUNTRIES
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-900">
                        {Object.keys(countries).filter(code => !popularCountries.includes(code)).map(countryCode => <button key={countryCode} onClick={() => handleCountryChange(countryCode)} className={`flex items-center p-2 rounded-md transition-colors ${selectedCountry === countryCode ? 'bg-indigo-800/70 border border-indigo-500/30' : 'hover:bg-indigo-800/50'}`}>
                              <span className="text-white text-sm">
                                {countries[countryCode]}
                              </span>
                            </button>)}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-indigo-500/30 text-center">
                      <p className="text-xs text-indigo-300">
                        We'll remember your country preference across the site
                      </p>
                    </div>
                  </div>}
              </div>
              {/* CTA Button */}
              <Link to={`/registration/branch-registration-${selectedCountry}`} className="px-4 py-2 bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white rounded-lg transition-colors flex items-center justify-center whitespace-nowrap">
                Start {currentCountryData.name} Branch
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Country Overview Banner */}
      <div className="border-b border-indigo-500/30 relative overflow-hidden transition-all duration-300" style={{
      backgroundColor: `${currentCountryData.color}10`,
      borderColor: `${currentCountryData.color}30`
    }}>
        <div className="absolute inset-0 opacity-10 bg-pattern-grid"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg mr-4">
                <div className="h-full w-full flex items-center justify-center text-4xl">
                  {currentCountryData.flag}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Branch Registration in {currentCountryData.name}
                </h2>
                <p className="text-indigo-200">
                  Learn how to establish your foreign company's branch in{' '}
                  {currentCountryData.name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-3 border border-indigo-500/30">
                <div className="flex items-center mb-1">
                  <TimerIcon className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-xs text-indigo-300">
                    Processing Time
                  </span>
                </div>
                <p className="text-white font-medium">
                  {currentCountryData.processingTime}
                </p>
              </div>
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-3 border border-indigo-500/30">
                <div className="flex items-center mb-1">
                  <BarChart3Icon className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-xs text-indigo-300">Complexity</span>
                </div>
                <p className="text-white font-medium">
                  {currentCountryData.complexity}
                </p>
              </div>
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-3 border border-indigo-500/30">
                <div className="flex items-center mb-1">
                  <EuroIcon className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-xs text-indigo-300">
                    Capital Required
                  </span>
                </div>
                <p className="text-white font-medium">
                  {currentCountryData.capitalRequirement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fullscreen Modal */}
      {showFullScreenDemo && <div className="fixed inset-0 bg-[#0A0826]/95 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl">
            <button onClick={() => setShowFullScreenDemo(false)} className="absolute top-4 right-4 z-50 p-2 bg-[#0F0B1F]/80 rounded-full border border-[#2D2755] hover:bg-[#EA3A70]/20 transition-colors">
              <XIcon className="h-6 w-6 text-white" />
            </button>
            <div className="bg-[#1B1537] rounded-xl border-2 border-[#EA3A70] shadow-2xl shadow-[#EA3A70]/10 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  {currentCountryData.name} Branch Registration Process
                </h2>
                <div className="relative overflow-hidden rounded-xl border border-[#2D2755] h-[600px]">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#EA3A70]/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#1B1537]/80 backdrop-blur-sm p-8">
                      <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center">
                          <div className="p-3 bg-[#EA3A70]/20 rounded-lg mr-4">
                            <BuildingIcon className="h-6 w-6 text-[#EA3A70]" />
                          </div>
                          <h3 className="text-white text-xl font-bold">
                            Branch Registration Wizard
                          </h3>
                        </div>
                      </div>
                      <div className="h-2 bg-[#2D2755] rounded-full mb-8 relative z-10">
                        <div className="h-full bg-[#EA3A70] w-[60%] rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {currentCountryData.name} Branch Registration
                            </h3>
                            <p className="text-gray-300">
                              Establish your {currentCountryData.name} branch
                              with our AI-powered system
                            </p>
                          </div>
                          <div className="bg-[#0F0B1F]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] p-6 mb-6">
                            <div className="flex items-center mb-4">
                              <div className="p-3 bg-[#2D2755]/50 rounded-lg mr-4">
                                <ScanIcon className="h-6 w-6 text-[#EA3A70]" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium text-lg">
                                  Document Scanning
                                </h4>
                                <p className="text-gray-400">
                                  Our AI extracts all required information
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4" />
                                <span className="text-white">
                                  Company certificate scanned
                                </span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4" />
                                <span className="text-white">
                                  Director information extracted
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="h-6 w-6 border-2 border-[#EA3A70] border-t-transparent rounded-full animate-spin mr-4"></div>
                                <span className="text-white">
                                  Processing business activities...
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="bg-[#0F0B1F]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] p-6 h-full">
                            <h4 className="text-white font-bold text-lg mb-4">
                              Registration Timeline
                            </h4>
                            <div className="space-y-6">
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-0 h-full w-0.5 bg-[#2D2755]"></div>
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-green-400 -ml-2.5"></div>
                                <div>
                                  <h5 className="text-white font-medium">
                                    Document Upload
                                  </h5>
                                  <p className="text-gray-400 text-sm">
                                    Company documents processed
                                  </p>
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-0 h-full w-0.5 bg-[#2D2755]"></div>
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-green-400 -ml-2.5"></div>
                                <div>
                                  <h5 className="text-white font-medium">
                                    Information Extraction
                                  </h5>
                                  <p className="text-gray-400 text-sm">
                                    AI analysis complete
                                  </p>
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-0 h-full w-0.5 bg-[#2D2755]"></div>
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#EA3A70] -ml-2.5 animate-pulse"></div>
                                <div>
                                  <h5 className="text-white font-medium">
                                    Form Preparation
                                  </h5>
                                  <p className="text-gray-400 text-sm">
                                    Creating registration forms
                                  </p>
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-0 h-full w-0.5 bg-[#2D2755]"></div>
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#2D2755] -ml-2.5"></div>
                                <div>
                                  <h5 className="text-white font-medium">
                                    Official Filing
                                  </h5>
                                  <p className="text-gray-400 text-sm">
                                    Submission to authorities
                                  </p>
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#2D2755] -ml-2.5"></div>
                                <div>
                                  <h5 className="text-white font-medium">
                                    Registration Complete
                                  </h5>
                                  <p className="text-gray-400 text-sm">
                                    Branch office established
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-300">
                    Experience our AI-powered branch registration process that
                    reduces paperwork and accelerates your{' '}
                    {currentCountryData.name} market entry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Main Tutorial Content */}
      <section className={`py-12 relative transition-opacity duration-300 ${isChangingCountry ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Steps Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-4 sticky top-40">
                <h3 className="text-white font-bold mb-4">Tutorial Steps</h3>
                <div className="space-y-2">
                  {tutorialSteps.map((step, index) => <button key={index} onClick={() => setCurrentStep(index + 1)} className={`
                        flex items-center p-2 rounded-lg transition-colors w-full text-left
                        ${currentStep === index + 1 ? 'bg-[#EA3A70]/20 text-white border border-[#EA3A70]/30' : step.isCompleted ? 'bg-indigo-900/20 text-indigo-200 border border-indigo-500/30' : 'text-indigo-300 hover:bg-indigo-900/20 hover:text-indigo-200'}
                      `}>
                      <div className="w-6 h-6 flex items-center justify-center rounded-full mr-2 flex-shrink-0 border border-indigo-500/30">
                        {step.isCompleted ? <CheckCircleIcon className="h-4 w-4 text-green-400" /> : <span className={currentStep === index + 1 ? 'text-[#EA3A70]' : 'text-indigo-300'}>
                            {index + 1}
                          </span>}
                      </div>
                      <span className="text-sm">{step.title}</span>
                    </button>)}
                </div>
                <div className="mt-6 pt-4 border-t border-indigo-500/30">
                  <button className="w-full px-4 py-2 bg-indigo-900/50 text-white rounded-lg border border-indigo-500/30 hover:bg-indigo-800/50 transition-colors flex items-center justify-center">
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Save Tutorial
                  </button>
                </div>
                <div className="mt-6 pt-4 border-t border-indigo-500/30">
                  <button onClick={() => setShowFullScreenDemo(true)} className="w-full px-4 py-2 bg-[#EA3A70]/20 text-white rounded-lg border border-[#EA3A70]/30 hover:bg-[#EA3A70]/30 transition-colors flex items-center justify-center">
                    <MaximizeIcon className="h-4 w-4 mr-2" />
                    View Interactive Demo
                  </button>
                </div>
                {/* Country Benefits */}
                <div className="mt-6 pt-4 border-t border-indigo-500/30">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <HeartIcon className="h-4 w-4 mr-2 text-[#EA3A70]" />
                    {currentCountryData.name} Benefits
                  </h4>
                  <ul className="space-y-2">
                    {currentCountryData.benefits.map((benefit, index) => <li key={index} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-indigo-200">
                          {benefit}
                        </span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="flex flex-wrap items-center text-sm text-indigo-300 gap-4 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    15 min read
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Updated June 2023
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    House of Companies Team
                  </div>
                </div>
                <div className="mb-8 rounded-xl overflow-hidden border border-indigo-500/30">
                  <iframe src="https://app.sharefable.com/embed/demo/branch-registration-gk5fvx1d1xgxwi8d?mode=video" width="100%" height="400px" style={{
                  border: 'none'
                }} allowFullScreen allow="fullscreen" title="Branch Registration Demo" className="w-full" />
                </div>
                <div className="prose prose-invert prose-indigo max-w-none">
                  <p className="text-indigo-200 text-lg mb-8">
                    This tutorial will guide you through the process of
                    registering a branch of your foreign company in{' '}
                    {currentCountryData.name}. Follow these steps to ensure a
                    smooth and compliant setup that allows you to expand your
                    business into the{' '}
                    {currentCountryData.name === 'Netherlands' ? 'Dutch' : currentCountryData.name}{' '}
                    and European markets.
                  </p>
                  {/* Current Step Content */}
                  <div id={`step-${currentStep}`} className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Step {currentStep}: {tutorialSteps[currentStep - 1].title}
                    </h2>
                    <p className="text-indigo-200">
                      {tutorialSteps[currentStep - 1].content}
                    </p>
                    {/* Interactive Demo - Show only in the last step */}
                    {currentStep === 6 && <div className="mt-8 rounded-lg overflow-hidden border border-indigo-500/30">
                        <iframe src="https://app.sharefable.com/embed/demo/branch-registration-gk5fvx1d1xgxwi8d" width="100%" height="540px" style={{
                      border: 'none'
                    }} allowFullScreen allow="fullscreen" />
                      </div>}
                    {/* Document Requirements - Show in step 2 */}
                    {currentStep === 2 && <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {requirements.map(req => <div key={req.id} className="flex items-start p-4 bg-indigo-900/50 rounded-lg border border-indigo-500/30">
                            <div className="flex-shrink-0 mt-0.5">
                              {req.icon}
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-white">
                                {req.title}
                              </h4>
                              <p className="text-sm text-indigo-300 mt-1">
                                {req.description}
                              </p>
                            </div>
                          </div>)}
                      </div>}
                    {/* Registration Process - Show in step 3 */}
                    {currentStep === 3 && <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {registrationSteps.map((step, index) => <div key={index} className="bg-indigo-900/50 border border-indigo-500/30 rounded-lg p-4">
                            <div className="flex items-center mb-4">
                              <div className="h-8 w-8 rounded-full bg-indigo-800 text-white flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                              <div className="ml-4">
                                <h3 className="text-base font-medium text-white">
                                  {step.title}
                                </h3>
                                <p className="text-xs text-indigo-300">
                                  {step.duration}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-indigo-200 mb-4">
                              {step.description}
                            </p>
                            <ul className="space-y-2">
                              {step.features.map((feature, i) => <li key={i} className="flex items-center text-sm text-indigo-300">
                                  <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                                  {feature}
                                </li>)}
                            </ul>
                          </div>)}
                      </div>}
                  </div>
                  {/* Info Box */}
                  <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-8">
                    <div className="flex">
                      <InfoIcon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-300">
                          Did you know?
                        </h3>
                        <p className="text-sm text-blue-200 mt-1">
                          A branch office in {currentCountryData.name} allows
                          you to conduct business without establishing a
                          separate legal entity, while still gaining access to
                          the European market. This can be a cost-effective
                          entry strategy before committing to a full subsidiary.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-12">
                    {currentStep > 1 ? <button onClick={handlePreviousStep} className="inline-flex items-center px-4 py-2 bg-indigo-900/50 text-white rounded-lg border border-indigo-500/30 hover:bg-indigo-800/50 transition-colors">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Previous Step
                      </button> : <div></div>}
                    {currentStep < tutorialSteps.length ? <button onClick={handleNextStep} className="inline-flex items-center px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors">
                        Next Step
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </button> : <Link to={`/registration/branch-registration-${selectedCountry}`} className="inline-flex items-center px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors">
                        Start {currentCountryData.name} Branch Registration
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related Tutorials with Category Tabs */}
      <section className="py-16 bg-[#0A0826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white">Related Tutorials</h2>
            {/* Tutorial Category Navigation - Moved from header */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button onClick={() => setActiveCategoryTab('company-formation')} className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeCategoryTab === 'company-formation' ? 'bg-[#EA3A70]/20 text-white border border-[#EA3A70]/30' : 'text-indigo-300 hover:bg-indigo-900/20 hover:text-white'}`}>
                <BuildingIcon className="h-4 w-4 inline mr-1" />
                Company Formation
              </button>
              <button onClick={() => setActiveCategoryTab('taxation')} className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeCategoryTab === 'taxation' ? 'bg-[#EA3A70]/20 text-white border border-[#EA3A70]/30' : 'text-indigo-300 hover:bg-indigo-900/20 hover:text-white'}`}>
                <FileTextIcon className="h-4 w-4 inline mr-1" />
                Taxation
              </button>
              <button onClick={() => setActiveCategoryTab('banking')} className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeCategoryTab === 'banking' ? 'bg-[#EA3A70]/20 text-white border border-[#EA3A70]/30' : 'text-indigo-300 hover:bg-indigo-900/20 hover:text-white'}`}>
                <GlobeIcon className="h-4 w-4 inline mr-1" />
                Banking
              </button>
            </div>
            <Link to="/tutorials" className="text-sm text-indigo-300 hover:text-white flex items-center whitespace-nowrap">
              <BookOpenIcon className="h-4 w-4 mr-1" />
              View All Tutorials
            </Link>
          </div>
          {/* Category Tutorials Grid */}
          <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorialCategories[activeCategoryTab].map((tutorial, index) => <Link key={index} to={`/tutorials/${tutorial.slug}`} className={`group bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-5 border ${tutorial.isCurrent ? 'border-[#EA3A70]/30 bg-[#EA3A70]/10' : 'border-indigo-500/30 hover:border-[#EA3A70]/30 hover:bg-[#EA3A70]/5'} transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-lg font-medium ${tutorial.isCurrent ? 'text-white' : 'text-indigo-200 group-hover:text-white'} transition-colors`}>
                      {tutorial.title}
                    </h3>
                    <span className="text-xs text-indigo-400 whitespace-nowrap ml-2">
                      {tutorial.duration}
                    </span>
                  </div>
                  <div className="flex items-center text-[#EA3A70] text-sm font-medium">
                    {tutorial.isCurrent ? 'Current tutorial' : 'Read tutorial'}
                    <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>)}
            </div>
          </div>
          {/* Featured Related Tutorials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTutorials.map((tutorial, index) => <Link key={index} to={tutorial.href} className="group relative overflow-hidden rounded-xl border border-indigo-500/30 hover:border-[#EA3A70]/50 transition-all h-64">
                <div className="absolute inset-0">
                  <img src={tutorial.image} alt={tutorial.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0826] via-[#0A0826]/80 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-900/70 text-indigo-300 border border-indigo-500/30">
                      {tutorial.category}
                    </span>
                    <span className="text-xs text-indigo-300 ml-2">
                      {tutorial.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#EA3A70] transition-colors">
                    {tutorial.title}
                  </h3>
                  <div className="flex items-center text-[#EA3A70] font-medium">
                    Read tutorial
                    <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#0A0826] to-[#1B1537]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to establish your branch in {currentCountryData.name}?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Start your branch registration process today with our AI-powered
            platform and complete your registration in as little as{' '}
            {currentCountryData.processingTime.split('-')[0]} business days.
          </p>
          <Link to={`/registration/branch-registration-${selectedCountry}`} className="px-8 py-4 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors text-lg font-medium inline-flex items-center">
            Start {currentCountryData.name} Branch Registration
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </MainLayout>;
}