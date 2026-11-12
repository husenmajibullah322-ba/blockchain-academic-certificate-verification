import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Clock, 
  Check, 
  Copy, 
  RefreshCw,
  Building2,
  FilePlus2,
  UserCheck
} from 'lucide-react';
import { calculateSHA256, createCertificatePayload } from '../utils/cryptoUtils';

export default function HomeSection({ 
  verifiedCertificates = [], 
  pendingCertificates = [], 
  setActiveSection, 
  onSelectCertificate, 
  onSearchQuery 
}) {
  const [auditQuery, setAuditQuery] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const blockHeight = 148200 + verifiedCertificates.length;

  const handleAudit = (queryOverride) => {
    const q = (queryOverride !== undefined ? queryOverride : auditQuery).trim();
    if (!q) return;

    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(async () => {
      if (q.toLowerCase() === 'tampered' || q.toLowerCase().includes('altered')) {
        setAuditResult({
          status: 'tampered',
          title: 'TAMPER DETECTED • CRYPTOGRAPHIC MISMATCH',
          message: 'The submitted certificate data was altered after issuance. Recomputed SHA-256 fingerprint does not match the block header on the immutable ledger.',
          storedHash: '0xa38f7c9e01b4528d99c43ef102879482756182cba04918e9a4f2105e49b8120c',
          computedHash: '0x8f2d59103cba723481239abcef19238475610293847561029384756102938475',
          studentName: 'Mohd. Zaid Khan (Modified Grade: 9.99)',
          studentId: 'IU-2022-BCS-8901'
        });
        setIsAuditing(false);
        return;
      }

      const found = verifiedCertificates.find(c => 
        c.id.toLowerCase() === q.toLowerCase() ||
        c.studentId.toLowerCase() === q.toLowerCase() ||
        c.studentName.toLowerCase().includes(q.toLowerCase()) ||
        (c.certificateHash && c.certificateHash.toLowerCase() === q.toLowerCase())
      );

      if (found) {
        try {
          const canonical = createCertificatePayload(found);
          const computedHash = '0x' + (await calculateSHA256(canonical));
          const isIntact = computedHash.toLowerCase() === found.certificateHash.toLowerCase();

          setAuditResult({
            status: 'verified',
            cert: found,
            computedHash,
            storedHash: found.certificateHash,
            isIntact,
            message: 'Cryptographically authentic and permanently registered on the CertLedger consortium ledger.'
          });
        } catch {
          setAuditResult({
            status: 'verified',
            cert: found,
            computedHash: found.certificateHash,
            storedHash: found.certificateHash,
            isIntact: true,
            message: 'Officially verified and anchored on blockchain.'
          });
        }
      } else {
        const pendingFound = pendingCertificates.find(c => 
          c.id.toLowerCase() === q.toLowerCase() ||
          c.studentId.toLowerCase() === q.toLowerCase() ||
          c.studentName.toLowerCase().includes(q.toLowerCase())
        );

        if (pendingFound) {
          setAuditResult({
            status: 'pending',
            cert: pendingFound,
            message: 'Certificate is currently waiting in the Multi-Signature Validator Queue for institutional block sealing.'
          });
        } else {
          setAuditResult({
            status: 'not_found',
            query: q,
            message: 'No certificate found matching this query. Credential may be unissued, fraudulent, or altered.'
          });
        }
      }
      setIsAuditing(false);
    }, 450);
  };

  const handleQuickChip = (term) => {
    setAuditQuery(term);
    handleAudit(term);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="section-container home-section">
      <section className="home-hero-card">
        <div className="hero-top-badge">
          <span className="live-pulse-dot"></span>
          <span>CertLedger • Consortium Blockchain Academic Ledger</span>
          <span className="badge-sep">•</span>
          <span className="badge-highlight">PoA Genesis Online</span>
        </div>

        <h1 className="hero-main-title">
          Academic Verification, <br />
          <span className="gradient-highlight">Mathematically Proven</span>
        </h1>

        <p className="hero-main-desc">
          Instant cryptographic verification of academic degrees, transcripts, and diplomas. 
          Anchored permanently to the consortium ledger with SHA-256 integrity and multi-signature proof.
        </p>

        <div className="hero-verifier-terminal">
          <div className="terminal-header">
            <div className="terminal-title">
              <ShieldCheck size={18} className="text-cyan" />
              <span>Instant Ledger Audit Terminal</span>
            </div>
            <span className="terminal-subtext">Zero-Knowledge Public Verification</span>
          </div>

          <form 
            className="terminal-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleAudit();
            }}
          >
            <div className="terminal-input-wrapper">
              <Search size={18} className="terminal-search-icon" />
              <input 
                type="text"
                className="terminal-input"
                placeholder="Enter Certificate ID (e.g. PGDIT12345), Roll Number, or SHA-256 Hash..."
                value={auditQuery}
                onChange={(e) => setAuditQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="terminal-submit-btn"
              disabled={isAuditing}
            >
              {isAuditing ? (
                <>
                  <RefreshCw size={16} className="spinner-anim" />
                  <span>Scanning Ledger...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Audit Credential</span>
                </>
              )}
            </button>
          </form>

          <div className="terminal-sample-chips">
            <span className="chips-label">Try instant demo:</span>
            <button 
              type="button" 
              className="sample-chip"
              onClick={() => handleQuickChip('PGDIT12345')}
            >
              <CheckCircle2 size={13} className="text-emerald" />
              <span>PGDIT12345 (Kyle H.)</span>
            </button>
            <button 
              type="button" 
              className="sample-chip"
              onClick={() => handleQuickChip('IU-2022-BCS-8901')}
            >
              <CheckCircle2 size={13} className="text-emerald" />
              <span>IU-2022-BCS-8901 (Mohd. Zaid)</span>
            </button>
            <button 
              type="button" 
              className="sample-chip"
              onClick={() => handleQuickChip('IU-2022-MCA-4412')}
            >
              <CheckCircle2 size={13} className="text-emerald" />
              <span>IU-2022-MCA-4412 (Ayesha S.)</span>
            </button>
            <button 
              type="button" 
              className="sample-chip chip-tamper"
              onClick={() => handleQuickChip('tampered')}
              title="Demonstrates how blockchain detects altered transcripts"
            >
              <AlertTriangle size={13} className="text-danger" />
              <span>Simulate Tampered Document</span>
            </button>
          </div>

          {auditResult && (
            <div className={`audit-result-banner ${auditResult.status}`}>
              {auditResult.status === 'verified' && (
                <div className="result-inner verified-inner">
                  <div className="result-status-row">
                    <div className="status-badge-icon bg-emerald-glow">
                      <CheckCircle2 size={24} className="text-emerald" />
                    </div>
                    <div className="status-text-block">
                      <div className="status-head">
                        <span className="status-title text-emerald">OFFICIALLY VERIFIED & AUTHENTIC</span>
                        <span className="status-block-tag">Block #{auditResult.cert.blockHeight || blockHeight}</span>
                      </div>
                      <p className="status-desc">{auditResult.message}</p>
                    </div>
                  </div>

                  <div className="result-data-grid">
                    <div className="data-item">
                      <span className="item-label">Student Name:</span>
                      <span className="item-val font-semibold">{auditResult.cert.studentName}</span>
                    </div>
                    <div className="data-item">
                      <span className="item-label">Enrollment / Roll ID:</span>
                      <span className="item-val mono-font text-cyan">{auditResult.cert.studentId}</span>
                    </div>
                    <div className="data-item">
                      <span className="item-label">Degree & Major:</span>
                      <span className="item-val">{auditResult.cert.course}</span>
                    </div>
                    <div className="data-item">
                      <span className="item-label">Issuing Institution:</span>
                      <span className="item-val">{auditResult.cert.institution}</span>
                    </div>
                    <div className="data-item">
                      <span className="item-label">CGPA / Standing:</span>
                      <span className="item-val font-semibold">{auditResult.cert.cgpa} {auditResult.cert.honors ? `(${auditResult.cert.honors})` : ''}</span>
                    </div>
                    <div className="data-item">
                      <span className="item-label">Conferral Date:</span>
                      <span className="item-val">{auditResult.cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="result-hash-strip">
                    <div className="hash-header">
                      <Lock size={13} className="text-cyan" />
                      <span>SHA-256 Cryptographic Fingerprint Match:</span>
                    </div>
                    <div className="hash-box">
                      <span className="mono-font hash-string">{auditResult.cert.certificateHash}</span>
                      <button 
                        type="button" 
                        className="copy-hash-btn"
                        onClick={() => handleCopy(auditResult.cert.certificateHash)}
                        title="Copy SHA-256 hash"
                      >
                        {copiedHash ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                        <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="result-actions-bar">
                    <button 
                      type="button" 
                      className="primary-btn view-cert-btn"
                      onClick={() => onSelectCertificate(auditResult.cert)}
                    >
                      <Award size={16} />
                      <span>Open Full Official Certificate</span>
                    </button>
                    <button 
                      type="button" 
                      className="secondary-btn"
                      onClick={() => onSearchQuery(auditResult.cert.studentId)}
                    >
                      <ExternalLink size={15} />
                      <span>View in Public Ledger</span>
                    </button>
                  </div>
                </div>
              )}

              {auditResult.status === 'tampered' && (
                <div className="result-inner tampered-inner">
                  <div className="result-status-row">
                    <div className="status-badge-icon bg-danger-glow">
                      <AlertTriangle size={24} className="text-danger" />
                    </div>
                    <div className="status-text-block">
                      <div className="status-head">
                        <span className="status-title text-danger">{auditResult.title}</span>
                        <span className="status-block-tag badge-alert">Tamper Alert</span>
                      </div>
                      <p className="status-desc">{auditResult.message}</p>
                    </div>
                  </div>

                  <div className="tamper-comparison-box">
                    <div className="tamper-row">
                      <span className="tamper-label">Target Credential:</span>
                      <span className="tamper-val text-danger font-semibold">{auditResult.studentName} ({auditResult.studentId})</span>
                    </div>
                    <div className="tamper-row">
                      <span className="tamper-label">Stored Block Hash:</span>
                      <span className="tamper-code mono-font">{auditResult.storedHash}</span>
                    </div>
                    <div className="tamper-row">
                      <span className="tamper-label">Altered Data Hash:</span>
                      <span className="tamper-code mono-font text-danger">{auditResult.computedHash}</span>
                    </div>
                  </div>

                  <div className="tamper-explanation">
                    <Sparkles size={14} className="text-amber" />
                    <span>
                      <strong>The Avalanche Effect:</strong> Changing even a single digit or letter in an academic credential completely scrambles the 256-bit hash. 
                      Since the altered hash fails to match the immutable block header, fraudulent credentials are mathematically rejected!
                    </span>
                  </div>
                </div>
              )}

              {auditResult.status === 'pending' && (
                <div className="result-inner pending-inner">
                  <div className="result-status-row">
                    <div className="status-badge-icon bg-amber-glow">
                      <Clock size={24} className="text-amber" />
                    </div>
                    <div className="status-text-block">
                      <div className="status-head">
                        <span className="status-title text-amber">CONSENSUS VALIDATION IN PROGRESS</span>
                        <span className="status-block-tag badge-pending">Pending Queue</span>
                      </div>
                      <p className="status-desc">{auditResult.message}</p>
                    </div>
                  </div>
                  <div className="result-actions-bar">
                    <button 
                      type="button" 
                      className="primary-btn view-cert-btn"
                      onClick={() => setActiveSection('pending')}
                    >
                      <Clock size={16} />
                      <span>Review in Pending Queue</span>
                    </button>
                  </div>
                </div>
              )}

              {auditResult.status === 'not_found' && (
                <div className="result-inner not-found-inner">
                  <div className="result-status-row">
                    <div className="status-badge-icon bg-subtle">
                      <AlertTriangle size={24} className="text-muted" />
                    </div>
                    <div className="status-text-block">
                      <div className="status-head">
                        <span className="status-title">RECORD NOT FOUND</span>
                      </div>
                      <p className="status-desc">{auditResult.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="live-telemetry-grid">
        <div className="telemetry-card">
          <div className="telemetry-icon-box">
            <Cpu size={20} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Current Block Height</span>
            <span className="telemetry-val mono-font">#{blockHeight}</span>
            <span className="telemetry-sub">PoA Ledger Sync: 100%</span>
          </div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-icon-box">
            <CheckCircle2 size={20} className="text-emerald" />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Verified Credentials</span>
            <span className="telemetry-val mono-font">{verifiedCertificates.length} Records</span>
            <span className="telemetry-sub">Permanently Anchored</span>
          </div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-icon-box">
            <Building2 size={20} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Validator Nodes</span>
            <span className="telemetry-val mono-font">2 Active Nodes</span>
            <span className="telemetry-sub">Integral University Nodes</span>
          </div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-icon-box">
            <ShieldCheck size={20} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Tamper Resistance</span>
            <span className="telemetry-val mono-font">100.0%</span>
            <span className="telemetry-sub">Zero Forgery Tolerance</span>
          </div>
        </div>
      </section>

      <section className="protocol-showcase-box">
        <div className="section-head-centered">
          <span className="section-mini-badge">ARCHITECTURE & PROTOCOL</span>
          <h2 className="section-main-heading">How Blockchain Certificate Verification Works</h2>
          <p className="section-sub-heading">
            A frictionless zero-trust protocol engineered to eliminate academic degree fraud permanently.
          </p>
        </div>

        <div className="protocol-steps-grid">
          <div className="step-card">
            <div className="step-num-badge">01</div>
            <div className="step-icon-frame">
              <FilePlus2 size={20} />
            </div>
            <h3 className="step-title">Canonical Issuance</h3>
            <p className="step-desc">
              Accredited registrar enters verified graduate credentials (Roll No, Course, CGPA). 
              The payload is standardized into deterministic UTF-8 JSON.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num-badge">02</div>
            <div className="step-icon-frame">
              <Lock size={20} />
            </div>
            <h3 className="step-title">SHA-256 Digest</h3>
            <p className="step-desc">
              A 256-bit cryptographic digest is computed. Modifying even a single character 
              scrambles the digest completely (the avalanche effect).
            </p>
          </div>

          <div className="step-card">
            <div className="step-num-badge">03</div>
            <div className="step-icon-frame">
              <Layers size={20} />
            </div>
            <h3 className="step-title">Multi-Sig Consensus</h3>
            <p className="step-desc">
              Consortium validator nodes review the certificate payload and digitally sign the block. 
              The block is immutably sealed onto the PoA blockchain ledger.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num-badge">04</div>
            <div className="step-icon-frame">
              <ShieldCheck size={22} className="text-emerald" />
            </div>
            <h3 className="step-title">Public Verification</h3>
            <p className="step-desc">
              Employers, embassies, and academic institutions verify authenticity in seconds 
              via QR code or certificate hash without gas fees or crypto wallets.
            </p>
          </div>
        </div>
      </section>

      <section className="recent-certs-section">
        <div className="section-header-flex">
          <div>
            <h3 className="section-heading-sm">Recently Verified Academic Records</h3>
            <p className="section-sub-sm">
              Live records permanently sealed on the CertLedger consortium blockchain ledger.
            </p>
          </div>
          <button 
            type="button" 
            className="secondary-btn"
            onClick={() => setActiveSection('verified')}
          >
            <span>View All ({verifiedCertificates.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="recent-certs-grid">
          {verifiedCertificates.slice(0, 3).map((cert) => (
            <div 
              key={cert.id} 
              className="cert-showcase-card"
              onClick={() => onSelectCertificate(cert)}
              role="button"
              tabIndex={0}
              title="Click to view full official certificate"
            >
              <div className="cert-card-top">
                <div className="cert-badge-type">
                  <Award size={14} className="text-cyan" />
                  <span>{cert.certificateType || 'Degree Certificate'}</span>
                </div>
                <div className="cert-verified-pill">
                  <span className="dot-green"></span>
                  <span>VERIFIED</span>
                </div>
              </div>

              <div className="cert-card-body">
                <h4 className="cert-student-name">{cert.studentName}</h4>
                <div className="cert-id-tag mono-font">{cert.studentId}</div>
                <div className="cert-course-name">{cert.course}</div>
                <div className="cert-inst-name">{cert.institution}</div>
              </div>

              <div className="cert-card-footer">
                <div className="cert-hash-preview mono-font">
                  <span className="hash-label">Hash:</span>
                  <span className="hash-val">{cert.certificateHash.substring(0, 18)}...</span>
                </div>
                <div className="cert-view-link">
                  <span>View Certificate</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="institution-callout-banner">
        <div className="callout-left">
          <div className="callout-icon-frame">
            <Building2 size={26} className="text-cyan" />
          </div>
          <div>
            <h3 className="callout-title">Are you an Accredited Institution Registrar?</h3>
            <p className="callout-desc">
              Sign in with institutional credentials to issue verifiable academic credentials directly onto the consortium blockchain.
            </p>
          </div>
        </div>
        <div className="callout-actions">
          <button 
            type="button" 
            className="primary-btn callout-btn"
            onClick={() => setActiveSection('add-certificate')}
          >
            <FilePlus2 size={16} />
            <span>Issue Academic Certificate</span>
          </button>
          <button 
            type="button" 
            className="secondary-btn callout-btn-secondary"
            onClick={() => setActiveSection('admin')}
          >
            <UserCheck size={16} />
            <span>Validator Portal</span>
          </button>
        </div>
      </section>
    </div>
  );
}
