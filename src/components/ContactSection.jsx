import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Building, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    topic: 'fraud_report',
    message: ''
  });

  const faqs = [
    {
      q: "How does SHA-256 hashing prevent certificate forgery?",
      a: "Every academic certificate's student credentials (name, roll no, degree, grade, date) are digested into a 256-bit cryptographic fingerprint. Changing even a single letter in the student's name completely scrambles the resulting hash (the avalanche effect). Because the authentic hash is immutably sealed on the blockchain ledger, any altered certificate immediately fails verification."
    },
    {
      q: "Can a university modify or revoke a certificate once it is on-chain?",
      a: "The blockchain block itself is immutable and cannot be rewritten. However, the CertLedger smart contract supports cryptographic revocation registries: if a degree was issued in error, the authorized university registrar issues a signed revocation transaction that marks the certificate ID as revoked while preserving the tamper-evident audit history."
    },
    {
      q: "Do employers or students need cryptocurrency or MetaMask to verify credentials?",
      a: "No! The CertLedger system is designed for frictionless real-world adoption. Employers, embassies, and universities can verify credentials directly through our web portal by scanning the certificate QR code or pasting the certificate hash without any gas fees, wallets, or crypto knowledge."
    },
    {
      q: "How can another university join the CertLedger Consortium as a validator node?",
      a: "Accredited educational institutions can submit a node onboarding request using this contact portal. Once the consortium governance committee verifies institutional credentials, the university is provisioned a dedicated PoA validator node and private keypair to issue and validate credentials."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="section-container contact-section">
      <div className="section-header-banner">
        <div className="banner-left">
          <div className="banner-icon-box">
            <Mail size={24} />
          </div>
          <div>
            <h2 className="banner-title">Consortium Support & Knowledge Base</h2>
            <p className="banner-subtitle">
              Get in touch with the CertLedger Consortium Secretariat, report fraudulent degrees, or request validator node onboarding.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-grid">
        <div className="panel-box contact-form-card">
          <h3 className="panel-title mb-4">Send an Official Inquiry</h3>

          {formSubmitted ? (
            <div className="contact-success-state">
              <div className="success-icon-box">
                <CheckCircle size={36} className="text-emerald" />
              </div>
              <h4>Message Successfully Dispatched</h4>
              <p>
                Thank you for contacting the CertLedger Consortium Secretariat. A ticket has been logged with cryptographic timestamp. 
                Our compliance team will respond within 24 business hours.
              </p>
              <button 
                type="button" 
                className="secondary-btn mt-4"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', institution: '', topic: 'fraud_report', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="standard-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Dr. Jennifer Hayes"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institution / Organization</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Integral University or Ministry of Education"
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Purpose</label>
                <select 
                  className="form-input"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                >
                  <option value="fraud_report">Report Suspicious or Tampered Credential</option>
                  <option value="node_onboarding">Request University Validator Node Onboarding</option>
                  <option value="api_integration">HR / Background Check API Integration</option>
                  <option value="technical_support">Technical Ledger Inquiries</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea 
                  className="form-input form-textarea" 
                  rows={4}
                  placeholder="Provide certificate IDs, verification details, or institutional documentation..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="primary-btn w-full submit-contact-btn">
                <Send size={15} />
                <span>Submit Official Inquiry</span>
              </button>
            </form>
          )}
        </div>

        <div className="contact-info-col">
          <div className="panel-box faq-panel">
            <h3 className="panel-title mb-3">Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? 'expanded' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-box office-card">
            <h4 className="office-title">Consortium Secretariat</h4>
            <div className="office-item">
              <Building size={16} className="text-cyan" />
              <span>Integral University Campus, Kursi Road, Lucknow, UP, India</span>
            </div>
            <div className="office-item">
              <Mail size={16} className="text-cyan" />
              <span>secretariat@certledger.edu.in</span>
            </div>
            <div className="office-item">
              <Clock size={16} className="text-cyan" />
              <span>Support SLA: Mon - Fri (09:00 - 18:00 IST)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
