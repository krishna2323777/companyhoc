import React, { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  BuildingIcon,
  GlobeIcon,
  CheckIcon,
  InfoIcon,
  EuroIcon,
  XIcon,
  FileTextIcon,
  BarChartIcon,
  SparklesIcon,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const destinations = [
  {
    city: 'Berlin',
    country: 'Germany',
    image:
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=2940',
    rating: '4.9',
    growth: '+4.7%',
    price: '395',
    workforce: '12.1M',
    marketSize: '€4.2T',
    featured: true,
    tag: 'Largest EU Economy',
    benefits: [
      'Large domestic market',
      'Strong tech ecosystem',
      'R&D excellence',
      'Skilled talent pool',
    ],
    description:
      "Germany's economic powerhouse with Europe's largest market. Access to 83M consumers and a robust manufacturing base.",
    categories: ['Legal Entity', 'Sales Office'],
  },
  {
    city: 'Paris',
    country: 'France',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2946',
    rating: '4.8',
    growth: '+4.1%',
    price: '445',
    workforce: '10.8M',
    marketSize: '€2.9T',
    featured: true,
    tag: 'Innovation Hub',
    benefits: [
      'Innovation incentives',
      'Central EU location',
      'Strong financial sector',
      'Global connectivity',
    ],
    description:
      'Second-largest EU economy with exceptional infrastructure and strong government support for innovation.',
    categories: ['Legal Entity', 'Start-up'],
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    image:
      'https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&q=80&w=2940',
    rating: '4.8',
    growth: '+5.2%',
    price: '295',
    workforce: '8.5M',
    marketSize: '€1.1T',
    featured: true,
    tag: 'Gateway to Europe',
    benefits: [
      'Strategic location',
      'Excellent infrastructure',
      'Tax advantages',
      'English proficiency',
    ],
    description:
      'Strategic gateway to Europe with world-class logistics and a business-friendly environment.',
    categories: ['Legal Entity', 'Virtual Office', 'Sales Office'],
  },
  {
    city: 'Milan',
    country: 'Italy',
    image:
      'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?auto=format&fit=crop&q=80&w=2940',
    rating: '4.7',
    growth: '+3.8%',
    price: '375',
    workforce: '9.2M',
    marketSize: '€2.0T',
    featured: false,
    tag: 'Manufacturing Excellence',
    benefits: [
      'Industrial strength',
      'Design & fashion hub',
      'Export focused',
      'Rich supply chains',
    ],
    description:
      'Industrial powerhouse with strong manufacturing and design heritage.',
    categories: ['Legal Entity', 'Sales Office'],
  },
  {
    city: 'Madrid',
    country: 'Spain',
    image:
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=2940',
    rating: '4.7',
    growth: '+4.3%',
    price: '325',
    workforce: '7.1M',
    marketSize: '€1.4T',
    featured: false,
    tag: 'Rising Tech Hub',
    benefits: [
      'Growing tech scene',
      'Quality of life',
      'Talent pool',
      'Lower costs',
    ],
    description:
      'Emerging technology hub with competitive operating costs and high quality of life.',
    categories: ['Start-up', 'Virtual Office'],
  },
  {
    city: 'Stockholm',
    country: 'Sweden',
    image:
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&q=80&w=2940',
    rating: '4.8',
    growth: '+3.9%',
    price: '425',
    workforce: '5.2M',
    marketSize: '€0.6T',
    featured: false,
    tag: 'Innovation Leader',
    benefits: [
      'Tech innovation',
      'Digital infrastructure',
      'Sustainability focus',
      'High R&D spending',
    ],
    description:
      'Leading innovation hub with exceptional digital infrastructure and sustainability focus.',
    categories: ['Start-up', 'Virtual Office'],
  },
  {
    city: 'Dublin',
    country: 'Ireland',
    image:
      'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&q=80&w=2940',
    rating: '4.7',
    growth: '+6.1%',
    price: '355',
    workforce: '4.5M',
    marketSize: '€0.5T',
    featured: false,
    tag: 'Tech Gateway',
    benefits: [
      'Low corporate tax',
      'English speaking',
      'Tech hub status',
      'EU market access',
    ],
    description:
      'Strategic English-speaking gateway with attractive corporate tax regime.',
    categories: ['Legal Entity', 'Virtual Office'],
  },
  {
    city: 'Vienna',
    country: 'Austria',
    image:
      'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?auto=format&fit=crop&q=80&w=2940',
    rating: '4.6',
    growth: '+3.7%',
    price: '385',
    workforce: '4.3M',
    marketSize: '€0.4T',
    featured: false,
    tag: 'Central Hub',
    benefits: [
      'Central location',
      'High quality of life',
      'Skilled workforce',
      'Stable economy',
    ],
    description:
      'Central European hub with exceptional quality of life and stable business environment.',
    categories: ['Sales Office', 'Virtual Office'],
  },
] as const
interface CountryInfoPopupProps {
  destination: any
  onClose: () => void
}
function CountryInfoPopup({ destination, onClose }: CountryInfoPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1B1537] rounded-lg max-w-2xl w-full border border-[#2D2755] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="h-48 relative">
          <img
            src={destination.image}
            alt={`${destination.city}, ${destination.country}`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1537] via-[#1B1537]/90 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-bold text-white">
              {destination.city}
            </h3>
            <p className="text-gray-300">{destination.country}</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-[#EA3A70] font-medium mb-3 flex items-center">
              <BarChartIcon className="h-4 w-4 mr-2" />
              Market Overview
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0F0B1F]/50 rounded p-3">
                <div className="text-sm text-gray-400 mb-1">Growth Rate</div>
                <div className="text-white font-medium">
                  {destination.growth}
                </div>
              </div>
              <div className="bg-[#0F0B1F]/50 rounded p-3">
                <div className="text-sm text-gray-400 mb-1">Workforce</div>
                <div className="text-white font-medium">
                  {destination.workforce}
                </div>
              </div>
              <div className="bg-[#0F0B1F]/50 rounded p-3">
                <div className="text-sm text-gray-400 mb-1">Setup Cost</div>
                <div className="text-white font-medium">
                  €{destination.price}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[#EA3A70] font-medium mb-3 flex items-center">
              <CheckIcon className="h-4 w-4 mr-2" />
              Key Benefits
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {destination.benefits.map((benefit: string) => (
                <div key={benefit} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-[#EA3A70] mt-1.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[#EA3A70] font-medium mb-3 flex items-center">
              <FileTextIcon className="h-4 w-4 mr-2" />
              Business Environment
            </h4>
            <p className="text-gray-300">{destination.description}</p>
          </div>
          <div className="flex space-x-4 pt-4 border-t border-[#2D2755]">
            <button className="flex-1 bg-[#EA3A70] text-white py-3 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center">
              <BuildingIcon className="h-4 w-4 mr-2" />
              Start Registration
            </button>
            <button className="flex-1 border border-[#EA3A70] text-[#EA3A70] py-3 rounded-lg font-medium hover:bg-[#EA3A70]/10 transition-colors flex items-center justify-center">
              <GlobeIcon className="h-4 w-4 mr-2" />
              Explore Market
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export function DestinationSlider() {
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Destinations')
  const navigate = useNavigate(); // Add this line
  const categories = [
    'All Destinations',
    'Sales Office',
    'Virtual Office',
    'Legal Entity',
    'Start-up',
  ]
  const filteredDestinations = destinations.filter(
    (destination) =>
      selectedCategory === 'All Destinations' ||
      destination.categories.includes(selectedCategory),
  )
  return (
    <div className="space-y-8">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full text-purple-400 backdrop-blur-sm">
            <SparklesIcon className="h-5 w-5 mr-2" />
            Market Opportunities
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
          Popular Destinations
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore prime business locations across Europe with real-time market
          intelligence
        </p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${category === selectedCategory ? 'bg-[#EA3A70] text-white' : 'bg-[#1B1537] text-gray-300 hover:bg-[#2D2755]'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.city}
            className="bg-[#1B1537] rounded-lg border border-[#2D2755] hover:border-[#EA3A70] transition-all"
          >
            <div className="flex items-center p-6">
              <div className="h-24 w-32 relative flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="w-full h-full object-cover"
                />
                {destination.featured && (
                  <div className="absolute top-2 right-2 bg-[#EA3A70] text-white text-xs px-2 py-1 rounded-full">
                    Hot Market
                  </div>
                )}
              </div>
              <div className="ml-6 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      {destination.city}
                      <span className="text-gray-400 text-base ml-2">
                        {destination.country}
                      </span>
                      <span className="ml-3 text-xs bg-[#2D2755] text-[#EA3A70] px-2 py-1 rounded-full">
                        {destination.tag}
                      </span>
                    </h3>
                    <div className="flex gap-2 mt-2">
                      {destination.categories.map((category) => (
                        <span
                          key={category}
                          className="text-xs bg-[#2D2755]/50 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      {destination.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-[#EA3A70]" />
                    <span className="text-white text-sm ml-1">
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-[#0F0B1F]/50 rounded p-2">
                    <div className="text-[#EA3A70] text-xs mb-1">
                      Market Size
                    </div>
                    <div className="text-white font-medium">
                      {destination.marketSize}
                    </div>
                  </div>
                  <div className="bg-[#0F0B1F]/50 rounded p-2">
                    <div className="text-[#EA3A70] text-xs mb-1">Growth</div>
                    <div className="text-white font-medium">
                      {destination.growth}
                    </div>
                  </div>
                  <div className="bg-[#0F0B1F]/50 rounded p-2">
                    <div className="text-[#EA3A70] text-xs mb-1">
                      Setup Cost
                    </div>
                    <div className="text-white font-medium">
                      €{destination.price}
                    </div>
                  </div>
                  <div className="bg-[#0F0B1F]/50 rounded p-2">
                    <div className="text-[#EA3A70] text-xs mb-1">Workforce</div>
                    <div className="text-white font-medium">
                      {destination.workforce}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to="/market-entry"
                    className="bg-[#2D2755] hover:bg-[#EA3A70] text-white py-2 px-4 rounded transition-colors text-sm flex items-center justify-center"
                  >
                    <BuildingIcon className="h-4 w-4 mr-2" />
                    Register Entity
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        destination.city === 'Amsterdam' &&
                        destination.country === 'Netherlands'
                      ) {
                        navigate('/netherlands-business-setup');
                      } else {
                        setSelectedDestination(destination);
                      }
                    }}
                    className="bg-[#0F0B1F] text-[#EA3A70] border border-[#EA3A70] py-2 px-4 rounded transition-colors text-sm flex items-center justify-center"
                  >
                    <InfoIcon className="h-4 w-4 mr-2" />
                    Market Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <CountryInfoPopup
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  )
}
