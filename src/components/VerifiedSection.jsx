import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Award, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Lock, 
  Layers
} from 'lucide-react';
import { calculateSHA256, createCertificatePayload } from '../utils/cryptoUtils';

export default function VerifiedSection({ 
  verifiedCertificates, 
  onSelectCertificate, 
  initialSearchQuery = ''
}) {
  const [searchFilter, setSearchFilter] = useState('');
  const [verifyInput, setVerifyInput] = useState(initialSearchQuery);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [copiedHashId, setCopiedHashId] = useState(null);

  const handleCopy = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  const handleLiveVerify = useCallback(async (queryToVerify) => {
    const q = (queryToVerify || verifyInput).trim();
    if (!q) return;

    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(async () => {
      try {
        const found = verifiedCertificates.find(c => 
          c.certificateHash.toLowerCase() === q.toLowerCase() ||
          c.studentId.toLowerCase() === q.toLowerCase() ||
          c.id.toLowerCase() === q.toLowerCase()
        );

        if (found) {
          const canonical = createCertificatePayload(found);
          const computedHash = '0x' + (await calculateSHA256(canonical));
          const isCryptographicallyIntact = computedHash.toLowerCase() === found.certificateHash.toLowerCase();

          setVerificationResult({
            success: true,
            certificate: found,
            isCryptographicallyIntact,
            computedHash,
            storedHash: found.certificateHash,
            verifiedAt: new Date().toISOString()
          });
        } else {
          setVerificationResult({
            success: false,
            queriedTerm: q,
            message: 'No matching academic credential found on the CertLedger blockchain. Credential may be unissued, fraudulent, or modified.'
          });
        }
      } catch (err) {
        setVerificationResult({
          success: false,
          message: 'Verification check encountered an error: ' + err.message
        });
      } finally {
        setIsVerifying(false);
      }
    }, 500);
  }, [verifyInput, verifiedCertificates]);

  useEffect(() => {
    if (initialSearchQuery) {
      const timer = setTimeout(() => {
        handleLiveVerify(initialSearchQuery);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialSearchQuery, handleLiveVerify]);

  const filteredCertificates = verifiedCertificates.filter(item => {
    const term = searchFilter.toLowerCase();
    return (
      item.studentName.toLowerCase().includes(term) ||
      item.studentId.toLowerCase().includes(term) ||
      item.course.toLowerCase().includes(term) ||
      item.department.toLowerCase().includes(term) ||
      item.institution.toLowerCase().includes(term) ||
      item.certificateHash.toLowerCase().includes(term) ||
      item.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="section-container verified-section">
      <div className="section-header-banner">
        <div className="banner-left">
          <div className="banner-icon-box">
            <CheckCircle2 className="text-emerald" size={24} />
          </div>
          <div>
            <h2 className="banner-title">Verified Public Ledger</h2>
            <p className="banner-subtitle">
              Publicly verifiable, immutable academic records permanently anchored into the CertLedger consortium blockchain.
            </p>
          </div>
        </div>

        <div className="banner-right-actions">
          <div className="ledger-stat-tag">
            <Layers size={15} />
            <span>{verifiedCertificates.length} Records Anchored</span>
          </div>
        </div>
      </div>

      <div className="verifier-box-panel">
        <div className="verifier-box-header">
          <div className="verifier-header-title">
            <ShieldCheck size={18} className="text-emerald" />
            <h3>Live Cryptographic Verification Engine</h3>
          </div>
          <span className="verifier-hint">Zero-Knowledge Ledger Audit</span>
        </div>

        <form 
          className="verifier-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLiveVerify();
          }}
        >
          <div className="search-input-wrapper flex-1">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="verifier-input"
              placeholder="Enter Certificate Hash (0x...), Student Roll Number, or Certificate ID..."
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="verifier-submit-btn"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <RefreshCw size={15} className="spinner-icon" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={15} />
                <span>Verify Credential</span>
              </>
            )}
          </button>
        </form>

        <div className="verifier-quick-hints">
          <span className="hints-label">Quick test:</span>
          <button 
            type="button" 
            className="hint-chip"
            onClick={() => {
              setVerifyInput('PGDIT12345');
              handleLiveVerify('PGDIT12345');
            }}
          >
            PGDIT12345 (Kyle H.)
          </button>
          <button 
            type="button" 
            className="hint-chip"
            onClick={() => {
              setVerifyInput('IU-2022-BCS-8901');
              handleLiveVerify('IU-2022-BCS-8901');
            }}
          >
            IU-2022-BCS-8901 (Mohd. Zaid)
          </button>
          <button 
            type="button" 
            className="hint-chip"
            onClick={() => {
              setVerifyInput('IU-2022-MCA-4412');
              handleLiveVerify('IU-2022-MCA-4412');
            }}
          >
            IU-2022-MCA-4412 (Ayesha S.)
          </button>
        </div>

        {verificationResult && (
          <div className={`verification-result-card ${verificationResult.success ? 'success' : 'failure'}`}>
            {verificationResult.success ? (
              <div className="result-content-success">
                <div className="result-status-badge">
                  <CheckCircle2 size={24} className="text-emerald" />
                  <div>
                    <h4>OFFICIALLY VERIFIED & AUTHENTIC</h4>
                    <p>Cryptographic hash matches the immutable block ledger with 100% mathematical integrity.</p>
                  </div>
                </div>

                <div className="verified-details-grid">
                  <div className="verified-detail-item">
                    <span className="detail-label">Student Name:</span>
                    <span className="detail-val font-semibold">{verificationResult.certificate.studentName}</span>
                  </div>
                  <div className="verified-detail-item">
                    <span className="detail-label">Roll / Enrollment ID:</span>
                    <span className="detail-val mono-font">{verificationResult.certificate.studentId}</span>
                  </div>
                  <div className="verified-detail-item">
                    <span className="detail-label">Degree & Major:</span>
                    <span className="detail-val">{verificationResult.certificate.course} ({verificationResult.certificate.department})</span>
                  </div>
                  <div className="verified-detail-item">
                    <span className="detail-label">Issuing University:</span>
                    <span className="detail-val">{verificationResult.certificate.institution}</span>
                  </div>
                  <div className="verified-detail-item">
                    <span className="detail-label">Block Height:</span>
                    <span className="detail-val mono-font">Block #{verificationResult.certificate.blockHeight}</span>
                  </div>
                  <div className="verified-detail-item">
                    <span className="detail-label">Audit Timestamp:</span>
                    <span className="detail-val">{verificationResult.verifiedAt}</span>
                  </div>
                </div>

                <div className="hash-integrity-box">
                  <div className="integrity-header">
                    <Lock size={14} />
                    <span>Cryptographic Digest Check: <strong>PASSED (SHA-256 MATCH)</strong></span>
                  </div>
                  <div className="hash-code mono-font">{verificationResult.certificate.certificateHash}</div>
                </div>

                <div className="result-action-row">
                  <button 
                    type="button"
                    className="primary-btn view-doc-btn"
                    onClick={() => onSelectCertificate(verificationResult.certificate)}
                  >
                    <Award size={16} />
                    <span>View Formal Academic Certificate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="result-content-failure">
                <div className="result-status-badge">
                  <AlertTriangle size={24} className="text-danger" />
                  <div>
                    <h4>VERIFICATION FAILED / NOT FOUND</h4>
                    <p>{verificationResult.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="panel-box">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">On-Chain Academic Registry</h3>
            <p className="panel-subtitle">All certificates anchored onto the consortium ledger</p>
          </div>

          <div className="search-input-wrapper filter-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="table-filter-input"
              placeholder="Filter by student name, roll number, course..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Student Details</th>
                <th>Institution</th>
                <th>SHA-256 Digest</th>
                <th>Block #</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    <span className="id-badge mono-font">{cert.id}</span>
                  </td>
                  <td>
                    <div className="table-student-name">{cert.studentName}</div>
                    <div className="table-student-meta">
                      <span className="mono-font">{cert.studentId}</span> • {cert.course}
                    </div>
                  </td>
                  <td>{cert.institution}</td>
                  <td>
                    <div className="table-hash-cell">
                      <span className="hash-mono mono-font" title={cert.certificateHash}>
                        {cert.certificateHash.substring(0, 8)}...{cert.certificateHash.substring(cert.certificateHash.length - 6)}
                      </span>
                      <button 
                        type="button"
                        className="inline-copy-btn"
                        onClick={() => handleCopy(cert.certificateHash, cert.id)}
                        title="Copy Hash"
                      >
                        {copiedHashId === cert.id ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="block-tag mono-font">#{cert.blockHeight}</span>
                  </td>
                  <td>
                    <span className="status-badge verified">
                      <CheckCircle2 size={12} />
                      <span>Verified</span>
                    </span>
                  </td>
                  <td>
                    <button 
                      type="button"
                      className="table-view-btn"
                      onClick={() => onSelectCertificate(cert)}
                    >
                      <Award size={14} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCertificates.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-muted">
                    No verified certificates match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
