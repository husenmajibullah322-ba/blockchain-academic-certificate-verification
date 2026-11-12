import React, { useState } from 'react';
import { 
  FilePlus2, 
  Lock, 
  CheckCircle, 
  Copy, 
  Check, 
  Layers, 
  Eye, 
  AlertCircle, 
  LogIn, 
  Clock, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import { generateBlockchainRecord } from '../utils/cryptoUtils';

export default function AddCertificateSection({ 
  currentUser, 
  onOpenAuth, 
  onAddPendingCertificate, 
  onAddVerifiedCertificate, 
  lastVerifiedBlock, 
  onSelectCertificate
}) {
  const [formData, setFormData] = useState(() => ({
    studentName: '',
    studentId: '',
    course: 'Bachelor of Technology',
    department: 'Computer Science & Engineering',
    institution: currentUser ? currentUser.institution : 'Integral University, Lucknow',
    issueDate: '2026-05-20',
    passingYear: '2026',
    cgpa: '9.20 / 10.0',
    certificateType: 'Degree Certificate (Honors)',
    signatoryAuthority: currentUser ? `${currentUser.name}, Registrar` : 'Prof. (Dr.) Haris M. Khan, Registrar',
    honors: 'First Class with Distinction'
  }));

  const [isProcessing, setIsProcessing] = useState(false);
  const [cryptoResult, setCryptoResult] = useState(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);
  const [showCanonicalJson, setShowCanonicalJson] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateNewCertId = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `CERT-IU-2026-${randomSuffix}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.studentId.trim()) {
      alert('Please fill in student name and roll number.');
      return;
    }

    setIsProcessing(true);
    setCryptoResult(null);
    setFormSuccessMessage('');

    try {
      const certId = generateNewCertId();
      const prevHash = lastVerifiedBlock 
        ? lastVerifiedBlock.blockHash 
        : '0x0000000000000000000a3b89ef12c45d6789abcd0123456789abcdef01234567';

      const cryptoPackage = await generateBlockchainRecord(formData, prevHash);

      const completeCertificate = {
        ...formData,
        id: certId,
        ...cryptoPackage,
        submittedBy: currentUser ? `${currentUser.name} (${currentUser.email})` : 'Authorized Registrar (Demo Session)',
        signatoryNode: currentUser ? currentUser.nodeId : 'NODE-IU-LKO-01-PRIMARY'
      };

      setCryptoResult(completeCertificate);
      setFormSuccessMessage(`Cryptographic proof successfully generated for ${formData.studentName}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate cryptographic hash: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSealToBlockchain = () => {
    if (!cryptoResult) return;
    onAddVerifiedCertificate(cryptoResult);
    setFormSuccessMessage(`Certificate for ${cryptoResult.studentName} has been cryptographically sealed and mined into Block!`);
  };

  const handleAddToPending = () => {
    if (!cryptoResult) return;
    onAddPendingCertificate(cryptoResult);
    setFormSuccessMessage(`Certificate for ${cryptoResult.studentName} is queued in Pending for multi-signature consensus.`);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'hash') {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedSignature(true);
      setTimeout(() => setCopiedSignature(false), 2000);
    }
  };

  const handlePopulateSample = () => {
    const randomIds = ['IU-2023-CS-9912', 'IU-2022-AI-6651', 'IU-2023-DS-8840', 'IU-2021-EE-7721'];
    const randomNames = ['Mohd. Zaid Khan', 'Ayesha Siddiqui', 'Farhan Alam', 'Alina Fatima'];
    const idx = Math.floor(Math.random() * randomNames.length);

    setFormData({
      studentName: randomNames[idx],
      studentId: randomIds[idx],
      course: 'Bachelor of Technology',
      department: 'Computer Science & Engineering',
      institution: currentUser ? currentUser.institution : 'Integral University, Lucknow',
      issueDate: new Date().toISOString().split('T')[0],
      passingYear: '2026',
      cgpa: '9.58 / 10.0',
      certificateType: 'Degree Certificate (Honors)',
      signatoryAuthority: currentUser ? `${currentUser.name}, Registrar` : 'Prof. (Dr.) Haris M. Khan, Registrar',
      honors: 'Summa Cum Laude'
    });
  };

  return (
    <div className="section-container add-certificate-section">
      <div className="section-header-banner">
        <div className="banner-left">
          <div className="banner-icon-box">
            <FilePlus2 size={24} />
          </div>
          <div>
            <h2 className="banner-title">Issue New Academic Certificate</h2>
            <p className="banner-subtitle">
              Enter verified student graduation credentials to generate immutable SHA-256 cryptographic proofs & block payload.
            </p>
          </div>
        </div>

        <div className="banner-right-actions">
          <button 
            type="button" 
            className="secondary-btn"
            onClick={handlePopulateSample}
          >
            <Sparkles size={15} />
            <span>Autofill Sample Student</span>
          </button>
        </div>
      </div>

      {!currentUser && (
        <div className="auth-notice-card">
          <div className="notice-icon">
            <AlertCircle size={20} className="text-amber" />
          </div>
          <div className="notice-body">
            <strong>Guest Mode Active:</strong> You can issue certificates and preview cryptographic hashing in demo mode. 
            To sign with official university private keys, sign in as an accredited registrar.
          </div>
          <button 
            type="button" 
            className="notice-login-btn"
            onClick={() => onOpenAuth('login')}
          >
            <LogIn size={14} />
            <span>Admin Sign In</span>
          </button>
        </div>
      )}

      <div className="form-and-result-grid">
        <div className="form-card-container">
          <form className="certificate-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Student Full Name <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  name="studentName"
                  className="form-input" 
                  placeholder="e.g. Mohd. Zaid Khan"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Student Roll / Enrollment No <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  name="studentId"
                  className="form-input mono-font" 
                  placeholder="e.g. IU-2022-BCS-8901"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Degree / Program <span className="required">*</span>
                </label>
                <select 
                  name="course" 
                  className="form-input"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="Bachelor of Technology">Bachelor of Technology (B.Tech)</option>
                  <option value="Bachelor of Science">Bachelor of Science (B.Sc)</option>
                  <option value="Master of Computer Applications">Master of Computer Applications (MCA)</option>
                  <option value="Master of Technology">Master of Technology (M.Tech)</option>
                  <option value="Master of Business Administration">Master of Business Administration (MBA)</option>
                  <option value="Doctor of Philosophy">Doctor of Philosophy (Ph.D.)</option>
                  <option value="Postgraduate Diploma">Postgraduate Diploma (PGD)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Department / Major <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  name="department"
                  className="form-input" 
                  placeholder="e.g. Computer Science & Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Issuing Institution</label>
                <input 
                  type="text" 
                  name="institution"
                  className="form-input" 
                  value={formData.institution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Graduation Year</label>
                <input 
                  type="text" 
                  name="passingYear"
                  className="form-input" 
                  value={formData.passingYear}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Issue Date</label>
                <input 
                  type="date" 
                  name="issueDate"
                  className="form-input" 
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CGPA / Final Grade</label>
                <input 
                  type="text" 
                  name="cgpa"
                  className="form-input" 
                  placeholder="e.g. 9.45 / 10.0"
                  value={formData.cgpa}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Certificate Classification</label>
                <select 
                  name="certificateType" 
                  className="form-input"
                  value={formData.certificateType}
                  onChange={handleChange}
                >
                  <option value="Degree Certificate (Honors)">Degree Certificate (Honors)</option>
                  <option value="Standard Degree Certificate">Standard Degree Certificate</option>
                  <option value="Master's Degree (Summa Cum Laude)">Master's Degree (Summa Cum Laude)</option>
                  <option value="Official Academic Transcript">Official Academic Transcript</option>
                  <option value="Merit & Excellence Certificate">Merit & Excellence Certificate</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Authorized Signatory / Registrar</label>
                <input 
                  type="text" 
                  name="signatoryAuthority"
                  className="form-input" 
                  value={formData.signatoryAuthority}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions-bar">
              <button 
                type="submit" 
                className="submit-crypto-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="spinner-icon" size={17} />
                    <span>Computing SHA-256 Digest...</span>
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    <span>Generate Cryptographic Proof</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="crypto-result-container">
          {cryptoResult ? (
            <div className="crypto-message-card">
              <div className="crypto-card-header">
                <div className="crypto-header-title">
                  <div className="crypto-pulse-dot"></div>
                  <h3>Cryptographic Proof & Block Receipt</h3>
                </div>
                <span className="crypto-badge-pill">SHA-256 Digest</span>
              </div>

              <div className="crypto-summary-alert">
                <CheckCircle size={16} className="text-emerald" />
                <span>Canonical payload digested into 256-bit cryptographic fingerprint.</span>
              </div>

              <div className="crypto-field-box">
                <span className="crypto-field-label">Assigned Certificate ID:</span>
                <div className="crypto-field-value mono-font">
                  {cryptoResult.id}
                </div>
              </div>

              <div className="crypto-field-box highlight-box">
                <div className="field-label-row">
                  <span className="crypto-field-label font-bold text-cyan">
                    SHA-256 Certificate Hash:
                  </span>
                  <button 
                    type="button" 
                    className="copy-btn"
                    onClick={() => handleCopy(cryptoResult.certificateHash, 'hash')}
                  >
                    {copiedHash ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                    <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="crypto-hash-box mono-font">
                  {cryptoResult.certificateHash}
                </div>
              </div>

              <div className="crypto-field-box">
                <span className="crypto-field-label">Previous Block Hash:</span>
                <div className="crypto-code-preview mono-font text-dim">
                  {cryptoResult.previousBlockHash}
                </div>
              </div>

              <div className="crypto-field-box">
                <div className="field-label-row">
                  <span className="crypto-field-label">Registrar Digital Signature (ECDSA):</span>
                  <button 
                    type="button" 
                    className="copy-btn"
                    onClick={() => handleCopy(cryptoResult.digitalSignature, 'sig')}
                  >
                    {copiedSignature ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                    <span>{copiedSignature ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="crypto-code-preview mono-font text-dim">
                  {cryptoResult.digitalSignature}
                </div>
              </div>

              <div className="crypto-telemetry-row">
                <div className="t-item">
                  <span className="t-label">Gas Used:</span>
                  <span className="t-val text-emerald font-semibold">0 Gwei (PoA)</span>
                </div>
                <div className="t-item">
                  <span className="t-label">Mining Nonce:</span>
                  <span className="t-val mono-font">{cryptoResult.nonce}</span>
                </div>
                <div className="t-item">
                  <span className="t-label">Consensus:</span>
                  <span className="t-val text-cyan">PoA Multi-Sig</span>
                </div>
              </div>

              {formSuccessMessage && (
                <div className="status-success-banner">
                  <CheckCircle size={15} className="text-emerald" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <div className="crypto-actions-grid">
                <button 
                  type="button" 
                  className="mine-block-btn"
                  onClick={handleSealToBlockchain}
                >
                  <Layers size={16} />
                  <span>Seal Directly to Blockchain</span>
                </button>
                <button 
                  type="button" 
                  className="pending-queue-btn"
                  onClick={handleAddToPending}
                >
                  <Clock size={16} />
                  <span>Queue for Multi-Sig</span>
                </button>
                <button 
                  type="button" 
                  className="preview-doc-btn"
                  onClick={() => onSelectCertificate(cryptoResult)}
                >
                  <Eye size={16} />
                  <span>Preview Official Certificate</span>
                </button>
              </div>

              <div className="canonical-toggle-bar">
                <button 
                  type="button"
                  className="text-toggle-btn"
                  onClick={() => setShowCanonicalJson(!showCanonicalJson)}
                >
                  {showCanonicalJson ? 'Hide Raw Canonical JSON' : 'Show Deterministic Canonical JSON Payload'}
                </button>
                {showCanonicalJson && (
                  <pre className="canonical-json-pre mono-font">
                    {cryptoResult.canonicalPayload}
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="crypto-placeholder-box">
              <div className="placeholder-icon-wrap">
                <Lock size={32} />
              </div>
              <h3>Live Cryptographic Proof Preview</h3>
              <p>
                Fill out the graduate's credentials and click <strong>"Generate Cryptographic Proof"</strong>. 
                The system will compute deterministic UTF-8 canonical SHA-256 digest and generate digital block receipts.
              </p>
              <div className="placeholder-feature-pills">
                <span className="p-pill">Deterministic UTF-8</span>
                <span className="p-pill">SHA-256 Integrity</span>
                <span className="p-pill">Zero Gas PoA</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
