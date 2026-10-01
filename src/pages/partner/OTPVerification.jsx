import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Shield, CheckCircle, XCircle, RotateCcw, ChevronRight, ArrowLeft } from 'lucide-react';
import './OTPVerification.css';

const CORRECT_OTP = '7842';

export default function OTPVerification() {
  const navigate = useNavigate();
  const { setRequestStatus } = useApp();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [status, setStatus] = useState('idle'); // idle | success | error
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp];
    n[i] = v.slice(-1);
    setOtp(n);
    if (v && i < 3) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleVerify = () => {
    if (otp.join('') === CORRECT_OTP) {
      setStatus('success');
      setRequestStatus('otp_verified');
      setTimeout(() => navigate('/partner/exchange'), 1200);
    } else {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setOtp(['', '', '', '']);
        refs[0].current?.focus();
      }, 1500);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-glow-orb"></div>

      <div className="otp-container">
        <button
          type="button"
          onClick={() => navigate('/partner/navigation')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#86EFAC', background: 'transparent', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Navigation</span>
        </button>

        <div className="otp-card">
          {/* Status Icon */}
          <div className={`otp-icon-wrap ${status}`}>
            {status === 'success' ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : status === 'error' ? (
              <XCircle className="w-10 h-10 text-red-600" />
            ) : (
              <Shield className="w-10 h-10 text-green-600" />
            )}
          </div>

          <h2 className="otp-title">
            {status === 'success' ? 'OTP Verified! ✅' : status === 'error' ? 'Wrong OTP ❌' : 'Enter Delivery OTP'}
          </h2>
          <p className="otp-sub">
            {status === 'success'
              ? 'Security check passed. Opening exchange protocol...'
              : status === 'error'
              ? 'Security code incorrect. Please re-enter code.'
              : 'Ask customer Ramesh Kumar for his 4-digit Rydex security OTP'}
          </p>

          {/* OTP 4-Box Grid */}
          <div className="otp-boxes-grid">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={refs[i]}
                className={`otp-digit-input ${status === 'success' ? 'ok' : status === 'error' ? 'err' : ''}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                disabled={status !== 'idle'}
              />
            ))}
          </div>

          {/* Demo Mode Helper */}
          <div className="otp-demo-pill">
            <span>🧪 Demo OTP:</span>
            <span className="otp-demo-code">7842</span>
          </div>

          {status === 'idle' && (
            <button
              type="button"
              className="otp-submit-btn"
              onClick={handleVerify}
              disabled={otp.some(d => d === '')}
            >
              <Shield className="w-5 h-5" />
              <span>Verify OTP & Unlock Dock</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {status === 'success' && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="loader" style={{ width: '32px', height: '32px' }}></div>
            </div>
          )}

          {status === 'error' && (
            <button
              type="button"
              style={{
                width: '100%', padding: '12px', background: '#F8FAFC',
                border: '1.5px solid #E2E8F0', borderRadius: '12px',
                fontWeight: 700, color: '#334155', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
              onClick={() => {
                setStatus('idle');
                setOtp(['', '', '', '']);
              }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}

          <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '20px', marginBottom: 0 }}>
            🔒 Never exchange battery modules without verifying OTP
          </p>
        </div>
      </div>
    </div>
  );
}
