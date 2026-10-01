import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, User, Truck, ChevronRight, Battery, Shield, Check } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setRole } = useApp();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      setRole(selectedRole);
      navigate(selectedRole === 'customer' ? '/customer/home' : '/partner/dashboard');
    }, 900);
  };

  return (
    <div className="login-shell">
      {/* ── Left Branding Panel ── */}
      <div className="login-brand">
        {/* Glow circles */}
        <div className="login-brand-glow-1"></div>
        <div className="login-brand-glow-2"></div>
        <div className="login-brand-glow-3"></div>

        {/* Top Logo */}
        <div className="login-brand-top">
          <div className="login-brand-logo">
            <div className="login-brand-logo-icon">
              <Zap className="w-7 h-7 text-green-300" fill="#86EFAC" />
            </div>
            <div className="login-brand-logo-text">
              <h1>RYDEX</h1>
              <p>Energy & Logistics</p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="login-brand-hero anim-fade-up">
          <h2 className="login-hero-headline">
            Power when you need it.<br />
            <span className="login-hero-gradient-text">Anywhere.</span>
          </h2>
          <p className="login-hero-sub">
            On-demand mobile battery swapping for commercial EV users. Don't take your EV to the battery — bring the battery to your EV.
          </p>
          <div className="login-hero-badges">
            <div className="login-badge-pill">
              <Battery className="w-4 h-4 text-green-300" />
              <span>Charge Less. Move More.</span>
            </div>
            <div className="login-badge-pill">
              <span>🌱 100% Green Energy</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="login-brand-stats">
          <div className="login-stat-card">
            <div className="login-stat-icon">⚡</div>
            <div className="login-stat-value">4 min</div>
            <div className="login-stat-label">Avg ETA</div>
          </div>
          <div className="login-stat-card">
            <div className="login-stat-icon">🚴</div>
            <div className="login-stat-value">120+</div>
            <div className="login-stat-label">Active Partners</div>
          </div>
          <div className="login-stat-card">
            <div className="login-stat-icon">🔋</div>
            <div className="login-stat-value">2,400+</div>
            <div className="login-stat-label">Swaps Done</div>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="login-form-panel">
        <div className="login-form-card anim-fade-up">
          <div className="login-form-header">
            <h2>Welcome back</h2>
            <p>Select your role to access the Rydex platform</p>
          </div>

          {/* Role selector */}
          <div className="login-role-selector">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`login-role-btn ${selectedRole === 'customer' ? 'active-customer' : ''}`}
            >
              {selectedRole === 'customer' && (
                <div className="login-role-badge" style={{ background: '#22C55E' }}>
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="login-role-emoji">🛺</div>
              <div>
                <div className="login-role-title">Customer</div>
                <div className="login-role-sub">Request battery swaps</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('partner')}
              className={`login-role-btn ${selectedRole === 'partner' ? 'active-partner' : ''}`}
            >
              {selectedRole === 'partner' && (
                <div className="login-role-badge" style={{ background: '#6366F1' }}>
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="login-role-emoji">🚴</div>
              <div>
                <div className="login-role-title">Delivery Partner</div>
                <div className="login-role-sub">Deliver batteries & earn</div>
              </div>
            </button>
          </div>

          {/* Inputs */}
          <div className="login-fields-group">
            <div className="login-field-item">
              <label className="login-field-label">Mobile Number</label>
              <input
                className="login-input-field"
                type="tel"
                placeholder="+91 98765 43210"
                defaultValue="+91 98765 43210"
              />
            </div>
            <div className="login-field-item">
              <label className="login-field-label">Password</label>
              <input
                className="login-input-field"
                type="password"
                placeholder="••••••••"
                defaultValue="demo1234"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            className="login-submit-btn"
            onClick={handleLogin}
            disabled={!selectedRole || loading}
          >
            {loading ? (
              <div className="loader" style={{ width: 22, height: 22, borderWidth: 3 }}></div>
            ) : (
              <>
                <span>
                  Continue as {selectedRole === 'customer' ? 'Customer' : selectedRole === 'partner' ? 'Delivery Partner' : '...'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Demo Note */}
          <div className="login-demo-box">
            <Shield className="w-5 h-5 login-demo-icon" />
            <div className="login-demo-content">
              <h4>Prototype Demo Mode</h4>
              <p>
                Select either <strong>Customer</strong> or <strong>Delivery Partner</strong> to begin. 
                Pre-filled credentials are ready. Delivery OTP: <span className="login-demo-otp">7842</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
