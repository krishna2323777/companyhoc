import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, BuildingIcon, ChevronDownIcon, BookOpenIcon, PercentIcon, CoinsIcon, FileTextIcon, UsersIcon, GlobeIcon, SearchIcon, CheckIcon, ChevronUpIcon, MicIcon } from 'lucide-react';
import { countries } from '../../constants/countries';
import logo from '../../hoclogo.png';
import { createPortal } from 'react-dom';

// Country groups based on complexity
const COUNTRY_GROUPS = {
  FAST: ['netherlands', 'ireland', 'estonia', 'lithuania', 'latvia'],
  MEDIUM: ['germany', 'france', 'spain', 'italy', 'belgium', 'luxembourg'],
  COMPLEX: ['austria', 'poland', 'hungary', 'greece', 'romania', 'bulgaria']
};
// Popular countries to display in the selector
const popularCountries = ['netherlands', 'germany', 'france', 'spain', 'ireland', 'italy', 'belgium', 'austria', 'denmark', 'finland', 'sweden'];
// Get country flag emoji
const getCountryFlag = (countryCode: string) => {
  const flagEmojis: { [key: string]: string } = {
    austria: '🇦🇹',
    belgium: '🇧🇪',
    bulgaria: '🇧🇬',
    croatia: '🇭🇷',
    cyprus: '🇨🇾',
    czechia: '🇨🇿',
    denmark: '🇩🇰',
    estonia: '🇪🇪',
    finland: '🇫🇮',
    france: '🇫🇷',
    germany: '🇩🇪',
    greece: '🇬🇷',
    hungary: '🇭🇺',
    ireland: '🇮🇪',
    italy: '🇮🇹',
    latvia: '🇱🇻',
    lithuania: '🇱🇹',
    luxembourg: '🇱🇺',
    malta: '🇲🇹',
    netherlands: '🇳🇱',
    poland: '🇵🇱',
    portugal: '🇵🇹',
    romania: '🇷🇴',
    slovakia: '🇸🇰',
    slovenia: '🇸🇮',
    spain: '🇪🇸',
    sweden: '🇸🇪'
  };
  return flagEmojis[countryCode] || '🇪🇺';
};
// Function to determine country complexity group
const getCountryComplexityGroup = (countryCode: string) => {
  if (COUNTRY_GROUPS.FAST.includes(countryCode)) return 'Fast';
  if (COUNTRY_GROUPS.MEDIUM.includes(countryCode)) return 'Medium';
  if (COUNTRY_GROUPS.COMPLEX.includes(countryCode)) return 'Complex';
  return 'Medium';
};

// Service dropdown items
const serviceItems = [{
  name: 'Company Formation',
  description: 'Register your business in the Netherlands',
  href: '/services/company-formation'
}, {
  name: 'Company Essentials',
  description: 'Essential services for EU business setup',
  href: '/services/company-essentials'
}, {
  name: 'Mailbox',
  description: 'Get a prestigious Dutch business address',
  href: '/services/mailbox'
}, {
  name: 'Accounting',
  description: 'Financial management for your business',
  href: '/services/accounting'
}, {
  name: 'Tax Filing',
  description: 'Stay compliant with Dutch tax regulations',
  href: '/services/tax-filing'
}, {
  name: 'Corporate Secretary',
  description: 'Maintain legal compliance for your entity',
  href: '/services/corporate-secretary'
}, {
  name: 'Legal',
  description: 'Expert legal support for your business',
  href: '/services/legal'
}, {
  name: 'Marketing Services',
  description: 'AI-powered marketing solutions for global reach',
  href: '/services/marketing'
}];
// Resources dropdown items
const resourceItems = [{
  name: 'Knowledge Base',
  description: 'Guides and articles for business owners',
  href: '/resources/knowledge-base'
}, {
  name: 'Blog',
  description: 'Latest news and business insights',
  href: '/blog'
}, {
  name: 'FAQ',
  description: 'Answers to common questions',
  href: '/resources/faq'
}, {
  name: 'Case Studies',
  description: 'Success stories from our clients',
  href: '/resources/case-studies'
}];

// Add type definitions for navigation items
type NavigationItem = {
  name: string;
  type: 'dropdown' | 'link';
  href?: string;
  items?: Array<{
    name: string;
    description: string;
    href: string;
  }>;
};

const navigationItems: NavigationItem[] = [
  {
    name: 'Solutions',
    type: 'dropdown',
    items: serviceItems,
  },
  {
    name: 'eBranch',
    type: 'link',
    href: '/ebranch'
  },
  {
    name: 'Company',
    type: 'dropdown',
    items: [
      {
        name: 'About Us',
        description: 'Learn more about our company',
        href: '/about-us',
      },
      {
        name: 'Contact Us',
        description: 'Get in touch with our team',
        href: '/contact',
      },
    ]
  },
  {
    name: 'Pricing',
    type: 'link',
    href: '/pricing'
  },
  
  {
    name: 'Resources',
    type: 'dropdown',
    items: resourceItems
  }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('netherlands');
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setShowCountrySelector(false);
    // Save country preference to localStorage
    localStorage.setItem('preferredCountry', country);
  };

  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry');
    if (savedCountry && countries[savedCountry as keyof typeof countries]) {
      setSelectedCountry(savedCountry);
    }
  }, []);

  // Filter countries based on search query
  const filteredCountries = Object.keys(countries).filter(code => 
    countries[code as keyof typeof countries].toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  // Tutorial categories and items
  const tutorialCategories = [
    {
      name: 'Getting Started',
      icon: BookOpenIcon,
      items: [
        {
          name: `Choosing the Right ${countries[selectedCountry as keyof typeof countries]} Business Entity`,
          description: 'Find the best legal structure for your needs',
          href: `/tutorials/choosing-${selectedCountry}-business-entity`,
          countrySpecific: true,
        },
        {
          name: `Required Documents for ${countries[selectedCountry as keyof typeof countries]} Registration`,
          description: 'Prepare all necessary paperwork',
          href: `/tutorials/required-documents-${selectedCountry}`,
          countrySpecific: true,
        },
        {
          name: 'Understanding EU Business Registration',
          description: 'Navigate the registration process',
          href: '/tutorials/eu-registration-process',
          countrySpecific: false,
        },
      ],
    },
    {
      name: 'Business Formation',
      icon: BuildingIcon,
      items: [
        {
          name: `Setting Up a ${countries[selectedCountry as keyof typeof countries]} Company`,
          description: 'Create a private limited company',
          href: `/tutorials/setting-up-${selectedCountry}-company`,
          countrySpecific: true,
        },
        {
          name: `Branch Registration in ${countries[selectedCountry as keyof typeof countries]}`,
          description: `Establish a foreign branch in ${countries[selectedCountry as keyof typeof countries]}`,
          href: `/tutorials/branch-registration/${selectedCountry}`,
          countrySpecific: true,
        },
        {
          name: 'Articles of Association',
          description: 'Understand key components',
          href: '/tutorials/articles-of-association',
          countrySpecific: false,
        },
        {
          name: 'Appointing Directors',
          description: 'Legal requirements for management',
          href: '/tutorials/appointing-directors',
          countrySpecific: false,
        },
      ],
    },
    {
      name: 'Taxation',
      icon: PercentIcon,
      items: [
        {
          name: `${countries[selectedCountry as keyof typeof countries]} VAT Requirements`,
          description: 'Understand value-added tax obligations',
          href: `/tutorials/${selectedCountry}-vat-requirements`,
          countrySpecific: true,
        },
        {
          name: `Corporate Tax Filing in ${countries[selectedCountry as keyof typeof countries]}`,
          description: 'Annual corporate tax procedures',
          href: `/tutorials/${selectedCountry}-corporate-tax-filing`,
          countrySpecific: true,
        },
        {
          name: 'EU Tax Incentives',
          description: 'Benefits for European businesses',
          href: '/tutorials/eu-tax-incentives',
          countrySpecific: false,
        },
      ],
    },
    {
      name: 'Banking & Finance',
      icon: CoinsIcon,
      items: [
        {
          name: `${countries[selectedCountry as keyof typeof countries]} Business Bank Account`,
          description: 'Opening and managing accounts',
          href: `/tutorials/${selectedCountry}-business-bank-account`,
          countrySpecific: true,
        },
        {
          name: `Business Financing in ${countries[selectedCountry as keyof typeof countries]}`,
          description: 'Funding sources in your target country',
          href: `/tutorials/${selectedCountry}-business-financing`,
          countrySpecific: true,
        },
        {
          name: 'Managing International Payments',
          description: 'Cross-border transaction best practices',
          href: '/tutorials/managing-international-payments',
          countrySpecific: false,
        },
      ],
    },
    {
      name: 'Compliance',
      icon: FileTextIcon,
      items: [
        {
          name: `${countries[selectedCountry as keyof typeof countries]} Compliance Calendar`,
          description: 'Key deadlines for companies',
          href: `/tutorials/${selectedCountry}-compliance-calendar`,
          countrySpecific: true,
        },
        {
          name: `UBO Registration in ${countries[selectedCountry as keyof typeof countries]}`,
          description: 'Ultimate beneficial owner requirements',
          href: `/tutorials/${selectedCountry}-ubo-registration`,
          countrySpecific: true,
        },
        {
          name: 'GDPR Compliance',
          description: 'Data protection for EU businesses',
          href: '/tutorials/gdpr-compliance',
          countrySpecific: false,
        },
      ],
    },
    {
      name: 'Human Resources',
      icon: UsersIcon,
      items: [
        {
          name: `Hiring Employees in ${countries[selectedCountry as keyof typeof countries]}`,
          description: 'Employment regulations explained',
          href: `/tutorials/hiring-employees-${selectedCountry}`,
          countrySpecific: true,
        },
        {
          name: `${countries[selectedCountry as keyof typeof countries]} Employment Contracts`,
          description: 'Legal requirements explained',
          href: `/tutorials/${selectedCountry}-employment-contracts`,
          countrySpecific: true,
        },
        {
          name: 'EU Payroll and Benefits',
          description: 'Administration and compliance',
          href: '/tutorials/eu-payroll-benefits',
          countrySpecific: false,
        },
      ],
    },
  ];

  return  <header className="bg-[#0F0B1F]/80 backdrop-blur-md border-b border-[#2D2755] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-17 w-20" />
              
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            {navigationItems.map((item) => (
              item.type === 'dropdown' && item.name !== 'Resources' ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.name.toLowerCase())}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors flex items-center
                      ${item.name === 'Solutions' ?
                        (openDropdown === 'solutions'
                          ? 'bg-[#1B1537] text-white'
                          : 'text-white bg-transparent hover:bg-[#1B1537]')
                        : item.name === 'Company' ?
                          (openDropdown === 'company'
                            ? 'bg-[#1B1537] text-white'
                            : 'text-white bg-transparent hover:bg-[#1B1537]')
                        : 'rounded-lg font-medium ' + (location.pathname.startsWith('/' + item.name.toLowerCase())
                          ? 'bg-[#EA3A70]/10 text-[#EA3A70]'
                          : 'text-white hover:bg-[#1B1537] hover:text-white')
                      }
                    `}
                  >
                    {item.name}
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </button>
                  {openDropdown === item.name.toLowerCase() && item.items && (
                    item.name === 'Company' ? (
                      <div className="absolute top-full left-0 mt-1 w-80 bg-[#1B1537] rounded-xl shadow-lg shadow-black/20 border border-[#2D2755] p-6 z-20">
                        {item.items.map((subItem) => (
                          <div key={subItem.name} className="mb-6">
                            <Link
                              to={subItem.href}
                              className="block group"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="font-bold text-white group-hover:text-[#EA3A70] text-base mb-1">{subItem.name}</div>
                              <div className="text-sm text-gray-300 group-hover:text-gray-200">{subItem.description}</div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="absolute top-full left-0 mt-1 w-[600px] bg-[#1B1537] rounded-xl shadow-lg shadow-black/20 border border-[#2D2755] p-6 z-20">
                        <div className="border-b border-[#2D2755] mb-4"></div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {item.items.map((subItem) => (
                            <div key={subItem.name} className="mb-2">
                              <Link
                                to={subItem.href}
                                className="block group"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="font-bold text-white group-hover:text-[#EA3A70] text-base mb-1">{subItem.name}</div>
                                <div className="text-sm text-gray-300 group-hover:text-gray-200">{subItem.description}</div>
                              </Link>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-[#2D2755] mt-6 pt-2 text-center">
                          <Link
                            to="/services"
                            className="text-[#EA3A70] text-base font-medium hover:underline"
                            onClick={() => setOpenDropdown(null)}
                          >
                            View All Services
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : item.type === 'link' ? (
                <Link
                  key={item.name}
                  to={item.href || '/'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-[#EA3A70]/10 text-[#EA3A70]'
                      : 'text-white hover:bg-[#1B1537] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ) : null
            ))}

            {/* Tutorials Mega Menu with Country Selector - moved before Resources */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('tutorials')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  location.pathname.startsWith('/tutorials')
                    ? 'bg-[#EA3A70]/10 text-[#EA3A70]'
                    : 'text-white hover:bg-[#1B1537] hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">Tutorials</span>
                  <div className="flex items-center bg-[#2D2755]/50 rounded-full px-2 py-0.5 text-xs">
                    <span className="mr-1" aria-hidden="true">
                      {getCountryFlag(selectedCountry)}
                    </span>
                    <span className="uppercase">
                      {selectedCountry.substring(0, 2)}
                    </span>
                  </div>
                </div>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              {openDropdown === 'tutorials' && (
                <div className="absolute top-full right-0 mt-1 w-[600px] bg-[#1B1537] rounded-lg shadow-lg shadow-black/20 border border-[#2D2755] p-4 z-20 max-h-[70vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#2D2755]">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2" aria-hidden="true">
                        {getCountryFlag(selectedCountry)}
                      </span>
                      <div>
                        <div className="text-xs text-indigo-300">
                          Currently viewing
                        </div>
                        <div className="text-white font-medium">
                          {countries[selectedCountry as keyof typeof countries]}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowCountrySelector(true)
                      }}
                      className="px-3 py-1 bg-[#2D2755] hover:bg-[#3D3765] text-white text-sm rounded-lg transition-colors flex items-center"
                    >
                      <GlobeIcon className="h-4 w-4 mr-2" />
                      Change Country
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {tutorialCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center pb-2 mb-2 border-b border-[#2D2755]">
                          <category.icon className="h-4 w-4 text-[#EA3A70] mr-2" />
                          <h3 className="text-sm font-semibold text-white">
                            {category.name}
                          </h3>
                        </div>
                        <div className="space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block px-3 py-2 text-xs hover:bg-[#2D2755]/30 hover:text-[#EA3A70] rounded-md transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-white">
                                  {item.name}
                                </div>
                                {item.countrySpecific && (
                                  <span className="text-xs" aria-hidden="true">
                                    {getCountryFlag(selectedCountry)}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#2D2755] text-center">
                    <Link
                      to="/tutorials"
                      className="text-[#EA3A70] text-sm font-medium hover:underline"
                      onClick={() => setOpenDropdown(null)}
                    >
                      View All Tutorials
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown - always last */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${location.pathname.startsWith('/resources') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#1B1537] hover:text-white'}`}
              >
                Resources
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-[#1B1537] rounded-lg shadow-lg shadow-black/20 border border-[#2D2755] py-2 z-20">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 text-sm hover:bg-[#2D2755]/30 hover:text-[#EA3A70] transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceAssistant(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center text-white hover:bg-[#1B1537] hover:text-[#EA3A70]"
                title="Voice Assistant"
              >
                <MicIcon className="h-4 w-4 mr-2" />
                <span>Voice Assistant</span>
              </button>
            </div>
          </nav>
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://clientdashboard2.houseofcompanies.co.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-[#EA3A70]/20"
            >
              Start For Free
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-[#1B1537] focus:outline-none" aria-expanded={isMenuOpen}>
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-[#1B1537] border-t border-[#2D2755]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            {/* Mobile Services Section */}
            <div className="space-y-1">
              <button onClick={() => toggleDropdown('mobile-services')} className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${location.pathname.startsWith('/services') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}>
                Services
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {openDropdown === 'mobile-services' && <div className="pl-4 space-y-1 border-l border-[#2D2755] ml-3">
                  {serviceItems.map(item => <Link key={item.name} to={item.href} className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30" onClick={() => setIsMenuOpen(false)}>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </Link>)}
                </div>}
            </div>
            <Link to="/ebranch" className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/ebranch' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`} onClick={() => setIsMenuOpen(false)}>
              eBranch
            </Link>
            <Link to="/tools" className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/tools' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`} onClick={() => setIsMenuOpen(false)}>
              Tools
            </Link>
            <Link to="/pricing" className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/pricing' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`} onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            {/* Mobile Resources Section */}
            <div className="space-y-1">
              <button onClick={() => toggleDropdown('mobile-resources')} className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${location.pathname.startsWith('/resources') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}>
                Resources
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {openDropdown === 'mobile-resources' && <div className="pl-4 space-y-1 border-l border-[#2D2755] ml-3">
                  {resourceItems.map(item => <Link key={item.name} to={item.href} className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30" onClick={() => setIsMenuOpen(false)}>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </Link>)}
                </div>}
            </div>
            {/* Mobile Tutorials Section with Country Selector */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-[#2D2755]/30">
                <div className="flex items-center">
                  <span className="text-xl mr-2" aria-hidden="true">
                    {getCountryFlag(selectedCountry)}
                  </span>
                  <span className="text-white font-medium">
                    {countries[selectedCountry as keyof typeof countries]}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowCountrySelector(true)
                  }}
                  className="px-2 py-1 bg-[#2D2755] text-white text-xs rounded-lg"
                >
                  Change
                </button>
              </div>
              <button
                onClick={() => toggleDropdown('mobile-tutorials')}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${
                  location.pathname.startsWith('/tutorials')
                    ? 'bg-[#EA3A70]/10 text-[#EA3A70]'
                    : 'text-white hover:bg-[#2D2755]/30'
                }`}
              >
                Tutorials
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {openDropdown === 'mobile-tutorials' && (
                <div className="pl-4 space-y-3 border-l border-[#2D2755] ml-3 py-2">
                  {tutorialCategories.map((category) => (
                    <div key={category.name} className="space-y-1">
                      <div className="flex items-center">
                        <category.icon className="h-4 w-4 text-[#EA3A70] mr-2" />
                        <span className="text-sm font-medium text-white">
                          {category.name}
                        </span>
                      </div>
                      <div className="pl-6 space-y-1 mt-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-2 py-1 rounded-md text-sm text-gray-300 hover:bg-[#2D2755]/30 hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              {item.countrySpecific && (
                                <span className="text-xs" aria-hidden="true">
                                  {getCountryFlag(selectedCountry)}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/tutorials"
                    className="block px-2 py-2 text-[#EA3A70] text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Tutorials
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile menu login section */}
            <div className="pt-4 pb-2 border-t border-[#2D2755]">
              <a 
                href="https://clientdashboard-hoc.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 mt-2 text-center bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white rounded-lg shadow-sm shadow-[#EA3A70]/20" 
                onClick={() => setIsMenuOpen(false)}
              >
                Start For Free
              </a>
            </div>
          </div>
        </div>}
      {/* Country Selector Modal */}
      {showCountrySelector && createPortal(
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" style={{ isolation: 'isolate' }}>
          <div className="bg-[#1B1537] rounded-xl border border-[#2D2755] w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl relative">
            {/* Header */}
            <div className="p-6 border-b border-[#2D2755] flex justify-between items-center flex-shrink-0">
              <h3 className="text-xl font-bold text-white">Select Country</h3>
              <button 
                onClick={() => setShowCountrySelector(false)} 
                className="p-2 rounded-full hover:bg-[#2D2755]/50 transition-colors"
              >
                <XIcon className="h-5 w-5 text-white" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <p className="text-indigo-200 mb-4">
                  Select your country of interest to see tailored content across
                  our site
                </p>
                
                {/* Search Box */}
                <div className="relative mb-4">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-400" />
                  <input 
                    type="text" 
                    placeholder="Search countries..." 
                    value={countrySearchQuery} 
                    onChange={e => setCountrySearchQuery(e.target.value)} 
                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg pl-10 pr-4 py-2 text-white placeholder-indigo-400 focus:outline-none focus:border-[#EA3A70]/50" 
                  />
                </div>
                
                {/* Popular Countries */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-indigo-400 mb-2 uppercase">
                    Popular Countries
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {popularCountries.map(countryCode => (
                      <button 
                        key={countryCode} 
                        onClick={() => handleCountryChange(countryCode)} 
                        className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                          selectedCountry === countryCode 
                            ? 'bg-[#EA3A70]/20 border border-[#EA3A70]/30' 
                            : 'hover:bg-[#2D2755]/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-3" aria-hidden="true">
                            {getCountryFlag(countryCode)}
                          </span>
                          <span className="text-white text-sm">
                            {countries[countryCode as keyof typeof countries]}
                          </span>
                        </div>
                        {selectedCountry === countryCode && <CheckIcon className="h-4 w-4 text-[#EA3A70]" />}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* All Countries */}
                <div>
                  <h4 className="text-xs font-medium text-indigo-400 mb-2 uppercase">
                    {countrySearchQuery ? 'Search Results' : 'All Countries'}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredCountries.map(countryCode => (
                      <button 
                        key={countryCode} 
                        onClick={() => handleCountryChange(countryCode)} 
                        className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                          selectedCountry === countryCode 
                            ? 'bg-[#EA3A70]/20 border border-[#EA3A70]/30' 
                            : 'hover:bg-[#2D2755]/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-3" aria-hidden="true">
                            {getCountryFlag(countryCode)}
                          </span>
                          <span className="text-white text-sm">
                            {countries[countryCode as keyof typeof countries]}
                          </span>
                        </div>
                        {selectedCountry === countryCode && <CheckIcon className="h-4 w-4 text-[#EA3A70]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-[#2D2755] bg-[#0F0B1F]/50 flex-shrink-0">
              <div className="flex justify-between items-center">
                <p className="text-xs text-indigo-300">
                  Your selection will be remembered across the site
                </p>
                <button 
                  onClick={() => setShowCountrySelector(false)} 
                  className="px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors text-sm font-medium"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && createPortal(
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4" style={{ isolation: 'isolate' }}>
          <div className="relative w-full max-w-4xl h-[85vh] bg-[#000000] rounded-2xl shadow-2xl overflow-hidden border border-indigo-900/30">
            {/* Header with Voice Assistant Icon and Text */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-black/98 backdrop-blur-sm border-b border-indigo-900/40 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-[#EA3A70]/20 rounded-lg mr-3 border border-[#EA3A70]/30">
                  <MicIcon className="h-5 w-5 text-[#EA3A70]" />
                </div>
                <span className="text-lg font-semibold text-white">Voice Assistant</span>
              </div>
              <button 
                onClick={() => setShowVoiceAssistant(false)} 
                className="p-2 hover:bg-indigo-900/30 text-gray-400 hover:text-white rounded-full transition-colors border border-indigo-800/40"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Iframe */}
            <iframe
              src="https://voice-xi-seven.vercel.app/"
              className="w-full h-full border-0 mt-16"
              title="Voice Assistant"
              allow="microphone; camera; geolocation"
              allowFullScreen
              style={{
                backgroundColor: '#000000'
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </header>;
}