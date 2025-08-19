import React, { memo, useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ServiceTemplate } from './pages/ServiceTemplate'
import { EBranch } from './pages/EBranch'
import { Tools } from './pages/Tools'
import { Pricing } from './pages/Pricing'
import { TutorialDetail } from './pages/TutorialDetail'
import { BranchRegistrationTutorial } from './pages/tutorials/BranchRegistrationTutorial'
import { CompanyFormationPage } from './pages/services/CompanyFormationPage'
import { MailboxPage } from './pages/services/MailboxPage'
import { AccountingPage } from './pages/services/AccountingPage'
import { TaxFilingPage } from './pages/services/TaxFilingPage'
import { CorporateSecretaryPage } from './pages/services/CorporateSecretaryPage'
import { LegalPage } from './pages/services/LegalPage'
import { MarketingServicesPage } from './pages/services/MarketingServicesPage'
import { CompanyEssentialsPage } from './pages/services/CompanyEssentialsPage'
import { BranchRegistrationRequirements } from './pages/BranchRegistrationRequirements'
import { BlogDetail } from './pages/blog/BlogDetail'
import { BlogPage } from './pages/blog/BlogPage'
import { Services } from './pages/Services'
import { EUServicesPage } from './components/EUServicesPage'
import { PaymentPage } from './components/PaymentPage'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { PaymentCancelled } from './pages/PaymentCancelled'
import { PaymentTest } from './pages/PaymentTest'
import { ChatbotWidget } from './components/ChatbotWidget'
import { AboutUs } from './pages/AboutUs'
import {SurveyForm} from './components/SurveyForm'
import { NetherlandsProductPage } from './components/expansion/NetherlandsProductPage'

import './styles/globals.css'


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/company-formation" element={<CompanyFormationPage />} />
        <Route path="/services/mailbox" element={<MailboxPage />} />
        <Route path="/services/accounting" element={<AccountingPage />} />
        <Route path="/services/tax-filing" element={<TaxFilingPage />} />
        <Route path="/services/corporate-secretary" element={<CorporateSecretaryPage />} />
        <Route path="/services/payment" element={<PaymentPage />} />
        <Route path="/services/legal" element={<LegalPage />} />
        <Route path="/services/marketing" element={<MarketingServicesPage />} />
        <Route path="/services/company-essentials" element={<CompanyEssentialsPage />} />
        <Route path="/market-entry" element={<EUServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceTemplate />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ebranch" element={<EBranch />} />
        <Route path ="/survey" element={<SurveyForm onClose={() => window.history.back()} />} />
        <Route path="/ebranch/branch-registration-requirements" element={<BranchRegistrationRequirements />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/tutorials/:tutorialId" element={<TutorialDetail />} />
        <Route path="/tutorials/branch-registration" element={<BranchRegistrationTutorial />} />
        <Route path="/tutorials/branch-registration/:country" element={<BranchRegistrationTutorial />} />
        <Route path="/tutorials/:country-vat-requirements" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-corporate-tax-filing" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-business-bank-account" element={<TutorialDetail />} />
        <Route path="/tutorials/hiring-employees-:country" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-employment-contracts" element={<TutorialDetail />} />
        <Route path="/tutorials/choosing-:country-business-entity" element={<TutorialDetail />} />
        <Route path="/tutorials/setting-up-:country-company" element={<TutorialDetail />} />
        <Route path="/tutorials/required-documents-:country" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-compliance-calendar" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-ubo-registration" element={<TutorialDetail />} />
        <Route path="/tutorials/:country-business-financing" element={<TutorialDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/netherlands-business-setup" element={<NetherlandsProductPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/payment-test" element={<PaymentTest />} />
      </Routes>
      <ChatbotWidget />
    </Router>
  )
}
