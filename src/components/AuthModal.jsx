import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Building, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  X, 
  AlertCircle
} from 'lucide-react';
import { generateRandomHex } from '../utils/cryptoUtils';

export default function AuthModal({ 
  isOpen, 
  initialMode = 'login', 
  onClose, 
  onLogin, 
  onRegister, 
  adminsList 
}) {
  const [mode, setMode] = useState(initialMode);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Accredited Registrar',
    institution: '',
    department: 'Office of Academic Affairs'
  });

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const found = adminsList.find(a => 
      a.email.toLowerCase() === loginEmail.toLowerCase().trim() && 
      a.password === loginPassword
    );

    if (found) {
      onLogin(found);
      onClose();
    } else {
      setErrorMsg('Invalid credentials. Click "Autofill Demo Admin" below to test.');
    }
  };

  const handleAutofillDemo = () => {
    setLoginEmail('admin@integral.edu.in');
    setLoginPassword('admin123');
    setErrorMsg('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.institution) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const exists = adminsList.some(a => a.email.toLowerCase() === registerData.email.toLowerCase().trim());
    if (exists) {
      setErrorMsg('An administrator with this email is already registered.');
      return;
    }

    const newAdmin = {
      id: `admin-${Date.now()}`,
      name: registerData.name.trim(),
      email: registerData.email.toLowerCase().trim(),
      password: registerData.password,
      role: registerData.role,
      institution: registerData.institution.trim(),
      nodeId: `NODE-PCS-${Math.floor(10 + Math.random() * 90)}-VALIDATOR`,
      publicKey: '0x' + generateRandomHex(20)
    };

    onRegister(newAdmin);
    onLogin(newAdmin);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container auth-modal" onClick={e => e.stopPropagation()}>
        <button 
          type="button"
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-icon-wrap">
            <ShieldCheck size={24} />
          </div>
          <h2 className="auth-title">
            {mode === 'login' ? 'Institutional Sign In' : 'Register Validator Node'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login' 
              ? 'Sign in to access official cryptographic keys and issue verified degrees'
              : 'Onboard an accredited university validator node onto the PCS26140 consortium'}
          </p>
        </div>

        <div className="auth-tab-switch">
          <button 
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
          >
            <UserPlus size={15} />
            <span>Register Node</span>
          </button>
        </div>

        {errorMsg && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Registrar Email</label>
              <div className="input-with-icon">
                <Mail size={16} className="field-icon" />
                <input 
                  type="email" 
                  className="form-input with-icon"
                  placeholder="admin@integral.edu.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Node Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="field-icon" />
                <input 
                  type="password" 
                  className="form-input with-icon"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-btn w-full auth-submit-btn">
              <LogIn size={15} />
              <span>Sign In to Node</span>
            </button>

            <button 
              type="button" 
              className="autofill-demo-btn"
              onClick={handleAutofillDemo}
            >
              <Sparkles size={14} className="text-amber" />
              <span>Autofill Demo Admin Credentials</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name & Title</label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input 
                  type="text" 
                  className="form-input with-icon"
                  placeholder="e.g. Dr. Haris M. Khan"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Institutional Email</label>
              <div className="input-with-icon">
                <Mail size={16} className="field-icon" />
                <input 
                  type="email" 
                  className="form-input with-icon"
                  placeholder="registrar@integral.edu.in"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Institution Name</label>
              <div className="input-with-icon">
                <Building size={16} className="field-icon" />
                <input 
                  type="text" 
                  className="form-input with-icon"
                  placeholder="e.g. Integral University, Lucknow"
                  value={registerData.institution}
                  onChange={(e) => setRegisterData({...registerData, institution: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Access Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="field-icon" />
                <input 
                  type="password" 
                  className="form-input with-icon"
                  placeholder="Create secure password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-btn w-full auth-submit-btn">
              <UserPlus size={15} />
              <span>Register Validator Node</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
