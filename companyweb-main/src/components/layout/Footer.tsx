import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import logo from '../../hoclogo.png';

export function Footer() {
  return <footer className="bg-[#0A0826] border-t border-[#4A2D80]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Logo" className="h-17 w-20" />
            </Link>
           
            <div className="space-y-4">
              <div className="flex items-start text-indigo-300">
                <MapPinIcon className="h-4 w-4 mr-2 mt-1" />
                <div className="space-y-1">
                  <p>Stichting House of Companies</p>
                  <p>KvK: 62871676</p>
                  <p>Laanzichtweg 60B</p>
                  <p>4847 SJ Breda</p>
                  <p>The Netherlands</p>
                </div>
              </div>

              <div className="flex items-start text-indigo-300">
                <MapPinIcon className="h-4 w-4 mr-2 mt-1" />
                <div className="space-y-1">
                  <p className="font-medium">Branch Offices:</p>
                  <p>Thub</p>
                  <p>Hyderabad, India</p>
                </div>
              </div>

              <div className="flex items-center text-indigo-300">
                <MailIcon className="h-4 w-4 mr-2" />
                <a href="mailto:support@houseofcompanies.io" className="hover:text-[#EA3A70]">
                  support@houseofcompanies.io
                </a>
              </div>
              <div className="flex items-start text-indigo-300">
                <PhoneIcon className="h-4 w-4 mr-2 mt-1" />
                <div className="space-y-1">
                  <a href="tel:+31701234567" className="hover:text-[#EA3A70] block">
                    Netherlands: +31 70 123 4567
                  </a>
                  <a href="tel:+919876543210" className="hover:text-[#EA3A70] block">
                    India: +91 789 352 5665
                  </a>
                </div>
              </div>   
            </div>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/company-formation" className="text-indigo-300 hover:text-[#EA3A70]">
                  Company Formation
                </Link>
              </li>
              <li>
                <Link to="/services/mailbox" className="text-indigo-300 hover:text-[#EA3A70]">
                  Mailbox
                </Link>
              </li>
              <li>
                <Link to="/services/accounting" className="text-indigo-300 hover:text-[#EA3A70]">
                  Accounting
                </Link>
              </li>
              <li>
                <Link to="/services/tax-filing" className="text-indigo-300 hover:text-[#EA3A70]">
                  Tax Filing
                </Link>
              </li>
              <li>
                <Link to="/services/corporate-secretary" className="text-indigo-300 hover:text-[#EA3A70]">
                  Corporate Secretary
                </Link>
              </li>
              <li>
                <Link to="/services/legal" className="text-indigo-300 hover:text-[#EA3A70]">
                  Legal
                </Link>
              </li>
              <li>
                <Link to="/ebranch" className="text-indigo-300 hover:text-[#EA3A70]">
                  eBranch
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tutorials/getting-started" className="text-indigo-300 hover:text-[#EA3A70]">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/resources/knowledge-base" className="text-indigo-300 hover:text-[#EA3A70]">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="text-indigo-300 hover:text-[#EA3A70]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources/faq" className="text-indigo-300 hover:text-[#EA3A70]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/resources/case-studies" className="text-indigo-300 hover:text-[#EA3A70]">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-indigo-300 hover:text-[#EA3A70]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-indigo-300 hover:text-[#EA3A70]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-indigo-300 hover:text-[#EA3A70]">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-indigo-300 hover:text-[#EA3A70]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-indigo-300 hover:text-[#EA3A70]">
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-[#EA3A70]">
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-[#EA3A70]">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-[#EA3A70]">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-[#EA3A70]">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#4A2D80]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} House of Companies. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-indigo-300 hover:text-[#EA3A70] text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-indigo-300 hover:text-[#EA3A70] text-sm">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-indigo-300 hover:text-[#EA3A70] text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}