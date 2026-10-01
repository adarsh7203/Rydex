import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import {
  Zap, MapPin, CheckCircle, Shield, Battery,
  Clock, X, Radio, AlertCircle, ArrowRight
} from 'lucide-react';
import './FindingPartner.css';

export default function FindingPartner() {
  const navigate = useNavigate();
  const { setRequestStatus, customer } = useApp();
  const [stage, setStage] = useState(0);

  const stages = [
    { title: 'Scanning nearby partners in sector', desc: '14 active mobile battery carriers in 2.5 km radius' },
    { title: 'Verifying battery hardware compatibility', desc: '48V / 3.2 kWh Type A mount confirmed with runner stock' },
    { title: 'Partner matched & request accepted', desc: 'Aakash Verma (UP-32-BK-7721) is en route to your location' }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1600);
    const t2 = setTimeout(() => setStage(2), 3400);
    const t3 = setTimeout(() => {
      setRequestStatus('matched');
      navigate('/customer/tracking');
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate, setRequestStatus]);

  const handleCancel = () => {
    setRequestStatus('idle');
    navigate('/customer/request');
  };

  return (
    <Layout>
      <div className="fp-container">
        {/* Header Strip */}
        <div className="fp-header">
          <div className="fp-header-left">
            <div className="fp-live-pill">
              <span className="fp-live-dot"></span>
              <span>LIVE DISPATCH ACTIVE</span>
            </div>
            <h2>Searching Nearby Battery Swappers</h2>
            <p>Our intelligent dispatch network is finding the closest mobile runner with matching battery specs</p>
          </div>
          <button type="button" onClick={handleCancel} className="fp-cancel-btn">
            <X className="w-4 h-4" />
            <span>Cancel Request</span>
          </button>
        </div>

        {/* 2-Column Main Grid */}
        <div className="fp-grid">
          {/* Left Column: Sonar Radar & Stage Progress */}
          <div className="fp-main-card">
            {/* Radar Scope */}
            <div className="fp-radar-wrapper">
              <div className="fp-radar-scope">
                {/* Distance rings */}
                <div className="fp-ring fp-ring-1">
                  <span className="fp-ring-label">500m</span>
                </div>
                <div className="fp-ring fp-ring-2">
                  <span className="fp-ring-label">1.2km</span>
                </div>
                <div className="fp-ring fp-ring-3">
                  <span className="fp-ring-label">2.0km</span>
                </div>

                {/* Crosshairs */}
                <div className="fp-crosshair-h"></div>
                <div className="fp-crosshair-v"></div>

                {/* Rotating Sonar Beam */}
                <div className="fp-sonar-beam"></div>

                {/* Central Beacon (Customer) */}
                <div className="fp-center-beacon">
                  <div className="fp-beacon-pulse"></div>
                  <div className="fp-beacon-dot">
                    <Zap className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <span className="fp-beacon-tooltip">You (Treo EV)</span>
                </div>

                {/* Runner Blips on Radar */}
                <div className="fp-blip fp-blip-1" title="Runner nearby · 0.8 km">
                  <span className="fp-blip-dot"></span>
                </div>
                <div
                  className={`fp-blip fp-blip-matched ${stage >= 2 ? 'locked' : ''}`}
                  title="Aakash Verma · 1.2 km"
                >
                  <span className="fp-blip-dot"></span>
                  {stage >= 2 && <span className="fp-blip-lock-ring"></span>}
                  <span className="fp-blip-tag">
                    {stage >= 2 ? '✓ Aakash Verma (Matched)' : 'Runner #902'}
                  </span>
                </div>
                <div className="fp-blip fp-blip-3" title="Runner nearby · 1.9 km">
                  <span className="fp-blip-dot"></span>
                </div>
              </div>
            </div>

            {/* Status Headline */}
            <div className="fp-status-box">
              <h3>{stage < 2 ? 'Scanning Proximity Network...' : '🎉 Partner Matched & Confirmed!'}</h3>
              <p>{stages[stage].desc}</p>
            </div>

            {/* Progression Checklist */}
            <div className="fp-stages-list">
              {stages.map((st, i) => (
                <div
                  key={i}
                  className={`fp-stage-item ${i < stage ? 'done' : i === stage ? 'active' : 'pending'}`}
                >
                  <div className="fp-stage-indicator">
                    {i < stage ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : i === stage ? (
                      <div className="fp-spinner"></div>
                    ) : (
                      <div className="fp-stage-dot"></div>
                    )}
                  </div>
                  <div className="fp-stage-text">
                    <h5>{st.title}</h5>
                    <p>{st.desc}</p>
                  </div>
                  {i === stage && (
                    <span className="fp-active-pill">Processing</span>
                  )}
                </div>
              ))}
            </div>

            {/* Matched Partner Card (Reveals in Stage 2) */}
            {stage >= 2 && (
              <div className="fp-matched-card anim-slide-up">
                <div className="fp-matched-avatar">A</div>
                <div className="fp-matched-info">
                  <div className="fp-matched-name-row">
                    <h4>Aakash Verma</h4>
                    <span className="fp-matched-badge">Verified Partner</span>
                  </div>
                  <p className="fp-matched-sub">
                    TVS iQube EV Carrier · 1.2 km away · Estimated Arrival in ~4 mins
                  </p>
                </div>
                <div className="fp-matched-redirect">
                  <span>Redirecting to Live GPS Tracking</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Details & Guarantees */}
          <div className="fp-side-col">
            {/* Request Summary Card */}
            <div className="fp-side-card">
              <h4 className="fp-side-title">Current Swap Request</h4>

              <div className="fp-detail-row">
                <span className="fp-detail-label">Vehicle</span>
                <span className="fp-detail-val">Mahindra Treo (UP-32-ER-4491)</span>
              </div>

              <div className="fp-detail-row">
                <span className="fp-detail-label">Battery Pack</span>
                <span className="fp-detail-val">48V / 3.2 kWh (Type A Mount)</span>
              </div>

              <div className="fp-detail-row">
                <span className="fp-detail-label">Pickup Location</span>
                <span className="fp-detail-val">Hazratganj Main Market, Lucknow</span>
              </div>

              <div className="fp-detail-divider"></div>

              <div className="fp-detail-total">
                <span>Estimated Swap Fee</span>
                <span className="fp-total-price">₹149.00</span>
              </div>
            </div>

            {/* Fleet Telemetry Stats */}
            <div className="fp-side-card">
              <h4 className="fp-side-title">Sector Telemetry</h4>
              <div className="fp-telemetry-list">
                <div className="fp-telemetry-item">
                  <Clock className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="fp-tel-val">&lt; 45 Seconds</p>
                    <p className="fp-tel-lbl">Average Match Time</p>
                  </div>
                </div>

                <div className="fp-telemetry-item">
                  <Radio className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="fp-tel-val">14 Mobile Runners</p>
                    <p className="fp-tel-lbl">Active in Central Lucknow</p>
                  </div>
                </div>

                <div className="fp-telemetry-item">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="fp-tel-val">100% Tested Stock</p>
                    <p className="fp-tel-lbl">Certified Grade-A High SoC Cells</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Guarantee */}
            <div className="fp-guarantee-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Shield className="w-4 h-4 text-green-700" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>Rydex Handshake Protection</span>
              </div>
              <p style={{ fontSize: '12px', color: '#15803D', margin: 0, lineHeight: 1.4 }}>
                Your battery swap is secured by a 4-digit verification code. Never share your code until the physical battery is handed over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
