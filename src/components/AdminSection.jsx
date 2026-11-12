import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  LogIn, 
  UserCheck, 
  MapPin,
  Cpu,
  Key
} from 'lucide-react';

export default function AdminSection({ 
  currentUser, 
  adminsList, 
  onOpenAuth, 
  setActiveSection, 
  pendingCount, 
  verifiedCount, 
  blockHeight
}) {
  return (
    <div className="section-container admin-section">
      <div className="university-institution-banner">
        <div className="institution-brand-col">
          <div className="institution-logo-frame">
            <img 
              src="./integral_university_logo.jpg" 
              alt="Integral University Emblem" 
              className="institution-main-logo"
            />
          </div>
          <div className="institution-meta-info">
            <div className="institution-accreditation-pill">
              <span className="pill-dot-live"></span>
              <span>ESTD. 2004 • UGC RECOGNIZED • NAAC ACCREDITED</span>
            </div>
            <h1 className="institution-title">Integral University</h1>
            <div className="institution-sublocation">
              <MapPin size={15} className="text-cyan" />
              <span>Dasauli, Kursi Road, Lucknow - 226026, Uttar Pradesh, India</span>
            </div>
            <div className="institution-node-indicator">
              <span className="indicator-label">Academic Blockchain Validator Node:</span>
              <span className="indicator-code mono-font">{currentUser ? currentUser.nodeId : 'NODE-IU-LKO-01-PRIMARY'}</span>
            </div>
          </div>
        </div>

        <div className="institution-status-badge-col">
          <div className="validator-status-card">
            <div className="status-header">
              <span className="dot-pulse-emerald"></span>
              <span className="status-text">Consortium Validator Active</span>
            </div>
            <div className="validator-stats">
              <div className="v-stat">
                <span className="v-label">Consensus:</span>
                <span className="v-val">PoA Genesis</span>
              </div>
              <div className="v-stat">
                <span className="v-label">Network:</span>
                <span className="v-val text-cyan">PCS26140</span>
              </div>
            </div>
            {currentUser ? (
              <div className="active-admin-tag">
                <UserCheck size={14} className="text-emerald" />
                <span>Registrar: {currentUser.name}</span>
              </div>
            ) : (
              <button 
                type="button"
                className="banner-login-btn"
                onClick={() => onOpenAuth('login')}
              >
                <LogIn size={14} />
                <span>Registrar Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="admin-quick-stats-grid">
        <div className="admin-stat-card" onClick={() => setActiveSection('verified')} role="button" tabIndex={0}>
          <div className="stat-icon-wrap emerald">
            <CheckCircle2 size={22} className="text-emerald" />
          </div>
          <div className="stat-text-block">
            <span className="s-val mono-font">{verifiedCount}</span>
            <span className="s-label">Anchored Credentials</span>
          </div>
        </div>

        <div className="admin-stat-card" onClick={() => setActiveSection('pending')} role="button" tabIndex={0}>
          <div className="stat-icon-wrap amber">
            <Clock size={22} className="text-amber" />
          </div>
          <div className="stat-text-block">
            <span className="s-val mono-font">{pendingCount}</span>
            <span className="s-label">Pending Signatures</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrap cyan">
            <Cpu size={22} className="text-cyan" />
          </div>
          <div className="stat-text-block">
            <span className="s-val mono-font">#{blockHeight}</span>
            <span className="s-label">Current Block Height</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrap">
            <Users size={20} />
          </div>
          <div className="stat-text-block">
            <span className="s-val mono-font">{adminsList.length}</span>
            <span className="s-label">Authorized Signers</span>
          </div>
        </div>
      </div>

      <div className="panel-box">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Accredited Consortium Signers & Nodes</h3>
            <p className="panel-subtitle">Authorized institutional entities with cryptographic block signing privileges</p>
          </div>
          <button 
            type="button" 
            className="secondary-btn"
            onClick={() => onOpenAuth('register')}
          >
            <Users size={15} />
            <span>Register New Node</span>
          </button>
        </div>

        <div className="signers-list-grid">
          {adminsList.map((admin) => (
            <div key={admin.id} className="signer-card">
              <div className="signer-avatar">
                {admin.name.charAt(0)}
              </div>
              <div className="signer-details">
                <div className="signer-name">{admin.name}</div>
                <div className="signer-role">{admin.role}</div>
                <div className="signer-inst">{admin.institution}</div>
                <div className="signer-node mono-font">
                  <Key size={12} className="text-cyan" />
                  <span>{admin.nodeId}</span>
                </div>
              </div>
              <div className="signer-badge">
                <span className="dot-green"></span>
                <span>Active Signer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-box contract-rules-panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">PCS26140 Smart Contract Governance</h3>
            <p className="panel-subtitle">Consensus specifications and cryptographic parameters</p>
          </div>
        </div>

        <div className="contract-specs-grid">
          <div className="spec-item">
            <span className="spec-label">Contract Standard:</span>
            <span className="spec-val">PCS-PoA-ERC721 (Non-Fungible Academic Credential)</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Smart Contract Address:</span>
            <span className="spec-val mono-font text-cyan">0xPCS261407e3FaB91aC441097e88241F83cC87A14</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Hashing Algorithm:</span>
            <span className="spec-val">SHA-256 (NIST FIPS 180-4 Standard)</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Digital Signature Scheme:</span>
            <span className="spec-val">ECDSA secp256k1 with Keccak-256</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Block Finality:</span>
            <span className="spec-val text-emerald font-semibold">Instant (&lt; 1 second)</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Gas Protocol:</span>
            <span className="spec-val text-emerald font-semibold">Zero Gas Fee (Subsidized for Public & Students)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
