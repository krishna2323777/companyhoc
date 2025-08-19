import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, BuildingIcon, CoinsIcon, FileTextIcon, PercentIcon, UsersIcon, ArrowRightIcon } from 'lucide-react';
export function TutorialCategories() {
  const categories = [{
    name: 'Getting Started',
    description: 'First steps for establishing your Dutch business',
    icon: BookOpenIcon,
    tutorials: [{
      title: 'Choosing the Right Dutch Business Entity',
      duration: '8 min read',
      href: '/tutorials/choosing-dutch-business-entity'
    }, {
      title: 'Required Documents for Company Registration',
      duration: '6 min read',
      href: '/tutorials/required-documents-registration'
    }, {
      title: 'Understanding the KVK Registration Process',
      duration: '10 min read',
      href: '/tutorials/kvk-registration-process'
    }]
  }, {
    name: 'Company Formation',
    description: 'Legal aspects of setting up your entity',
    icon: BuildingIcon,
    tutorials: [{
      title: 'Setting Up a Dutch BV Company',
      duration: '12 min read',
      href: '/tutorials/setting-up-dutch-bv'
    }, {
      title: 'Branch Registration in the Netherlands',
      duration: '15 min read',
      href: '/tutorials/branch-registration'
    }, {
      title: 'Articles of Association: Key Components',
      duration: '7 min read',
      href: '/tutorials/articles-of-association'
    }, {
      title: 'Appointing Directors for Your Dutch Entity',
      duration: '5 min read',
      href: '/tutorials/appointing-directors'
    }]
  }, {
    name: 'Banking & Finance',
    description: 'Managing your business finances',
    icon: CoinsIcon,
    tutorials: [{
      title: 'Opening a Dutch Business Bank Account',
      duration: '9 min read',
      href: '/tutorials/dutch-business-bank-account'
    }, {
      title: 'Business Financing Options in the Netherlands',
      duration: '11 min read',
      href: '/tutorials/business-financing-netherlands'
    }, {
      title: 'Managing International Payments',
      duration: '6 min read',
      href: '/tutorials/managing-international-payments'
    }]
  }, {
    name: 'Taxation',
    description: 'Dutch tax compliance and optimization',
    icon: PercentIcon,
    tutorials: [{
      title: 'Understanding Dutch VAT Requirements',
      duration: '10 min read',
      href: '/tutorials/dutch-vat-requirements'
    }, {
      title: 'Corporate Tax Filing in the Netherlands',
      duration: '14 min read',
      href: '/tutorials/corporate-tax-filing'
    }, {
      title: 'Tax Incentives for Dutch Businesses',
      duration: '8 min read',
      href: '/tutorials/tax-incentives'
    }]
  }, {
    name: 'Compliance',
    description: 'Meeting regulatory requirements',
    icon: FileTextIcon,
    tutorials: [{
      title: 'Annual Compliance Calendar for Dutch Companies',
      duration: '7 min read',
      href: '/tutorials/annual-compliance-calendar'
    }, {
      title: 'UBO Registration Requirements',
      duration: '5 min read',
      href: '/tutorials/ubo-registration'
    }, {
      title: 'GDPR Compliance for Dutch Businesses',
      duration: '9 min read',
      href: '/tutorials/gdpr-compliance'
    }]
  }, {
    name: 'Human Resources',
    description: 'Employment and staffing in the Netherlands',
    icon: UsersIcon,
    tutorials: [{
      title: 'Hiring Employees in the Netherlands',
      duration: '11 min read',
      href: '/tutorials/hiring-employees'
    }, {
      title: 'Dutch Employment Contracts Explained',
      duration: '8 min read',
      href: '/tutorials/employment-contracts'
    }, {
      title: 'Payroll and Benefits Administration',
      duration: '7 min read',
      href: '/tutorials/payroll-benefits'
    }]
  }];
  return <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categories.map((category, index) => <div key={index}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-[#2D2755]/50 border border-[#2D2755] mr-4">
                  <category.icon className="h-6 w-6 text-[#EA3A70]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {category.name}
                  </h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.tutorials.map((tutorial, idx) => <Link key={idx} to={tutorial.href} className="group bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-5 border border-[#2D2755] hover:border-[#EA3A70]/50 transition-all shadow-lg shadow-[#0F0B1F]/50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-white group-hover:text-[#EA3A70] transition-colors">
                        {tutorial.title}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {tutorial.duration}
                      </span>
                    </div>
                    <div className="flex items-center text-[#EA3A70] text-sm font-medium">
                      Read tutorial
                      <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>)}
              </div>
              <div className="mt-6 text-right">
                <Link to={`/tutorials/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center text-[#EA3A70] font-medium hover:underline">
                  View all {category.name} tutorials
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}