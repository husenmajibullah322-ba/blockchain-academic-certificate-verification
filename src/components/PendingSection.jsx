import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Cpu, 
  Copy, 
  Check, 
  ArrowRight,
  FileCheck2,
  X
} from 'lucide-react';

export default function PendingSection({ 
  pendingCertificates, 
  onApproveCertificate, 
  onRejectCertificate, 
  _onSelectCertificate, 
  setActiveSection
}) {
  const [searchFilter, setSearchFilter] = useState('');
  const [inspectModalCert, setInspectModalCert] = useState(null);
  const [copiedHashId, setCopiedHashId] = useState(null);

  const filteredPending = pendingCertificates.filter(item => {
    const term = searchFilter.toLowerCase();
    return (
      item.studentName.toLowerCase().includes(term) ||
      item.studentId.toLowerCase().includes(term) ||
      item.course.toLowerCase().includes(term) ||
      (item.certificateHash && item.certificateHash.toLowerCase().includes(term))
    );
  });

  const handleCopy = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  return (
    <div className="section-container pending-section">
      <div className="section-header-banner">
        <div className="banner-left">
          <div className="banner-icon-box">
            <Clock className="text-amber" size={24} />
          </div>
          <div>
            <h2 className="banner-title">Consensus Validation Queue</h2>
            <p className="banner-subtitle">
              Academic credentials queued for institutional consensus verification. Multi-sig validation is required before block inclusion.
            </p>
          </div>
        </div>

        <div className="banner-right-actions">
          <div className="consensus-badge">
            <Cpu size={15} />
            <span>Rule: 1/1 PoA Approval Required</span>
          </div>
        </div>
      </div>

      <div className="filter-controls-row">
        <div className="search-input-wrapper">
          <Search size={17} className="search-icon" />
          <input 
            type="text" 
            className="filter-search-input"
            placeholder="Search pending queue by student name, roll number, or hash..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        <div className="queue-counter-tag">
          <strong>{filteredPending.length}</strong> certificate{filteredPending.length !== 1 ? 's' : ''} in queue
        </div>
      </div>

      {filteredPending.length === 0 ? (
        <div className="empty-state-panel">
          <div className="empty-icon-circle bg-amber-dim">
            <CheckCircle2 size={36} className="text-amber" />
          </div>
          <h3>No Pending Certificates Awaiting Approval</h3>
          <p>
            All submitted credentials have been verified and sealed to the immutable blockchain ledger.
          </p>
          <button 
            type="button"
            className="primary-btn"
            onClick={() => setActiveSection('add-certificate')}
          >
            <span>Issue New Certificate</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="pending-cards-grid">
          {filteredPending.map((cert) => (
            <div key={cert.id} className="pending-card">
              <div className="pending-card-top">
                <div className="pending-id-tag mono-font">{cert.id}</div>
                <div className="pending-badge">
                  <Clock size={12} className="text-amber" />
                  <span>Awaiting Signature</span>
                </div>
              </div>

              <div className="pending-card-body">
                <h3 className="pending-student-name">{cert.studentName}</h3>
                <div className="pending-roll-tag mono-font">{cert.studentId}</div>
                
                <div className="pending-meta-row">
                  <span className="p-label">Degree:</span>
                  <span className="p-val">{cert.course}</span>
                </div>
                <div className="pending-meta-row">
                  <span className="p-label">Major:</span>
                  <span className="p-val">{cert.department}</span>
                </div>
                <div className="pending-meta-row">
                  <span className="p-label">CGPA:</span>
                  <span className="p-val text-amber font-semibold">{cert.cgpa}</span>
                </div>
                <div className="pending-meta-row">
                  <span className="p-label">Submitted By:</span>
                  <span className="p-val text-muted">{cert.submittedBy || 'Registrar (Demo)'}</span>
                </div>

                <div className="pending-hash-box">
                  <div className="hash-label-row">
                    <span className="text-xs text-muted">Proposed SHA-256 Digest:</span>
                    <button 
                      type="button"
                      className="inline-copy-btn"
                      onClick={() => handleCopy(cert.certificateHash, cert.id)}
                      title="Copy SHA-256"
                    >
                      {copiedHashId === cert.id ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <div className="hash-code-tiny mono-font">
                    {cert.certificateHash}
                  </div>
                </div>
              </div>

              <div className="pending-card-actions">
                <button 
                  type="button"
                  className="approve-action-btn"
                  onClick={() => onApproveCertificate(cert)}
                  title="Approve and seal to blockchain ledger"
                >
                  <FileCheck2 size={16} />
                  <span>Approve & Mine Block</span>
                </button>
                <button 
                  type="button"
                  className="inspect-action-btn"
                  onClick={() => setInspectModalCert(cert)}
                  title="Inspect raw payload"
                >
                  Inspect
                </button>
                <button 
                  type="button"
                  className="reject-action-btn"
                  onClick={() => onRejectCertificate(cert.id)}
                  title="Dismiss this submission"
                >
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {inspectModalCert && (
        <div className="modal-overlay" onClick={() => setInspectModalCert(null)}>
          <div className="modal-container inspect-modal" onClick={e => e.stopPropagation()}>
            <div className="inspect-modal-header">
              <h3>Payload Inspection • {inspectModalCert.id}</h3>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setInspectModalCert(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="inspect-modal-body">
              <pre className="code-block mono-font">
                {JSON.stringify(inspectModalCert, null, 2)}
              </pre>
            </div>
            <div className="inspect-modal-footer">
              <button 
                type="button"
                className="secondary-btn" 
                onClick={() => setInspectModalCert(null)}
              >
                Close
              </button>
              <button 
                type="button"
                className="primary-btn" 
                onClick={() => {
                  onApproveCertificate(inspectModalCert);
                  setInspectModalCert(null);
                }}
              >
                <FileCheck2 size={15} />
                <span>Approve & Mine</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
