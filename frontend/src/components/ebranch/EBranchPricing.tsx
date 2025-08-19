import React from 'react'
import { CheckIcon, ArrowRightIcon, ShieldIcon, GlobeIcon } from 'lucide-react'
export function EBranchPricing() {
  const features = [
    'Company Formation',
    'Business Address',
    'Mail Management',
    'Document Processing',
    'Tax Compliance',
    'Corporate Governance',
    'Financial Management',
    'Legal Document Generation',
    'Marketing Support',
    'Multi-jurisdictional Capabilities',
    'Unlimited Users',
    'Mobile App Access',
    'Continuous Updates',
    'Technical Support',
  ]
  const addons = [
    {
      name: 'Expert Human Review',
      description: 'For complex situations requiring specialist oversight',
      price: 299,
      unit: 'per instance',
    },
    {
      name: 'Specialist Consultation',
      description: 'Direct access to domain experts for custom advice',
      price: 199,
      unit: 'per hour',
    },
    {
      name: 'Custom Implementation',
      description: 'Tailored solutions for unique business requirements',
      price: null,
      unit: 'Quoted per requirements',
    },
  ]
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EA3A70]/20 text-[#EA3A70] mb-4 backdrop-blur-sm">
            <ShieldIcon className="h-4 w-4 mr-2" />
            <span>All-Inclusive Package</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            One Platform, One Price
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to establish and manage your business operations
            in one subscription
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-2xl border border-[#EA3A70]/30 overflow-hidden shadow-xl shadow-[#0F0B1F]/50">
            <div className="p-8 text-center">
              <div className="inline-flex items-center mb-4">
                <GlobeIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                <span className="text-white font-medium">eBranch Platform</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Your complete European business operations system
              </h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold text-white">€199</span>
                <span className="text-gray-300 ml-2">/ month</span>
              </div>
              <p className="text-[#EA3A70] mb-8">
                All solutions included, price locked for 5 years
              </p>
              <button className="w-full px-6 py-4 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors font-medium shadow-md shadow-[#EA3A70]/20 flex items-center justify-center">
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
              <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
                <ShieldIcon className="h-4 w-4 mr-1" />
                <span>
                  Our platform works across all European jurisdictions with no
                  additional cross-border fees
                </span>
              </div>
            </div>
            <div className="border-t border-[#2D2755] p-8">
              <h4 className="text-xl font-bold text-white mb-6">
                Everything Included:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-1 rounded-full bg-[#EA3A70]/20 mr-3 mt-1">
                      <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#2D2755]">
                <h4 className="text-lg font-medium text-white mb-4">
                  Optional Services (Only When Needed):
                </h4>
                <div className="space-y-4">
                  {addons.map((addon, index) => (
                    <div
                      key={index}
                      className="bg-[#2D2755]/30 rounded-lg p-4 border border-[#2D2755] flex flex-wrap items-center justify-between"
                    >
                      <div className="mr-4">
                        <h5 className="text-white font-medium">{addon.name}</h5>
                        <p className="text-gray-400 text-sm">
                          {addon.description}
                        </p>
                      </div>
                      <div className="flex items-baseline">
                        {addon.price ? (
                          <>
                            <span className="text-xl font-bold text-white">
                              €{addon.price}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">
                              {addon.unit}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            {addon.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
