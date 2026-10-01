import { useState } from 'react';
import Layout from '../../components/Layout';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Bell, Check, PhoneCall, CreditCard, Truck } from 'lucide-react';
import './PartnerSettings.css';

export default function PartnerSettings() {
  const { partner } = useApp();
  const [saved, setSaved] = useState(false);
  const [autoAccept, setAutoAccept] = useState(true);
  const [chime, setChime] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [highGps, setHighGps] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout>
      <div className="pset-container">
        {/* Header */}
        <div className="pset-header">
          <h2>Partner Profile & Shift Settings</h2>
          <p>Manage your dispatch preferences, carrier vehicle specs, and weekly payout account</p>
        </div>

        {/* Profile Card */}
        <div className="pset-card">
          <h3 className="pset-card-title">Delivery Partner & Vehicle Record</h3>
          <p className="pset-card-subtitle">Official verified details registered with Rydex Fleet Operations</p>

          <div className="pset-form-grid">
            <div className="pset-field">
              <label className="pset-label">Partner Full Name</label>
              <input className="pset-input" defaultValue={partner.name || 'Aakash Verma'} />
            </div>

            <div className="pset-field">
              <label className="pset-label">Partner ID (Fleet Badge)</label>
              <input className="pset-input" defaultValue={partner.partnerId || 'RX-P9021'} disabled />
            </div>

            <div className="pset-field">
              <label className="pset-label">Registered Mobile Number</label>
              <input className="pset-input" defaultValue="+91 98112 34567" />
            </div>

            <div className="pset-field">
              <label className="pset-label">Delivery Vehicle & Model</label>
              <input className="pset-input" defaultValue="TVS iQube EV / Dual Dock Carrier" />
            </div>

            <div className="pset-field">
              <label className="pset-label">Vehicle Registration Number</label>
              <input className="pset-input" defaultValue={partner.vehicleId || 'UP-32-BK-7721'} />
            </div>

            <div className="pset-field">
              <label className="pset-label">Primary Sector & Charging Hub</label>
              <input className="pset-input" defaultValue="Aminabad Hub #4, Lucknow Central" />
            </div>
          </div>
        </div>

        {/* Dispatch & Shift Preferences */}
        <div className="pset-card">
          <h3 className="pset-card-title">Dispatch & Notification Controls</h3>
          <p className="pset-card-subtitle">Customize how nearby swap orders are routed to your device</p>

          <div className="pset-toggle-list">
            <div className="pset-toggle-row">
              <div className="pset-toggle-info">
                <h5>Auto-Priority for Orders Under 1.5 km</h5>
                <p>Prioritize immediate dispatch for battery swaps located within your immediate vicinity</p>
              </div>
              <div
                className="pset-switch"
                style={{ background: autoAccept ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setAutoAccept(!autoAccept)}
              >
                <div
                  className="pset-switch-thumb"
                  style={{ transform: autoAccept ? 'translateX(22px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>

            <div className="pset-toggle-row">
              <div className="pset-toggle-info">
                <h5>Loud Audio Chime on New Request</h5>
                <p>Play high-volume audible chime when a new request arrives even if phone is on vibrate</p>
              </div>
              <div
                className="pset-switch"
                style={{ background: chime ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setChime(!chime)}
              >
                <div
                  className="pset-switch-thumb"
                  style={{ transform: chime ? 'translateX(22px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>

            <div className="pset-toggle-row">
              <div className="pset-toggle-info">
                <h5>Night Shift Dispatch Surge (10 PM - 6 AM)</h5>
                <p>Opt-in for late-night commercial driver swaps with +₹40 night incentive per delivery</p>
              </div>
              <div
                className="pset-switch"
                style={{ background: nightMode ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setNightMode(!nightMode)}
              >
                <div
                  className="pset-switch-thumb"
                  style={{ transform: nightMode ? 'translateX(22px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>

            <div className="pset-toggle-row">
              <div className="pset-toggle-info">
                <h5>High-Frequency GPS Polling</h5>
                <p>Transmit driver position every 2 seconds for high-precision customer tracking</p>
              </div>
              <div
                className="pset-switch"
                style={{ background: highGps ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setHighGps(!highGps)}
              >
                <div
                  className="pset-switch-thumb"
                  style={{ transform: highGps ? 'translateX(22px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank & Payout Details */}
        <div className="pset-card">
          <h3 className="pset-card-title">Earnings Settlement & Bank Account</h3>
          <p className="pset-card-subtitle">Daily and weekly payouts are automatically transferred to this verified account</p>

          <div className="pset-form-grid">
            <div className="pset-field">
              <label className="pset-label">Primary Settlement UPI ID</label>
              <input className="pset-input" defaultValue="aakash.verma@oksbi" />
            </div>

            <div className="pset-field">
              <label className="pset-label">Bank Name</label>
              <input className="pset-input" defaultValue="State Bank of India (Hazratganj Branch)" />
            </div>

            <div className="pset-field">
              <label className="pset-label">Account Number</label>
              <input className="pset-input" defaultValue="XXXX-XXXX-4912" disabled />
            </div>

            <div className="pset-field">
              <label className="pset-label">IFSC Code</label>
              <input className="pset-input" defaultValue="SBIN0001234" disabled />
            </div>
          </div>
        </div>

        {/* Support & Hotline */}
        <div className="pset-card" style={{ background: '#F8FAFC' }}>
          <div className="pset-support-row">
            <div>
              <h3 className="pset-card-title">24x7 Partner Operations Support Desk</h3>
              <p className="pset-card-subtitle" style={{ margin: 0 }}>
                Direct support for battery dock malfunction, locked bay, or customer dispute
              </p>
            </div>
            <button
              type="button"
              className="pset-support-btn"
              onClick={() => alert('Connecting to Rydex Partner Dispatch Desk: 1800-RYDEX-PARTNER...')}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Fleet Desk</span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="pset-save-row">
          <button type="button" className="pset-save-btn" onClick={handleSave}>
            {saved ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check className="w-5 h-5" /> Settings Saved!
              </span>
            ) : (
              'Save Partner Preferences'
            )}
          </button>
          {saved && (
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#16A34A' }}>
              ✓ Partner dispatch preferences updated!
            </span>
          )}
        </div>
      </div>
    </Layout>
  );
}
