import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  Share2, 
  Home, 
  User, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Award, 
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PGDIT_CERTIFICATE } from '../data/mockData';

export default function AuthenticityVerification({ 
  verifiedCertificates = [], 
  pendingCertificates = [], 
  onSelectCertificate, 
  setActiveSection, 
  onSearchQuery 
}) {
  const [certNumber, setCertNumber] = useState('PGDIT12345');
  const [selectedCert, setSelectedCert] = useState(() => {
    return verifiedCertificates.find(c => c.id === 'PGDIT12345') || SAMPLE_PGDIT_CERTIFICATE;
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCertNumber(val);
    setVerificationResult(null);

    // Live update preview if matches
    const term = val.trim().toLowerCase();
    if (term) {
      const match = verifiedCertificates.find(c => 
        c.id.toLowerCase() === term ||
        c.studentId.toLowerCase() === term ||
        c.studentName.toLowerCase().includes(term) ||
        (c.certificateHash && c.certificateHash.toLowerCase() === term)
      );
      if (match) {
        setSelectedCert(match);
      }
    }
  };

  const handleCheckCertificate = (e) => {
    if (e) e.preventDefault();
    if (!certNumber.trim()) return;

    setIsChecking(true);

    setTimeout(() => {
      const term = certNumber.trim().toLowerCase();
      const verifiedFound = verifiedCertificates.find(c => 
        c.id.toLowerCase() === term ||
        c.studentId.toLowerCase() === term ||
        c.studentName.toLowerCase().includes(term) ||
        (c.certificateHash && c.certificateHash.toLowerCase() === term)
      );

      if (verifiedFound) {
        setSelectedCert(verifiedFound);
        setVerificationResult({
          status: 'verified',
          cert: verifiedFound,
          message: 'Certificate officially verified on Blockchain'
        });
      } else {
        const pendingFound = pendingCertificates.find(c => 
          c.id.toLowerCase() === term ||
          c.studentId.toLowerCase() === term ||
          c.studentName.toLowerCase().includes(term)
        );

        if (pendingFound) {
          setSelectedCert(pendingFound);
          setVerificationResult({
            status: 'pending',
            cert: pendingFound,
            message: 'Certificate is currently in consensus approval queue'
          });
        } else {
          setVerificationResult({
            status: 'not-found',
            query: certNumber.trim(),
            message: 'No cryptographic record found for this certificate number'
          });
        }
      }
      setIsChecking(false);
    }, 400);
  };

  const handleQuickSelect = (number) => {
    setCertNumber(number);
    const term = number.toLowerCase();
    const match = verifiedCertificates.find(c => 
      c.id.toLowerCase() === term ||
      c.studentId.toLowerCase() === term ||
      c.studentName.toLowerCase().includes(term)
    );
    if (match) {
      setSelectedCert(match);
      setVerificationResult({
        status: 'verified',
        cert: match,
        message: 'Certificate officially verified on Blockchain'
      });
    }
  };

  const isCurrentInputValid = Boolean(
    certNumber.trim() && 
    (verifiedCertificates.some(c => 
      c.id.toLowerCase() === certNumber.trim().toLowerCase() ||
      c.studentId.toLowerCase() === certNumber.trim().toLowerCase() ||
      c.studentName.toLowerCase().includes(certNumber.trim().toLowerCase())
    ) || certNumber.trim().toUpperCase() === 'PGDIT12345')
  );

  return (
    <div className="authenticity-hero-wrapper">
      {/* Background Soft Glow & Grid */}
      <div className="auth-hero-backdrop"></div>

      <div className="auth-hero-container">
        {/* Main Composite Stage */}
        <div className="auth-composite-stage">
          
          {/* Layer 1: Background Mobile Mockup (Behind, to the left) */}
          <div 
            className="mobile-certificate-mockup"
            onClick={() => onSelectCertificate && selectedCert && onSelectCertificate(selectedCert)}
            title="Click to view full official certificate"
          >
            {/* Phone Screen Top Bar */}
            <div className="phone-top-bar">
              <button 
                type="button" 
                className="phone-nav-btn"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <ArrowLeft size={17} strokeWidth={2.4} color="#3b82f6" />
              </button>
              <span className="phone-nav-title">Certificate</span>
              <button 
                type="button" 
                className="phone-nav-btn"
                onClick={(e) => { 
                  e.stopPropagation();
                  if (navigator.share && selectedCert) {
                    navigator.share({
                      title: `Certificate #${selectedCert.id}`,
                      text: `Verified Academic Certificate for ${selectedCert.studentName}`,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(selectedCert?.certificateHash || '');
                  }
                }}
              >
                <Share2 size={16} strokeWidth={2.4} color="#3b82f6" />
              </button>
            </div>

            {/* University Header */}
            <div className="phone-university-header">
              <div className="ju-crest-logo">
                <svg viewBox="0 0 40 40" width="34" height="34" className="crest-svg">
                  <circle cx="20" cy="20" r="19" fill="#0284c7" fillOpacity="0.12" stroke="#0284c7" strokeWidth="1.5" />
                  <path d="M20 7 L31 13 L20 19 L9 13 Z" fill="#0284c7" />
                  <path d="M12 16.5 L12 24 C12 28.5 20 32 20 32 C20 32 28 28.5 28 24 L28 16.5" fill="none" stroke="#0369a1" strokeWidth="1.8" />
                  <circle cx="20" cy="23" r="3.5" fill="#38bdf8" />
                  <path d="M20 19 L20 27" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="ju-university-names">
                <div className="ju-main-name">
                  {selectedCert?.institution === 'Jahangirnagar University' 
                    ? 'Jahangirnagar University' 
                    : selectedCert?.institution || 'Jahangirnagar University'}
                </div>
                <div className="ju-dept-name">
                  {selectedCert?.department || 'Institute of Information Technology'}
                </div>
              </div>
            </div>

            {/* Large Certificate Header */}
            <div className="phone-cert-title-block">
              <h3 className="phone-cert-word">CERTIFICATE</h3>
              <div className="phone-cert-signature-name">
                {selectedCert?.signatureName || (selectedCert?.studentName ? `${selectedCert.studentName.split(' ')[0]} ${selectedCert.studentName.split(' ')[1] ? selectedCert.studentName.split(' ')[1][0] + '.' : ''}` : 'Kyle H.')}
              </div>
            </div>

            {/* Abstract Certificate Lines & Info Rows */}
            <div className="phone-cert-body-stripes">
              <div className="cert-stripe stripe-long"></div>
              <div className="cert-stripe stripe-full"></div>
              <div className="cert-stripe stripe-mid"></div>
              <div className="cert-stripe stripe-short"></div>
              <div className="cert-stripe stripe-long"></div>
            </div>

            {/* Micro Badge inside phone preview */}
            <div className="phone-preview-meta">
              <div className="phone-student-pill">
                <span className="phone-std-name">{selectedCert?.studentName || 'Kyle Henderson'}</span>
                <span className="phone-std-id">{selectedCert?.id || 'PGDIT12345'}</span>
              </div>
              <div className="phone-verified-tag">
                <ShieldCheck size={12} color="#059669" />
                <span>On-Chain Verified</span>
              </div>
            </div>

            {/* Bottom Dock Bar */}
            <div className="phone-bottom-dock">
              <button 
                type="button" 
                className="phone-dock-item active"
                onClick={(e) => { e.stopPropagation(); setActiveSection('home'); }}
              >
                <Home size={15} />
                <span>Home</span>
              </button>
              <button 
                type="button" 
                className="phone-dock-item"
                onClick={(e) => { e.stopPropagation(); setActiveSection('verified'); }}
              >
                <User size={15} />
                <span>Profile</span>
              </button>
            </div>
          </div>

          {/* Layer 2: Foreground Authenticity Verification Card */}
          <div className="auth-verification-card">
            
            {/* Floating QR Code Badge (Top-Right) */}
            <div 
              className="floating-qr-badge" 
              onClick={() => setQrModalOpen(true)}
              title="Click to view QR Code details"
            >
              <svg viewBox="0 0 100 100" width="76" height="76" className="qr-svg-mockup">
                <rect width="100" height="100" fill="#ffffff" rx="10" />
                
                {/* Top Left Position Marker */}
                <rect x="10" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="14" y="14" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="18" y="18" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Top Right Position Marker */}
                <rect x="64" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="68" y="14" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="72" y="18" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Bottom Left Position Marker */}
                <rect x="10" y="64" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="14" y="68" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="18" y="72" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Inner Data Pattern Blocks */}
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
            </div>

            {/* Card Titles */}
            <h2 className="auth-card-title">Authenticity Verification</h2>
            <p className="auth-card-subtitle">
              Please insert the Certificate Number<br />to check its status.
            </p>

            {/* Verification Form */}
            <form onSubmit={handleCheckCertificate} className="auth-input-form">
              <div className="auth-pill-input-box">
                <input 
                  type="text"
                  className="auth-pill-input"
                  value={certNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Certificate Number..."
                  spellCheck={false}
                  autoComplete="off"
                />
                {isCurrentInputValid && (
                  <div className="auth-input-check-icon" title="Valid Certificate Format">
                    <Check size={20} color="#00b894" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Action Button & Hand Cursor Pointer */}
              <div className="auth-btn-container">
                <button 
                  type="submit" 
                  className={`auth-check-btn ${isChecking ? 'checking' : ''}`}
                  disabled={isChecking}
                >
                  {isChecking ? 'Verifying Ledger...' : 'Check Certificate'}
                </button>

                {/* Hand Click Cursor Graphic from mockup */}
                <div className="auth-hand-cursor" aria-hidden="true">
                  <svg width="26" height="30" viewBox="0 0 24 28" fill="none" className="hand-svg">
                    <path 
                      d="M8.5 12.5V3C8.5 1.89543 9.39543 1 10.5 1C11.6046 1 12.5 1.89543 12.5 3V12M12.5 7.5C12.5 6.39543 13.3954 5.5 14.5 5.5C15.6046 5.5 16.5 6.39543 16.5 7.5V13M16.5 9.5C16.5 8.39543 17.3954 7.5 18.5 7.5C19.6046 7.5 20.5 8.39543 20.5 9.5V17C20.5 22.5 16 27 10.5 27C6.5 27 3.5 24 3.5 20.5C3.5 18.5 4.8 16.2 6.5 14.5L8.5 12.5" 
                      stroke="#0f172a" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </form>

            {/* Quick Select Sample Pills */}
            <div className="auth-quick-pills">
              <span className="quick-pill-label">Try sample:</span>
              <button 
                type="button" 
                className={`quick-pill-btn ${certNumber === 'PGDIT12345' ? 'active' : ''}`}
                onClick={() => handleQuickSelect('PGDIT12345')}
              >
                PGDIT12345 (Kyle H.)
              </button>
              <button 
                type="button" 
                className={`quick-pill-btn ${certNumber === 'IU-2022-BCS-8901' ? 'active' : ''}`}
                onClick={() => handleQuickSelect('IU-2022-BCS-8901')}
              >
                IU-2022-BCS-8901
              </button>
              <button 
                type="button" 
                className={`quick-pill-btn ${certNumber === 'IU-2022-MCA-4412' ? 'active' : ''}`}
                onClick={() => handleQuickSelect('IU-2022-MCA-4412')}
              >
                IU-2022-MCA-4412
              </button>
            </div>

            {/* Result Feedback Banner */}
            {verificationResult && (
              <div className={`auth-result-box result-${verificationResult.status}`}>
                {verificationResult.status === 'verified' && (
                  <div className="auth-result-card">
                    <div className="auth-result-header">
                      <div className="result-shield-badge verified">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="result-titles">
                        <h4 className="result-main-title">AUTHENTIC & VERIFIED</h4>
                        <p className="result-sub-title">SHA-256 cryptographically sealed on Block #{verificationResult.cert.blockHeight}</p>
                      </div>
                    </div>

                    <div className="auth-result-details">
                      <div className="res-row">
                        <span className="res-lbl">Recipient:</span>
                        <span className="res-val font-semibold">{verificationResult.cert.studentName}</span>
                      </div>
                      <div className="res-row">
                        <span className="res-lbl">Certificate ID:</span>
                        <span className="res-val mono-font text-teal">{verificationResult.cert.id}</span>
                      </div>
                      <div className="res-row">
                        <span className="res-lbl">Program:</span>
                        <span className="res-val">{verificationResult.cert.course}</span>
                      </div>
                      <div className="res-row">
                        <span className="res-lbl">Institution:</span>
                        <span className="res-val">{verificationResult.cert.institution}</span>
                      </div>
                    </div>

                    <div className="auth-result-actions">
                      <button 
                        type="button" 
                        className="btn-view-official"
                        onClick={() => onSelectCertificate(verificationResult.cert)}
                      >
                        <Award size={15} />
                        <span>View Official Certificate</span>
                      </button>
                      <button 
                        type="button" 
                        className="btn-view-ledger"
                        onClick={() => {
                          onSearchQuery(verificationResult.cert.certificateHash || verificationResult.cert.id);
                          setActiveSection('verified');
                        }}
                      >
                        <span>Audit on Ledger</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {verificationResult.status === 'pending' && (
                  <div className="auth-result-card pending-card">
                    <div className="auth-result-header">
                      <div className="result-shield-badge pending">
                        <Clock size={20} />
                      </div>
                      <div className="result-titles">
                        <h4 className="result-main-title text-amber">PENDING CONSENSUS</h4>
                        <p className="result-sub-title">Submitted record is awaiting multi-sig validator endorsement.</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="btn-view-ledger mt-2 w-full"
                      onClick={() => setActiveSection('pending')}
                    >
                      <span>Check Pending Approval Queue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {verificationResult.status === 'not-found' && (
                  <div className="auth-result-card notfound-card">
                    <div className="auth-result-header">
                      <div className="result-shield-badge notfound">
                        <AlertCircle size={20} />
                      </div>
                      <div className="result-titles">
                        <h4 className="result-main-title text-danger">RECORD NOT FOUND</h4>
                        <p className="result-sub-title">No issued academic certificate found for "{verificationResult.query}".</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* QR Code Detail Modal if clicked */}
      {qrModalOpen && (
        <div className="modal-overlay" onClick={() => setQrModalOpen(false)}>
          <div className="modal-container qr-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="qr-modal-card">
              <h3 className="qr-modal-title">Blockchain QR Verification</h3>
              <p className="qr-modal-sub">Scan using any standard smartphone camera to authenticate instantly.</p>
              
              <div className="qr-modal-box">
                <svg viewBox="0 0 100 100" width="160" height="160" className="qr-large-svg">
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
              </div>

              <div className="qr-modal-meta">
                <div className="mono-font text-xs text-muted mb-1">Target Certificate Hash:</div>
                <div className="mono-font text-xs text-cyan break-all bg-dark-subtle p-2 rounded">
                  {selectedCert?.certificateHash || '0xe343b47bb3aa76f617d07cac44549d6bf58278e3f936f7bb15855926f84ee64d'}
                </div>
              </div>

              <button 
                type="button" 
                className="btn-primary w-full mt-4"
                onClick={() => setQrModalOpen(false)}
              >
                Close QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
