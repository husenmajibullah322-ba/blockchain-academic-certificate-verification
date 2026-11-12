import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  FilePlus2, 
  Clock, 
  CheckCircle2, 
  Mail, 
  LogIn, 
  UserPlus, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon,
  X,
  Cpu
} from 'lucide-react';

export default function Sidebar({ 
  activeSection, 
  setActiveSection, 
  pendingCount, 
  verifiedCount, 
  currentUser, 
  onOpenAuth, 
  onLogout,
  isCollapsed,
  setIsCollapsed,
  mobileNavOpen,
  setMobileNavOpen,
  theme,
  toggleTheme
}) {
  const navItems = [
    {
      id: 'home',
      label: 'Home & Verifier',
      icon: Home,
      badge: null
    },
    {
      id: 'add-certificate',
      label: 'Issue Certificate',
      icon: FilePlus2,
      badge: null
    },
    {
      id: 'verified',
      label: 'Verified Ledger',
      icon: CheckCircle2,
      badge: verifiedCount > 0 ? verifiedCount : null,
      badgeType: 'verified'
    },
    {
      id: 'pending',
      label: 'Consensus Queue',
      icon: Clock,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeType: 'pending'
    },
    {
      id: 'admin',
      label: 'Validator Node',
      icon: ShieldCheck,
      badge: currentUser ? 'Active' : null,
      badgeType: 'admin'
    },
    {
      id: 'contact',
      label: 'Support & Docs',
      icon: Mail,
      badge: null
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileNavOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo-wrapper" onClick={() => setActiveSection('home')} role="button" tabIndex={0}>
          <div className="brand-icon-box">
            <img 
              src="./integral_university_logo.jpg" 
              alt="Integral University Emblem" 
              className="brand-logo-img" 
            />
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <div className="brand-title-row">
                <span className="brand-title">CertLedger</span>
                <span className="brand-chip">PoA</span>
              </div>
              <span className="brand-subtitle">Integral University</span>
            </div>
          )}
        </div>

        {mobileNavOpen && (
          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        )}

        {!mobileNavOpen && (
          <button 
            type="button"
            className="collapse-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="network-status-card">
          <div className="pulse-indicator">
            <span className="pulse-dot"></span>
            <span className="pulse-ring"></span>
          </div>
          <div className="network-info">
            <span className="network-name">Consortium PoA</span>
            <span className="network-status">Ledger Sync: 100%</span>
          </div>
          <Cpu size={14} className="network-icon" />
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-group-title">
          {!isCollapsed ? 'NAVIGATION' : '•••'}
        </div>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="nav-icon-wrapper">
                    <Icon className="nav-icon" size={19} />
                  </span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  {!isCollapsed && item.badge !== null && (
                    <span className={`nav-badge ${item.badgeType || ''}`}>
                      {item.badge}
                    </span>
                  )}
                  {isCollapsed && item.badge !== null && (
                    <span className={`collapsed-badge-dot ${item.badgeType || ''}`}></span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-theme-row">
        <button 
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={17} className="theme-icon sun-icon" />
              {!isCollapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon size={17} className="theme-icon moon-icon" />
              {!isCollapsed && <span>Dark Mode</span>}
            </>
          )}
        </button>
      </div>

      <div className="sidebar-auth-footer">
        {currentUser ? (
          <div className="user-profile-box">
            <div className="user-avatar" title={currentUser.name}>
              {currentUser.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="user-details">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-role">{currentUser.role ? currentUser.role.split('&')[0].trim() : 'Validator Admin'}</div>
              </div>
            )}
            <button 
              type="button"
              className="logout-btn" 
              onClick={onLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="auth-actions-group">
            {!isCollapsed ? (
              <div className="auth-buttons-dual">
                <button 
                  type="button"
                  className="auth-btn login-btn"
                  onClick={() => onOpenAuth('login')}
                >
                  <LogIn size={15} />
                  <span>Admin Sign In</span>
                </button>
                <button 
                  type="button"
                  className="auth-btn register-btn"
                  onClick={() => onOpenAuth('register')}
                  title="Register Institutional Validator"
                >
                  <UserPlus size={15} />
                  <span>Register Node</span>
                </button>
              </div>
            ) : (
              <button 
                type="button"
                className="auth-icon-only-btn"
                onClick={() => onOpenAuth('login')}
                title="Admin Sign In"
              >
                <LogIn size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
