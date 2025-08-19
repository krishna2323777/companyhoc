import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TutorialContent } from '../components/tutorials/TutorialContent';
import { RelatedTutorials } from '../components/tutorials/RelatedTutorials';
import { CtaSection } from '../components/home/CtaSection';
import { CheckCircleIcon, ArrowLeftIcon, ChevronRightIcon } from 'lucide-react';

export function TutorialDetail() {
  const [activeStep, setActiveStep] = useState(1);

  // Comprehensive Dutch BV setup tutorial steps
  const tutorialSteps = [
    {
      title: 'Determine the Right Entity Type',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Dutch Business District" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Dutch Business District</h3>
              <p className="text-gray-200 text-sm">Amsterdam's financial center</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            Before proceeding with a BV (Besloten Vennootschap) setup, confirm this entity type aligns with your business goals and circumstances. The BV offers several distinct advantages:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">BV Advantages</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Limited Liability Protection</h4>
                  <p className="text-gray-300 text-sm">Your personal assets remain protected from business debts and liabilities</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Professional Image</h4>
                  <p className="text-gray-300 text-sm">Enhanced credibility with clients, suppliers, and business partners</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Tax Efficiency</h4>
                  <p className="text-gray-300 text-sm">Corporate tax rate of 15% on first €395,000 profit and 25.8% above that</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-300 mb-2">Important Note</h4>
            <p className="text-yellow-200 text-sm">
              In some circumstances, we will insist that the Company obtain a 'Tax Memorandum' or even 'Legal Opinion' 
              to ensure proper tax treatment, particularly for international structures.
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed">
            However, a BV requires more administration than a sole proprietorship (Eenmanszaak) or partnership (VOF). 
            If your business is small with minimal liability risks and you prefer simpler administration, consider these alternatives.
          </p>
        </div>
      ),
      isCompleted: true
    },
    {
      title: 'Choose a Company Name',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Dutch Chamber of Commerce" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Dutch Chamber of Commerce</h3>
              <p className="text-gray-200 text-sm">KVK registration process</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            Selecting an appropriate name for your Dutch BV is crucial and must adhere to specific requirements:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Name Requirements</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Uniqueness Requirement</h4>
                  <p className="text-gray-300 text-sm">Your company name must be distinct from existing registered companies</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">BV Suffix</h4>
                  <p className="text-gray-300 text-sm">The name must include "BV" or "Besloten Vennootschap" at the end</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Restricted Terms</h4>
                  <p className="text-gray-300 text-sm">Avoid terms suggesting government affiliation (e.g., "Royal", "National") without proper authorization</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Language Considerations</h4>
                  <p className="text-gray-300 text-sm">Names can be in Dutch or other languages, but must use Latin characters</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Trademark Verification</h4>
                  <p className="text-gray-300 text-sm">Check that your desired name doesn't infringe on existing trademarks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Pro Tip</h4>
            <p className="text-blue-200 text-sm">
              Even before formal registration, you can perform a preliminary name check through the Dutch Chamber of Commerce (KVK) 
              website to verify availability.
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed">
            The name you choose will appear on all official documents, contracts, and marketing materials, 
            so ensure it reflects your brand identity and business activities appropriately.
          </p>
        </div>
      ),
      isCompleted: true
    },
    {
      title: 'Prepare Required Documents',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Legal Documents" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Legal Documents</h3>
              <p className="text-gray-200 text-sm">Required paperwork for BV registration</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            For a Dutch BV, you'll need to prepare several documents:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Essential Documents</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#EA3A70] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-white">Articles of Association</h4>
                  <p className="text-gray-300 text-sm">Drafted by a notary</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#EA3A70] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-white">Proof of Identity</h4>
                  <p className="text-gray-300 text-sm">For all directors and shareholders</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#EA3A70] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-white">Proof of Address</h4>
                  <p className="text-gray-300 text-sm">For the company's registered office</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#EA3A70] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-white">Company Activities Information</h4>
                  <p className="text-gray-300 text-sm">Details about what your company will do</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#EA3A70] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">5</div>
                <div>
                  <h4 className="font-semibold text-white">Share Capital Details</h4>
                  <p className="text-gray-300 text-sm">Information about share capital and distribution</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-300 mb-2">Important for Foreign Directors</h4>
            <p className="text-orange-200 text-sm">
              For foreign directors and shareholders, documents may need to be apostilled or legalized. 
              All non-Dutch documents typically require certified translations.
            </p>
          </div>
        </div>
      ),
      isActive: true
    },
    {
      title: 'Appoint Directors and Shareholders',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Board Meeting" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Board Meeting</h3>
              <p className="text-gray-200 text-sm">Corporate governance structure</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            The governance structure of your BV must be clearly defined with properly appointed directors and shareholders:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Governance Structure</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Board of Directors</h4>
                  <p className="text-gray-300 text-sm">Appoint at least one director (bestuurder) who will be legally responsible for company management</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Shareholder Requirements</h4>
                  <p className="text-gray-300 text-sm">Identify all shareholders and their respective ownership percentages</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">UBO Documentation</h4>
                  <p className="text-gray-300 text-sm">Disclose Ultimate Beneficial Owners (those holding 25%+ of shares or voting rights)</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Corporate Governance Structure</h4>
                  <p className="text-gray-300 text-sm">Determine if you need a one-tier or two-tier board structure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-300 mb-2">Legal Entity Directors</h4>
            <p className="text-yellow-200 text-sm">
              If directors or shareholders are legal entities rather than individuals, additional documentation 
              showing their good standing will be required.
            </p>
          </div>

          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Director Responsibilities</h3>
            <p className="text-gray-300 mb-4">
              Our goal is to unburden you as entrepreneur, but we must emphasize that directors have specific 
              legal responsibilities under Dutch law, including:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Proper administration</li>
              <li>• Timely filing of annual accounts</li>
              <li>• Duty of care obligations</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Establish Share Capital',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Financial Planning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Financial Planning</h3>
              <p className="text-gray-200 text-sm">Share capital structure decisions</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            Setting up your BV's share capital structure requires several key decisions:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Capital Structure Decisions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Minimum Capital Requirement</h4>
                  <p className="text-gray-300 text-sm">The statutory minimum is €0.01, but practical business needs typically require more</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Types of Shares</h4>
                  <p className="text-gray-300 text-sm">Determine whether to issue ordinary shares only or include preferred or non-voting shares</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Nominal Value</h4>
                  <p className="text-gray-300 text-sm">Decide on the par value of each share (commonly €1, €10, or €100)</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Payment Method</h4>
                  <p className="text-gray-300 text-sm">Capital can be contributed in cash or in-kind (assets, intellectual property, etc.)</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Capital Deposit Proof</h4>
                  <p className="text-gray-300 text-sm">Provide bank statements confirming the deposit of monetary share capital</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-300 mb-2">In-Kind Contributions</h4>
            <p className="text-orange-200 text-sm">
              For in-kind contributions exceeding €6,000, an auditor's report is usually required to verify the value.
            </p>
          </div>

          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Shareholders' Agreement</h3>
            <p className="text-gray-300 mb-4">
              If multiple shareholders are involved, we strongly recommend a detailed shareholders' agreement 
              to address decision-making, profit distribution, and potential exit scenarios.
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">Pro Tip</h4>
              <p className="text-blue-200 text-sm">
                Even if the minimum capital is low, establishing adequate capitalization helps demonstrate 
                business credibility to potential partners, clients, and financial institutions.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Execute Deed of Incorporation',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Notarial Office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Notarial Office</h3>
              <p className="text-gray-200 text-sm">Deed of incorporation execution</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            The formal establishment of your BV occurs through the execution of the deed of incorporation (oprichtingsakte):
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Notarial Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Notarial Requirement</h4>
                  <p className="text-gray-300 text-sm">The deed must be executed before a Dutch civil law notary</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Official Language</h4>
                  <p className="text-gray-300 text-sm">The deed is typically in Dutch, though English versions can be prepared simultaneously</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Physical Presence</h4>
                  <p className="text-gray-300 text-sm">Directors and shareholders usually must appear in person before the notary</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Power of Attorney Option</h4>
                  <p className="text-gray-300 text-sm">If unable to attend in person, you can grant power of attorney to a representative</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Notarial Verification</h4>
                  <p className="text-gray-300 text-sm">The notary verifies identities, checks for bankruptcy records, and confirms compliance with legal requirements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Articles of Association</h3>
            <p className="text-gray-300 mb-4">
              The deed of incorporation includes the Articles of Association (statuten) which govern your company's operations, 
              management structure, and shareholder rights. Once executed, the notary will provide official copies 
              and register the company with the Commercial Register.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Remote Option</h4>
            <p className="text-blue-200 text-sm">
              If you prefer not to visit Amsterdam, we can arrange for a representative to act on your behalf 
              through a properly executed power of attorney.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Register with Chamber of Commerce',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="KVK Registration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">KVK Registration</h3>
              <p className="text-gray-200 text-sm">Dutch Chamber of Commerce</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            Within 8 days after executing the deed of incorporation, your BV must be registered with the Dutch Chamber of Commerce (Kamer van Koophandel or KVK):
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">KVK Registration Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Registration Fee</h4>
                  <p className="text-gray-300 text-sm">Current fee is approximately €50 (subject to change)</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Commercial Register</h4>
                  <p className="text-gray-300 text-sm">Your company will receive a KVK number and be entered in the Commercial Register</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Company Dossier</h4>
                  <p className="text-gray-300 text-sm">Public information about your company becomes accessible through the KVK</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">VAT Registration</h4>
                  <p className="text-gray-300 text-sm">Simultaneously apply for a VAT number (BTW-nummer) with the tax authorities</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">RSIN Number</h4>
                  <p className="text-gray-300 text-sm">Receive a legal entity identification number for tax administration purposes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-300 mb-2">Additional Requirements</h4>
            <p className="text-yellow-200 text-sm">
              Depending on your type of activity, there might be filing requirements at other regulatory bodies as well. 
              For certain regulated activities (financial services, healthcare, food production), additional licenses 
              or permits may be required before commencing operations.
            </p>
          </div>

          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Financial Statements Obligation</h3>
            <p className="text-gray-300">
              Please note that virtually every Dutch corporate entity has the obligation to prepare financial statements. 
              This obligation follows from the law and is usually incorporated in the statutes of the entity.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Open a Dutch Bank Account',
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Dutch Banking" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">Dutch Banking</h3>
              <p className="text-gray-200 text-sm">Business account setup</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            Having a Dutch business bank account is essential for your BV's financial operations:
          </p>
          
          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">Banking Options</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Bank Selection</h4>
                  <p className="text-gray-300 text-sm">Major Dutch banks include ING, ABN AMRO, and Rabobank</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Documentation Requirements</h4>
                  <p className="text-gray-300 text-sm">Provide excerpt from the Commercial Register, Articles of Association, UBO information, and identification of all directors/authorized signatories</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Anti-Money Laundering Checks</h4>
                  <p className="text-gray-300 text-sm">Banks conduct thorough due diligence procedures</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">In-Person Verification</h4>
                  <p className="text-gray-300 text-sm">Most traditional banks require at least one in-person meeting</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Digital Alternatives</h4>
                  <p className="text-gray-300 text-sm">Some modern fintech options offer remote account opening procedures</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Remote Banking Solution</h4>
            <p className="text-blue-200 text-sm">
              What if I can't travel to Netherlands to open the bank account? If you prefer not to visit Amsterdam, 
              then we can try a non-resident bank or digital banking solution. Alternatively, we can arrange for 
              a trusted representative to assist with the process.
            </p>
          </div>

          <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
            <h3 className="text-xl font-bold text-white mb-4">VAT Invoicing</h3>
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2">Pro Tip</h4>
              <p className="text-green-200 text-sm">
                Even if your VAT number has not been activated yet, you can issue invoices and even charge VAT on your invoice. 
                Once your VAT number is activated, you can transfer the VAT to the tax authorities.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const relatedTutorials = [{
    title: 'Dutch VAT Registration and Compliance',
    category: 'Tax',
    duration: '8 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: '/tutorials/dutch-vat-registration'
  }, {
    title: 'Opening a Dutch Business Bank Account',
    category: 'Finance',
    duration: '6 min read',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: '/tutorials/dutch-business-bank-account'
  }, {
    title: 'Dutch Corporate Tax Basics',
    category: 'Tax',
    duration: '9 min read',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd25?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    href: '/tutorials/dutch-corporate-tax-basics'
  }];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#0F0B1F]">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Setting Up a Dutch BV Company: Complete Step-by-Step Guide
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl">
                A comprehensive guide to establishing your Besloten Vennootschap (BV) in the Netherlands, 
                covering everything from entity selection to post-establishment compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Tutorial Content */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Steps Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#1B1537] rounded-xl border border-[#2D2755] p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Steps</h3>
                  <div className="space-y-2">
                    {tutorialSteps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStep(index + 1)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeStep === index + 1
                            ? 'bg-[#EA3A70] text-white'
                            : 'text-gray-300 hover:bg-[#2D2755] hover:text-white'
                        }`}
                      >
                        <span className="font-medium">{step.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="lg:col-span-3">
                <div className="bg-[#1B1537] rounded-xl border border-[#2D2755] p-8">
                  <div className="flex items-center mb-8">
                    <div className="bg-[#EA3A70] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4">
                      {activeStep}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {tutorialSteps[activeStep - 1]?.title}
                      </h2>
                      <p className="text-gray-400">Step {activeStep} of {tutorialSteps.length}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    {tutorialSteps[activeStep - 1]?.content}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-[#2D2755]">
                    <button
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeStep === 1
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-[#EA3A70] hover:bg-[#2D2755]'
                      }`}
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Previous
                    </button>
                    
                    <button
                      onClick={() => setActiveStep(Math.min(tutorialSteps.length, activeStep + 1))}
                      disabled={activeStep === tutorialSteps.length}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeStep === tutorialSteps.length
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-[#EA3A70] hover:bg-[#2D2755]'
                      }`}
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#1B1537] to-[#2A1F4F]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Next Steps After Establishment</h2>
              <p className="text-gray-300">
                After completing these steps, your BV will be fully operational, but you must stay compliant with ongoing obligations:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "File VAT returns (typically quarterly)",
                "Process payroll administration if you have employees",
                "Maintain proper bookkeeping records",
                "File corporate tax returns annually",
                "Prepare and file annual accounts with the Chamber of Commerce",
                "Hold annual shareholders' meetings"
              ].map((step, index) => (
                <div key={index} className="flex items-start bg-[#0F0B1F]/50 rounded-lg p-4 border border-[#2D2755]">
                  <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[#1B1537] rounded-xl border border-[#2D2755] p-8">
              <h3 className="text-xl font-bold text-white mb-4">Professional Support</h3>
              <p className="text-gray-300 mb-6">
                INCO Business Group's professional bookkeeping experts will ensure that all your records are comprehensive and accurate. 
                We know how to properly prepare your financial statements and with our experience opening and running businesses 
                in different jurisdictions, we'll be sure to stay on top of correctly submitting all your Tax and VAT returns.
              </p>
            </div>
          </div>
        </section>
      </div>
      <RelatedTutorials tutorials={relatedTutorials} />
      <CtaSection />
    </MainLayout>
  );
}