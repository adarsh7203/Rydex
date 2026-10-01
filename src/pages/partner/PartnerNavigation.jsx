import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Navigation, Phone, MapPin, Clock, ChevronRight, Battery, CheckCircle } from 'lucide-react';
import './PartnerNavigation.css';

export default function PartnerNavigation() {
  const navigate = useNavigate();
  const { customer } = useApp();
  const [eta, setEta] = useState(240);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (eta <= 0) {
      setArrived(true);
      return;
    }
    const t = setInterval(() => setEta(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [eta]);

  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <Layout>
      <div className="pnav-container">
        <div className="pnav-grid">
          {/* Left Column: Live GPS Route Map & Destination Point */}
          <div className="pnav-left-col">
            <div className="pnav-map-card">
              <div className="pnav-map-badge">
                <div className="pnav-map-dot"></div>
                <span>NAVIGATING TO EV STANDSTILL</span>
              </div>

              <div className="pnav-eta-chip">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <div className="pnav-eta-time">{arrived ? '0:00' : fmt(eta)}</div>
                  <div className="pnav-eta-label">{arrived ? 'ARRIVED AT LOCATION' : 'ESTIMATED ARRIVAL'}</div>
                </div>
              </div>

              <div className="pnav-map-container">
                <iframe
                  title="nav-map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.9289%2C26.8367%2C80.9562%2C26.8621&layer=mapnik&marker=26.8467%2C80.9462"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>

            {/* Customer Details Row */}
            <div className="pnav-card">
              <div className="pnav-customer-row">
                <div className="pnav-customer-avatar">
                  {customer.name?.charAt(0) || 'R'}
                </div>
                <div className="pnav-customer-info">
                  <h4 className="pnav-customer-name">{customer.name || 'Ramesh Kumar'}</h4>
                  <p className="pnav-customer-phone">{customer.phone || '+91 98765 43210'}</p>
                  <div className="pnav-customer-loc">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{customer.location?.address || 'Hazratganj, Lucknow, UP'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Calling customer ${customer.name}...`)}
                  className="pnav-call-btn"
                  title="Call Customer"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Countdown & Handover Trigger */}
          <div className="pnav-right-col">
            <div className="pnav-countdown-card">
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#86EFAC', letterSpacing: '2px', textTransform: 'uppercase' }}>
                TIME REMAINING
              </span>
              <h2 className="pnav-countdown-val">{arrived ? '0:00' : fmt(eta)}</h2>
              <p style={{ fontSize: '13px', color: '#D1FAE5', margin: 0 }}>to target vehicle coordinates</p>

              <div className="pnav-speed-badges">
                <div className="pnav-speed-pill">
                  <p>1.2 km</p>
                  <p>Distance</p>
                </div>
                <div className="pnav-speed-pill">
                  <p>24 km/h</p>
                  <p>EV Speed</p>
                </div>
              </div>
            </div>

            {/* Battery Module Ready to Handover */}
            <div className="pnav-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Battery className="w-5 h-5 text-gray-700" />
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                  Module Ready in Dock
                </h4>
              </div>

              <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '14px', padding: '16px' }}>
                <p style={{ fontSize: '11px', color: '#166534', fontWeight: 700, margin: '0 0 2px 0' }}>BATTERY SERIAL</p>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#14532D', margin: '0 0 4px 0' }}>RX-104</h3>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#15803D', margin: 0 }}>
                  48V / 3.2 kWh · Slot B-101 (Charged 100%)
                </p>
              </div>
            </div>

            {/* Primary Action Button: Arrived at Location */}
            <button
              type="button"
              className="pnav-arrived-btn"
              onClick={() => navigate('/partner/otp')}
            >
              <CheckCircle className="w-5 h-5" />
              <span>I Have Arrived · Enter OTP</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
