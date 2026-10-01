import { useState } from 'react';
import Layout from '../../components/Layout';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Bell, Check, PhoneCall } from 'lucide-react';
import './CustomerSettings.css';

export default function CustomerSettings() {
  const { customer } = useApp();
  const [saved, setSaved] = useState(false);
  const [sms, setSms] = useState(true);
  const [gps, setGps] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout>
      <div className="cset-container">
        {/* Header */}
        <div className="cset-header">
          <h2>Account & Vehicle Settings</h2>
          <p>Configure your commercial EV profile, battery specifications, and notifications</p>
        </div>

        {/* Driver & Vehicle Card */}
        <div className="cset-card">
          <h3 className="cset-card-title">Driver & Vehicle Profile</h3>
          <p className="cset-card-subtitle">Information used for battery compatibility and partner dispatches</p>

          <div className="cset-form-grid">
            <div className="cset-field">
              <label className="cset-label">Driver Full Name</label>
              <input className="cset-input" defaultValue={customer.name} />
            </div>

            <div className="cset-field">
              <label className="cset-label">Registered Mobile Number</label>
              <input className="cset-input" defaultValue="+91 98765 43210" />
            </div>

            <div className="cset-field">
              <label className="cset-label">Vehicle Model & Make</label>
              <input className="cset-input" defaultValue="Mahindra Treo E-Rickshaw" />
            </div>

            <div className="cset-field">
              <label className="cset-label">Vehicle Registration Number</label>
              <input className="cset-input" defaultValue="UP-32-ER-4491" />
            </div>

            <div className="cset-field">
              <label className="cset-label">Operating City</label>
              <input className="cset-input" defaultValue="Lucknow, Uttar Pradesh" />
            </div>

            <div className="cset-field">
              <label className="cset-label">Preferred Battery Mount</label>
              <input className="cset-input" defaultValue="Type A (Vertical Top Handle)" />
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="cset-card">
          <h3 className="cset-card-title">Alerts & Dispatch Permissions</h3>
          <p className="cset-card-subtitle">Control how you receive delivery updates and ETA announcements</p>

          <div className="cset-toggle-list">

            <div className="cset-toggle-row">
              <div className="cset-toggle-info">
                <h5>SMS OTP Dispatch Alert</h5>
                <p>Send backup 4-digit security OTP to your phone via SMS</p>
              </div>
              <div
                className="cset-switch"
                style={{ background: sms ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setSms(!sms)}
              >
                <div
                  className="cset-switch-thumb"
                  style={{ transform: sms ? 'translateX(20px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>

            <div className="cset-toggle-row">
              <div className="cset-toggle-info">
                <h5>Auto-GPS Standstill Verification</h5>
                <p>Allow nearest Rydex partners to pinpoint your parked EV automatically</p>
              </div>
              <div
                className="cset-switch"
                style={{ background: gps ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setGps(!gps)}
              >
                <div
                  className="cset-switch-thumb"
                  style={{ transform: gps ? 'translateX(20px)' : 'translateX(0px)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Support Card */}
        <div className="cset-card" style={{ background: '#F8FAFC' }}>
          <div className="cset-support-row">
            <div>
              <h3 className="cset-card-title">24x7 Driver Emergency Helpline</h3>
              <p className="cset-card-subtitle" style={{ margin: 0 }}>
                In case of battery failure, faulty socket, or urgent roadside assistance
              </p>
            </div>
            <button
              type="button"
              className="cset-support-btn"
              onClick={() => alert('Dialing Rydex Emergency Helpline: 1800-RYDEX-EV (1800-793-3938)...')}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline</span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="cset-save-row">
          <button type="button" className="cset-save-btn" onClick={handleSave}>
            {saved ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check className="w-5 h-5" /> Preferences Saved!
              </span>
            ) : (
              'Save Preferences'
            )}
          </button>
          {saved && (
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#16A34A' }}>
              ✓ All changes successfully saved!
            </span>
          )}
        </div>
      </div>
    </Layout>
  );
}
