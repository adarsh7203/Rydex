import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MapPin, Clock, CheckCircle, XCircle, ChevronRight, Battery, User, ShieldCheck } from 'lucide-react';
import './PartnerRequest.css';

export default function PartnerRequest() {
  const navigate = useNavigate();
  const { customer, partner } = useApp();
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', background: 'white', padding: '32px', borderRadius: '20px', maxWidth: '360px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
          <div style={{ width: '60px', height: '60px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <XCircle className="w-8 h-8" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>Request Declined</h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px 0' }}>Request has been redirected to another standby partner.</p>
          <button
            type="button"
            style={{ width: '100%', padding: '12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/partner/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="preq-container">
        {/* Header Action Bar */}
        <div className="preq-header">
          <div className="preq-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                ASSIGNMENT PENDING
              </span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>Order Ref: {customer.requestId || 'RYD-2024-00142'}</span>
            </div>
            <h2>Review Order Details</h2>
            <p>Please check customer destination and battery compatibility before accepting</p>
          </div>

          <div className="preq-btn-group">
            <button
              type="button"
              className="preq-decline-btn"
              onClick={() => setDeclined(true)}
            >
              <XCircle className="w-4 h-4" />
              <span>Decline</span>
            </button>
            <button
              type="button"
              className="preq-accept-btn"
              onClick={() => navigate('/partner/navigation')}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Accept & Start GPS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="preq-grid">
          {/* Main Column */}
          <div className="preq-main-col">
            {/* Customer Details Card */}
            <div className="preq-card">
              <h3 className="preq-card-title">
                <User className="w-5 h-5 text-gray-700" />
                <span>Customer Profile</span>
              </h3>

              <div className="preq-customer-info">
                <div className="preq-customer-avatar">
                  {customer.name?.charAt(0) || 'R'}
                </div>
                <div className="preq-customer-details">
                  <h4>{customer.name || 'Ramesh Kumar'}</h4>
                  <p>{customer.phone || '+91 98765 43210'} · Commercial Driver</p>
                </div>
              </div>

              <div className="preq-travel-stats">
                <div className="preq-stat-tile">
                  <div className="preq-stat-top">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Estimated Drive</span>
                  </div>
                  <p className="preq-stat-val">~4 Minutes</p>
                </div>

                <div className="preq-stat-tile">
                  <div className="preq-stat-top">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Radial Distance</span>
                  </div>
                  <p className="preq-stat-val">1.2 km away</p>
                </div>
              </div>
            </div>

            {/* Battery Requirement Card */}
            <div className="preq-card">
              <h3 className="preq-card-title">
                <Battery className="w-5 h-5 text-gray-700" />
                <span>Required Battery Module</span>
              </h3>

              <div className="preq-specs-list">
                <div className="preq-spec-row">
                  <span>🛺</span>
                  <p>Vehicle Type</p>
                  <p>{customer.vehicleType || 'EV 3-Wheeler (E-Rickshaw)'}</p>
                </div>
                <div className="preq-spec-row">
                  <span>⚡</span>
                  <p>Voltage</p>
                  <p>{customer.batteryVoltage || '48V'}</p>
                </div>
                <div className="preq-spec-row">
                  <span>🔋</span>
                  <p>Capacity</p>
                  <p>{customer.batteryCapacity || '3.2 kWh (LFP)'}</p>
                </div>
                <div className="preq-spec-row">
                  <span>📐</span>
                  <p>Form Factor</p>
                  <p>{customer.batteryShape || 'Type A (Vertical Locking)'}</p>
                </div>
              </div>
            </div>

            {/* Compatibility Confirmation */}
            <div className="preq-compat-box">
              <h4 className="preq-compat-title">
                <ShieldCheck className="w-5 h-5 text-green-700" />
                <span>100% Hardware Compatibility Verified</span>
              </h4>
              <p className="preq-compat-text">
                Your onboard module <strong>RX-104</strong> in <strong>Slot B-101</strong> matches all electrical and mechanical specifications of this vehicle.
              </p>
            </div>
          </div>

          {/* Side Column: Destination Map & Location */}
          <div className="preq-side-col">
            <div className="preq-card">
              <h3 className="preq-card-title">
                <MapPin className="w-5 h-5 text-gray-700" />
                <span>Destination Point</span>
              </h3>

              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
                <iframe
                  title="dest-map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.9362%2C26.8367%2C80.9562%2C26.8567&layer=mapnik&marker=26.8467%2C80.9462"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, margin: '0 0 2px 0' }}>CURRENT EV STANDSTILL</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                  {customer.location?.address || 'Hazratganj, Lucknow, UP'}
                </p>
                <p style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600, margin: 0 }}>
                  📍 Parked near Metro Gate #2
                </p>
              </div>
            </div>

            <div className="preq-card" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#166534', fontWeight: 700 }}>Estimated Payout</span>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#14532D' }}>₹89.00</span>
              </div>
              <p style={{ fontSize: '11px', color: '#15803D', margin: 0 }}>
                Credited directly to your Rydex partner wallet immediately upon completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
