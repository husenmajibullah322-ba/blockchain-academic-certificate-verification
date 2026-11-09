import React from 'react';
import { 
  Cpu, 
  LogIn, 
  PlusCircle, 
  CheckCircle,
  Menu,
  Sun,
  Moon
} from 'lucide-react';

export default function Header({ 
  activeSection, 
  setActiveSection, 
  currentUser, 
  onOpenAuth, 
  blockHeight,
  mobileNavOpen,
  setMobileNavOpen,
  theme,
  toggleTheme
}) {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'home':
        return { 
          badge: 'Overview', 
          title: 'Academic Ledger & Verifier', 
          subtitle: 'Zero-knowledge verification of academic credentials on PoA blockchain' 
        };
      case 'admin':
        return { 
          badge: 'Validator Portal', 
          title: 'Institutional Node Controller', 
          subtitle: 'Manage Integral University validator node, consensus & keypairs' 
        };
      case 'add-certificate':
        return { 
          badge: 'Registrar Form', 
          title: 'Issue Academic Credential', 
          subtitle: 'Generate SHA-256 cryptographic proofs & anchor to block payload' 
        };
      case 'pending':
        return { 
          badge: 'Consensus', 
          title: 'Pending Consensus Queue', 
          subtitle: 'Multi-signature validation required before immutable block inclusion' 
        };
      case 'verified':
        return { 
          badge: 'Public Explorer', 
          title: 'Verified Certificate Registry', 
          subtitle: 'Immutable on-chain ledger records with mathematical integrity checks' 
        };
      case 'contact':
        return { 
          badge: 'Support', 
          title: 'Consortium Secretariat', 
          subtitle: 'Institutional onboarding, fraud reporting, and documentation' 
        };
      default:
        return { 
          badge: 'Ledger', 
          title: 'CertLedger System', 
          subtitle: 'Decentralized trust protocol for higher education' 
        };
    }
  };

  const currentInfo = getSectionTitle();

  return (
    <header className="main-header">
      <div className="header-left">
        <button 
          type="button" 
          className="mobile-menu-btn"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <div className="header-badge-row">
            <span className="header-section-badge">{currentInfo.badge}</span>
            <span className="header-status-dot"></span>
            <span className="header-network-text">PCS26140 Testnet</span>
          </div>
          <h1 className="header-title">{currentInfo.title}</h1>
          <p className="header-subtitle">{currentInfo.subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Live Block Height Pill */}
        <div className="header-stat-pill" title="Current Blockchain Block Height">
          <Cpu size={15} className="pill-icon text-cyan" />
          <span className="pill-label">Block:</span>
          <span className="pill-val mono-font">#{blockHeight}</span>
        </div>

        {/* Action Button: Issue Certificate */}
        {activeSection !== 'add-certificate' && (
          <button 
            type="button"
            className="header-action-btn primary"
            onClick={() => setActiveSection('add-certificate')}
          >
            <PlusCircle size={15} />
            <span>Issue Credential</span>
          </button>
        )}

        {/* Action Button: Verify */}
        {activeSection !== 'verified' && activeSection !== 'home' && (
          <button 
            type="button"
            className="header-action-btn outline"
            onClick={() => setActiveSection('verified')}
          >
            <CheckCircle size={15} />
            <span>Verify Hash</span>
          </button>
        )}

        {/* Quick Theme Switcher Icon */}
        <button 
          type="button"
          className="header-theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Account / Sign In */}
        {currentUser ? (
          <div className="header-user-badge" onClick={() => setActiveSection('admin')} role="button" tabIndex={0}>
            <span className="admin-status-dot"></span>
            <span className="user-short-name">{currentUser.name.split(' ')[0]}</span>
            <span className="user-tag">Admin</span>
          </div>
        ) : (
          <button 
            type="button"
            className="header-login-btn"
            onClick={() => onOpenAuth('login')}
          >
            <LogIn size={15} />
            <span>Admin Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
