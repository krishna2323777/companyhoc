import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import './PricingPlans.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// Update the Google Sheets URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycby_V7bNjsnc5NLC0dLFbP6KCa7fdGCqpdH359zYtNf5OQchq2qsLGu65ic47auN1pTMCg/exec';

export function PricingPlans() {
  // Add all necessary state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [cart, setCart] = useState([]);
  const [hasEBranchPlan, setHasEBranchPlan] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({
    payroll: false,
    employer: false,
    vat: false
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Add addons data
  const addons = [
    {
      id: 'payroll',
      name: 'Payroll Management',
      description: 'Per employee, includes full payroll administration',
      price: 25,
      period: 'month'
    },
    {
      id: 'employer',
      name: 'Employer of Record',
      description: 'Per employee, full employment compliance',
      price: 175,
      period: 'month'
    },
    {
      id: 'vat',
      name: 'VAT Administration',
      description: 'Monthly VAT returns and administration',
      price: 45,
      period: 'month'
    }
  ];

  // Update the submitToGoogleSheets function
  const submitToGoogleSheets = async () => {
    if (!formData || !formData.email) {
      alert('Please ensure all required information is provided.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const data = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        company: formData.company,
        selectedServices: cart.map(item => `${item.name} (€${item.price}/${item.period})`).join(', '),
        totalAmount: (calculateTotal() + calculateVAT()).toFixed(2),
        ccEmails: ['dennis@houseofcompanies.io', 'support@houseofcompanies.io']
      };

      console.log('Submitting data:', data);

      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'no-cors'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        setShowSuccessPopup(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error('Detailed error:', error);
      alert(`There was an error processing your request: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add helper functions
  const toggleAddon = (addonId) => {
    if (!hasEBranchPlan) {
      alert("You need to select eBranch Plan first before adding any add-ons.");
      return;
    }
    
    setSelectedAddons(prev => {
      const newState = { ...prev, [addonId]: !prev[addonId] };
      const eBranchPlan = { name: 'eBranch Plan', price: 1995, period: 'year' };
      const selectedAddonsArray = addons.filter(addon => newState[addon.id]);
      setCart([eBranchPlan, ...selectedAddonsArray]);
      return newState;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateVAT = () => {
    return calculateTotal() * 0.21;
  };

  const removeFromCart = (indexToRemove) => {
    setCart(prevCart => {
      const itemToRemove = prevCart[indexToRemove];
      
      if (itemToRemove.name === 'eBranch Plan') {
        setHasEBranchPlan(false);
        setSelectedAddons({
          payroll: false,
          employer: false,
          vat: false
        });
        return [];
      } else {
        const addonId = addons.find(addon => addon.name === itemToRemove.name)?.id;
        if (addonId) {
          setSelectedAddons(prev => ({
            ...prev,
            [addonId]: false
          }));
        }
        return prevCart.filter((_, index) => index !== indexToRemove);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('lead_quotedetails')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      setShowServices(true);
    } catch (error) {
      console.error('Registration error:', error);
      setShowServices(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const addonVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0F0B1F]">
      {!showServices ? (
        <motion.div 
          className="login-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Welcome to House of Companies</h2>
            <div className="form-description">
              <p>Your all-in-one business portal for global expansion</p>
              <p className="benefits-text">
                House of Companies streamlines international business operations with our comprehensive
                services including company formation, banking solutions, accounting services, and
                AI-powered corporate management tools. Join thousands of entrepreneurs expanding their
                global footprint with our unified platform.
              </p>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Continue to Services'}
            </button>
            
            <p className="form-footer">
              By continuing, you'll gain access to our full suite of business services and special offers.
            </p>
          </form>
        </motion.div>
      ) : (
        <div className="services-content">
          <motion.div 
            className="app-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="inside">
              <div className="portal-header">
                <div className="header-content">
                  <div className="header-text">
                    <h1>World's first all-in-one Business Portal</h1>
                    <p>Transform your global operations with our comprehensive Workspace</p>
                  </div>
                </div>
              </div>

              <div className="main-content">
                <div className="services-container">
                  <motion.div 
                    className="pricing-plans"
                    variants={containerVariants}
                  >
                    {/* Free Plan */}
                    <motion.div 
                      className="pricing-card"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="plan-header">
                        <div className="plan-tag current">Current Plan</div>
                        <h2>Free Plan - €0/month</h2>
                        <p className="plan-subtitle">Exploration</p>
                      </div>
                      <div className="plan-features">
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Virtual office address in the EU</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Dedicated phone number</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>25 credits for additional services</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Market Entry Roadmap/Strategy</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Access to basic AI-powered tools</span>
                        </div>
                      </div>
                      <button 
                        className="plan-button signup"
                        onClick={() => window.open('https://clientdashboard-hoc.vercel.app/', '_blank')}
                      >
                        Sign Up
                      </button>
                    </motion.div>

                    {/* eBranch Plan */}
                    <motion.div 
                      className="pricing-card"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="plan-header">
                        <div className="plan-tag popular">Most Popular</div>
                        <h2>eBranch - € 1,995 /year</h2>
                      </div>
                      <div className="plan-features featured">
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>All Free plan features</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Core Bookkeeping Portal</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Branch Office Registration</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>VAT and EORI Number Application</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Employer Registration</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Quarterly VAT Analysis</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Annual Corporate Analysis</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>AI-powered Corporate Agent</span>
                        </div>
                      </div>
                      <button 
                        className="plan-button launch"
                        onClick={() => {
                          setHasEBranchPlan(!hasEBranchPlan);
                          if (!hasEBranchPlan) {
                            // When adding eBranch, just add it alone without addons
                            setCart([{ name: 'eBranch Plan', price: 1995, period: 'year' }]);
                          } else {
                            // When removing eBranch, clear cart and reset addons
                            setCart([]);
                            setSelectedAddons({
                              payroll: false,
                              employer: false,
                              vat: false
                            });
                          }
                        }}
                      >
                        {hasEBranchPlan ? 'Remove eBranch Plan' : 'Launch Your eBranch'}
                      </button>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div 
                      className="pricing-card"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="plan-header">
                        <h2>Enterprise</h2>
                        <p className="plan-subtitle">Custom Solutions</p>
                      </div>
                      <div className="plan-features">
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>All eBranch features</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Customizable AI solutions</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Dedicated account manager</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Priority support</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-icon">✓</span>
                          <span>Flexible add-ons</span>
                        </div>
                      </div>
                      <button className="plan-button contact">Contact Sales</button>
                    </motion.div>
                  </motion.div>

                  {/* Add-ons Section - Only show when eBranch is selected */}
                  {hasEBranchPlan && (
                    <motion.div 
                      className="addons-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2>Available Add-ons</h2>
                      <div className="addons-container">
                        {addons.map((addon, index) => (
                          <motion.div 
                            key={addon.id} 
                            className="addon-card"
                            variants={addonVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="addon-content">
                              <h3>{addon.name}</h3>
                              <p>{addon.description}</p>
                              <div className="addon-price">€{addon.price} /{addon.period}</div>
                            </div>
                            <button
                              className={`addon-toggle ${selectedAddons[addon.id] ? 'selected' : ''}`}
                              onClick={() => toggleAddon(addon.id)}
                            >
                              {selectedAddons[addon.id] ? 'Remove' : 'Add'}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Simple Cart Section */}
                  {cart.length > 0 && (
                    <motion.div 
                      className="cart-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="cart-header">
                        <h3>Your Selection</h3>
                        <button 
                          className="cart-button secondary"
                          onClick={() => {
                            setCart([]);
                            setHasEBranchPlan(false);
                            setSelectedAddons({
                              payroll: false,
                              employer: false,
                              vat: false
                            });
                          }}
                        >
                          Clear Cart
                        </button>
                      </div>
                      <div className="cart-items">
                        {cart.map((item, index) => (
                          <div className="cart-item" key={index}>
                            <div className="cart-item-info">
                              <span className="cart-item-name">{item.name}</span>
                              <span className="cart-item-period">
                                €{item.price} /{item.period}
                              </span>
                            </div>
                            <button 
                              className="cart-item-remove"
                              onClick={() => removeFromCart(index)}
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-summary">
                        <div className="cart-total">
                          <span>Total (incl. VAT)</span>
                          <span className="amount">
                            €{(calculateTotal() + calculateVAT()).toFixed(2)}
                          </span>
                        </div>
                        <button 
                          className="cart-button quote-btn"
                          onClick={() => submitToGoogleSheets()}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending...' : 'Get Quote'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div 
          className="success-popup"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="popup-content">
            <div className="popup-icon">✓</div>
            <h3>Thank you!</h3>
            <p>Your quote details have been sent to your email.</p>
            <button onClick={() => {
              setShowSuccessPopup(false);
              window.location.reload();
            }}>
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}