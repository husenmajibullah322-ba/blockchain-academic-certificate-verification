import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Award, 
  ShieldCheck, 
  Lock, 
  CheckCircle,
  Smartphone,
  Share2,
  ArrowLeft,
  Home
} from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('parchment');

  if (!certificate) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.certificateHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Academic Certificate - ${certificate.studentName}`,
        text: `Verified Academic Certificate #${certificate.id} for ${certificate.studentName}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyHash();
    }
  };

  return (
    <div className="modal-overlay certificate-modal-overlay" onClick={onClose}>
      <div className="modal-container certificate-modal-container" onClick={e => e.stopPropagation()}>
        
        {/* Modal Toolbar */}
        <div className="certificate-modal-toolbar no-print">
          <div className="toolbar-left">
            <ShieldCheck size={20} className="text-emerald" />
            <span className="toolbar-title">Verified Credential #{certificate.id}</span>
          </div>

          {/* View Format Selector */}
          <div className="toolbar-center-toggle">
            <button 
              type="button"
              className={`format-toggle-btn ${viewMode === 'parchment' ? 'active' : ''}`}
              onClick={() => setViewMode('parchment')}
              title="Official Printed Parchment Format"
            >
              <Award size={14} />
              <span>Official Parchment</span>
            </button>
            <button 
              type="button"
              className={`format-toggle-btn ${viewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile Credential Pass Format"
            >
              <Smartphone size={14} />
              <span>Mobile Credential</span>
            </button>
          </div>

          <div className="toolbar-right">
            <button 
              type="button"
              className="toolbar-btn" 
              onClick={handleCopyHash} 
              title="Copy SHA-256 Hash"
            >
              {copied ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy Hash'}</span>
            </button>
            <button 
              type="button"
              className="toolbar-btn print-action-btn" 
              onClick={handlePrint} 
              title="Print Certificate / Save PDF"
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
            <button 
              type="button"
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close certificate modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: Official Parchment Diploma Paper */}
        {viewMode === 'parchment' ? (
          <div className="diploma-paper" id="printable-certificate">
            <div className="diploma-inner-border">
              <div className="corner-ornament top-left"></div>
              <div className="corner-ornament top-right"></div>
              <div className="corner-ornament bottom-left"></div>
              <div className="corner-ornament bottom-right"></div>

              <div className="diploma-header">
                <div className="diploma-crest diploma-iu-crest">
                  <img 
                    src="/integral_university_logo.jpg" 
                    alt="Emblem" 
                    className="diploma-logo-img" 
                  />
                </div>
                <h1 className="diploma-university">{certificate.institution || 'Integral University, Lucknow'}</h1>
                <div className="diploma-tagline">ACCREDITED ACADEMIC INSTITUTION • PCS26140 BLOCKCHAIN CONSORTIUM</div>
                <div className="diploma-rule"></div>
              </div>

              <div className="diploma-title-block">
                <h2 className="diploma-title">{certificate.certificateType || 'OFFICIAL DEGREE CERTIFICATE'}</h2>
                <p className="diploma-subtitle">BY THE AUTHORITY OF THE ACADEMIC SENATE & GOVERNING COUNCIL</p>
              </div>

              <div className="diploma-body">
                <p className="certify-text">This is to solemnly certify that</p>
                <h3 className="recipient-name">{certificate.studentName}</h3>
                <p className="recipient-roll">Enrollment / Roll Number: <strong className="mono-font">{certificate.studentId}</strong></p>

                <p className="completion-statement">
                  having satisfied all prescribed examinations, coursework, and statutory requirements of the University, 
                  has been duly admitted to the degree of
                </p>

                <h4 className="degree-awarded">{certificate.course}</h4>
                <p className="department-awarded">Major in {certificate.department}</p>

                <div className="grade-badge-block">
                  <span>Conferred with CGPA / Standing: <strong>{certificate.cgpa}</strong></span>
                  {certificate.honors && <span> • <em>{certificate.honors}</em></span>}
                </div>
              </div>

              <div className="diploma-footer-row">
                <div className="footer-col text-left">
                  <div className="footer-line"></div>
                  <div className="footer-meta-title">Date of Conferral</div>
                  <div className="footer-meta-val">{certificate.issueDate}</div>
                </div>

                <div className="footer-col text-center seal-col">
                  <div className="gold-seal-badge">
                    <div className="seal-star">★</div>
                    <div className="seal-text-circle">BLOCKCHAIN VERIFIED</div>
                    <CheckCircle size={22} className="seal-icon" />
                    <div className="seal-ribbon"></div>
                  </div>
                </div>

                <div className="footer-col text-right">
                  <div className="signature-font">{certificate.signatureName || (certificate.signatoryAuthority ? certificate.signatoryAuthority.split(',')[0] : 'Prof. Dr. Haris M. Khan')}</div>
                  <div className="footer-line"></div>
                  <div className="footer-meta-title">{certificate.signatoryAuthority || 'Registrar & Validator'}</div>
                  <div className="footer-meta-val">Consortium Validator Node</div>
                </div>
              </div>

              {/* Cryptographic Bottom Strip */}
              <div className="blockchain-cryptographic-strip">
                <div className="strip-qr-box">
                  <svg viewBox="0 0 100 100" width="68" height="68" className="qr-svg">
                    <rect width="100" height="100" fill="#ffffff" />
                    <rect x="5" y="5" width="28" height="28" fill="#0f172a" />
                    <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                    <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
                    <rect x="67" y="5" width="28" height="28" fill="#0f172a" />
                    <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                    <rect x="75" y="13" width="12" height="12" fill="#0f172a" />
                    <rect x="5" y="67" width="28" height="28" fill="#0f172a" />
                    <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                    <rect x="13" y="75" width="12" height="12" fill="#0f172a" />
                    <rect x="40" y="10" width="6" height="6" fill="#0f172a" />
                    <rect x="50" y="10" width="6" height="6" fill="#0f172a" />
                    <rect x="40" y="24" width="6" height="6" fill="#0f172a" />
                    <rect x="52" y="24" width="6" height="6" fill="#0f172a" />
                    <rect x="10" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="25" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="40" y="42" width="8" height="8" fill="#0f172a" />
                    <rect x="54" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="70" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="85" y="42" width="6" height="6" fill="#0f172a" />
                    <rect x="40" y="65" width="6" height="6" fill="#0f172a" />
                    <rect x="55" y="65" width="8" height="8" fill="#0f172a" />
                    <rect x="40" y="80" width="6" height="6" fill="#0f172a" />
                    <rect x="70" y="75" width="8" height="8" fill="#0f172a" />
                    <rect x="84" y="84" width="6" height="6" fill="#0f172a" />
                  </svg>
                </div>

                <div className="strip-info-box">
                  <div className="strip-title-row">
                    <Lock size={12} className="text-emerald" />
                    <span>IMMUTABLE PCS26140 BLOCKCHAIN PROOF OF CONFERRAL</span>
                  </div>
                  <div className="strip-hash-row">
                    <span className="strip-label">SHA-256 Hash:</span>
                    <span className="strip-hash-code mono-font">{certificate.certificateHash}</span>
                  </div>
                  <div className="strip-meta-row">
                    <span>Block Height: <strong>#{certificate.blockHeight || 148201}</strong></span>
                    <span>TxHash: <strong>{certificate.transactionHash ? certificate.transactionHash.substring(0, 16) + '...' : '0x789bce91...'}</strong></span>
                    <span>Standard: <strong>PCS-PoA-ERC721</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: Modern Mobile Digital Credential Format */
          <div className="mobile-modal-view-wrapper" id="printable-certificate">
            <div className="standalone-phone-card">
              {/* Phone Header Bar */}
              <div className="phone-top-bar">
                <button type="button" className="phone-nav-btn" onClick={onClose}>
                  <ArrowLeft size={18} strokeWidth={2.4} color="#3b82f6" />
                </button>
                <span className="phone-nav-title">Digital Credential</span>
                <button type="button" className="phone-nav-btn" onClick={handleShare}>
                  <Share2 size={17} strokeWidth={2.4} color="#3b82f6" />
                </button>
              </div>

              {/* Institution Header */}
              <div className="phone-university-header">
                <div className="ju-crest-logo">
                  <img 
                    src="/integral_university_logo.jpg" 
                    alt="Emblem" 
                    className="crest-img" 
                  />
                </div>
                <div className="ju-university-names">
                  <div className="ju-main-name">{certificate.institution || 'Integral University'}</div>
                  <div className="ju-dept-name">{certificate.department || 'Office of Academic Affairs'}</div>
                </div>
              </div>

              {/* Title Block */}
              <div className="phone-cert-title-block">
                <h3 className="phone-cert-word">CERTIFICATE</h3>
                <div className="phone-cert-signature-name">
                  {certificate.signatureName || (certificate.studentName ? `${certificate.studentName.split(' ')[0]} ${certificate.studentName.split(' ')[1] ? certificate.studentName.split(' ')[1][0] + '.' : ''}` : 'Verified')}
                </div>
              </div>

              {/* Certificate Detailed Body */}
              <div className="standalone-cert-details">
                <div className="standalone-conferral-text">
                  This is to certify that
                </div>
                <div className="standalone-student-name">
                  {certificate.studentName}
                </div>
                <div className="standalone-course-name">
                  {certificate.course}
                </div>
                
                <div className="standalone-meta-grid">
                  <div className="sm-meta-item">
                    <span className="sm-label">Certificate ID:</span>
                    <span className="sm-val mono-font text-teal">{certificate.id}</span>
                  </div>
                  <div className="sm-meta-item">
                    <span className="sm-label">Student Roll:</span>
                    <span className="sm-val mono-font">{certificate.studentId}</span>
                  </div>
                  <div className="sm-meta-item">
                    <span className="sm-label">Conferral Date:</span>
                    <span className="sm-val">{certificate.issueDate}</span>
                  </div>
                  <div className="sm-meta-item">
                    <span className="sm-label">CGPA / Honors:</span>
                    <span className="sm-val font-semibold">{certificate.cgpa}</span>
                  </div>
                </div>

                {/* Cryptographic Proof Card inside mobile frame */}
                <div className="standalone-crypto-card">
                  <div className="crypto-badge-header">
                    <ShieldCheck size={15} color="#059669" />
                    <span>Cryptographic Blockchain Seal</span>
                  </div>
                  <div className="crypto-hash-text mono-font">
                    {certificate.certificateHash}
                  </div>
                  <div className="crypto-meta-flex">
                    <span>Block: <strong>#{certificate.blockHeight || 148200}</strong></span>
                    <span>Status: <strong className="text-emerald">VERIFIED ON-CHAIN</strong></span>
                  </div>
                </div>

                {/* Floating QR Code in Mobile View */}
                <div className="standalone-qr-center">
                  <svg viewBox="0 0 100 100" width="80" height="80" className="qr-svg-mockup">
                    <rect width="100" height="100" fill="#ffffff" rx="8" />
                    <rect x="10" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="14" y="14" width="18" height="18" rx="2" fill="#ffffff" />
                    <rect x="18" y="18" width="10" height="10" rx="1" fill="#0f172a" />
                    <rect x="64" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="68" y="14" width="18" height="18" rx="2" fill="#ffffff" />
                    <rect x="72" y="18" width="10" height="10" rx="1" fill="#0f172a" />
                    <rect x="10" y="64" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="14" y="68" width="18" height="18" rx="2" fill="#ffffff" />
                    <rect x="18" y="72" width="10" height="10" rx="1" fill="#0f172a" />
                    <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                    <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="22" width="6" height="6" fill="#0f172a" />
                    <rect x="52" y="30" width="6" height="6" fill="#0f172a" />
                    <rect x="12" y="44" width="6" height="6" fill="#0f172a" />
                    <rect x="22" y="44" width="6" height="6" fill="#0f172a" />
                    <rect x="32" y="44" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="44" width="8" height="8" fill="#0f172a" />
                    <rect x="54" y="44" width="6" height="6" fill="#0f172a" />
                    <rect x="66" y="44" width="6" height="6" fill="#0f172a" />
                    <rect x="78" y="44" width="8" height="8" fill="#0f172a" />
                    <rect x="42" y="60" width="6" height="6" fill="#0f172a" />
                    <rect x="54" y="62" width="8" height="8" fill="#0f172a" />
                    <rect x="70" y="60" width="8" height="8" fill="#0f172a" />
                    <rect x="84" y="62" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="76" width="6" height="6" fill="#0f172a" />
                    <rect x="54" y="76" width="6" height="6" fill="#0f172a" />
                    <rect x="72" y="74" width="8" height="8" fill="#0f172a" />
                    <rect x="84" y="82" width="6" height="6" fill="#0f172a" />
                  </svg>
                  <span className="standalone-qr-label">Scan to verify cryptographic ledger proof</span>
                </div>
              </div>

              {/* Bottom Dock Bar */}
              <div className="phone-bottom-dock">
                <button type="button" className="phone-dock-item active" onClick={onClose}>
                  <Home size={16} />
                  <span>Done</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
