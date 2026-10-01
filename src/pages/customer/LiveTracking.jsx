import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MapPin, Phone, Star, Clock, Battery, Shield, ChevronRight, CreditCard, Check } from 'lucide-react';
import './LiveTracking.css';

const STATUS_STEPS = [
  { key: 'accepted', label: 'Request Accepted', desc: 'Partner confirmed your battery request' },
  { key: 'assigned', label: 'Partner Dispatched', desc: 'Aakash Verma has picked up your battery' },
  { key: 'on_the_way', label: 'Partner On The Way', desc: 'Driver is moving towards you · ETA 4 min' },
  { key: 'exchange', label: 'Battery Exchange', desc: 'Hand over OTP & swap battery' },
  { key: 'completed', label: 'Swap Completed', desc: 'Fully verified & ride resumed' },
];
const CURRENT_STEP = 2;

export default function LiveTracking() {
  const navigate = useNavigate();
  const { partner, customer } = useApp();

  return (
    <Layout>
      <div className="lt-grid">
        {/* Left Column: Map + Partner Profile + Pay Banner */}
        <div className="lt-left">
          {/* Live Map Card */}
          <div className="lt-map-card">
            <div className="lt-map-badge">
              <div className="lt-map-dot"></div>
              <span>LIVE GPS TRACKING</span>
            </div>

            <div className="lt-map-eta-chip">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="lt-eta-time">~4 Minutes</div>
                <div className="lt-eta-label">Partner Arrival Time</div>
              </div>
            </div>

            <div className="lt-map-container">
              <iframe
                title="tracking-map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.9289%2C26.8367%2C80.9562%2C26.8567&layer=mapnik&marker=26.8467%2C80.9462"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>

          {/* Partner Details Card */}
          <div className="lt-card">
            <div className="lt-partner-header">
              <h3>Your Delivery Partner</h3>
              <div className="lt-partner-status-pill">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></span>
                <span>En Route (1.2 km away)</span>
              </div>
            </div>

            <div className="lt-partner-main">
              <div className="lt-partner-avatar">A</div>
              <div className="lt-partner-info">
                <h4 className="lt-partner-name">{partner.name || 'Aakash Verma'}</h4>
                <div className="lt-partner-rating">
                  <Star className="w-4 h-4 text-amber-400" fill="#FBBF24" />
                  <span>{partner.rating || '4.8'} rating · {partner.totalSwaps || '247'} successful swaps</span>
                </div>
                <span className="lt-partner-vehicle">{partner.vehicleId || 'EV Delivery Bike · UP-32-BK-7721'}</span>
              </div>
              <div className="lt-partner-actions">
                <button
                  type="button"
                  onClick={() => alert(`Calling partner ${partner.name}...`)}
                  className="lt-call-btn"
                  title="Call Partner"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Partner Stat Boxes */}
            <div className="lt-partner-stats-grid">
              <div className="lt-stat-box eta">
                <Clock className="w-5 h-5 mx-auto text-green-600" />
                <div className="lt-stat-val">{partner.eta || '4 min'}</div>
                <div className="lt-stat-label">Estimated Time</div>
              </div>
              <div className="lt-stat-box dist">
                <MapPin className="w-5 h-5 mx-auto text-blue-600" />
                <div className="lt-stat-val">{partner.distance || '1.2 km'}</div>
                <div className="lt-stat-label">Distance Away</div>
              </div>
              <div className="lt-stat-box batt">
                <Battery className="w-5 h-5 mx-auto text-purple-600" />
                <div className="lt-stat-val">{partner.batteryId || 'RX-104'}</div>
                <div className="lt-stat-label">Battery Serial</div>
              </div>
            </div>
          </div>

          {/* Quick Pay Action Banner */}
          <div className="lt-pay-banner">
            <div className="lt-pay-info">
              <h4>Ready to Complete Payment?</h4>
              <p>Pay now or once the delivery partner inspects your discharged module.</p>
            </div>
            <button
              type="button"
              className="lt-pay-btn"
              onClick={() => navigate('/customer/payment')}
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay ₹149</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Status Tracker + OTP Display */}
        <div className="lt-right">
          {/* Delivery OTP Security Card */}
          <div className="lt-otp-box-card">
            <div className="lt-otp-header">
              <div className="lt-otp-icon-wrap">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4>Your Delivery OTP</h4>
                <p>Share this 4-digit code with Aakash upon arrival</p>
              </div>
            </div>

            <div className="lt-otp-numbers-row">
              {(customer.otp || '7842').split('').map((digit, i) => (
                <div key={i} className="lt-otp-digit">
                  {digit}
                </div>
              ))}
            </div>

            <p className="lt-otp-security-note">
              🔒 Battery will only be mounted after OTP verification
            </p>
          </div>

          {/* Timeline Status */}
          <div className="lt-card">
            <h4 className="lt-timeline-title">Delivery Status</h4>
            <div className="lt-timeline">
              {STATUS_STEPS.map((step, i) => {
                const isDone = i < CURRENT_STEP;
                const isActive = i === CURRENT_STEP;
                return (
                  <div key={step.key} className="lt-timeline-item">
                    <div className="lt-timeline-indicator">
                      <div
                        className={`lt-timeline-circle ${
                          isDone ? 'done' : isActive ? 'active' : 'pending'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4" />
                        ) : isActive ? (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }}></div>
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 700 }}>{i + 1}</span>
                        )}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`lt-timeline-line ${isDone ? 'done' : 'pending'}`}></div>
                      )}
                    </div>

                    <div className="lt-timeline-text">
                      <p className={`lt-timeline-step-name ${!isDone && !isActive ? 'inactive' : ''}`}>
                        {step.label}
                      </p>
                      <p className={`lt-timeline-step-desc ${isActive ? 'highlight' : ''}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Order Reference */}
          <div className="lt-req-info-card">
            <div>
              <p className="lt-req-label">Active Request ID</p>
              <p className="lt-req-id">{customer.requestId || 'RYD-2024-00142'}</p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#16A34A', background: '#F0FDF4', padding: '4px 10px', borderRadius: '6px' }}>
              Active
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
