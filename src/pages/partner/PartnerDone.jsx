import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { CheckCircle, Home, TrendingUp, Battery } from 'lucide-react';
import './PartnerDone.css';

const updatedSlots = [
  { id: 'B-101', status: 'empty' },
  { id: 'B-102', status: 'full' },
  { id: 'B-103', status: 'empty' },
  { id: 'B-104', status: 'used' },
  { id: 'B-105', status: 'full' },
  { id: 'B-106', status: 'used' },
];

export default function PartnerDone() {
  const navigate = useNavigate();
  const { customer, partner } = useApp();

  return (
    <Layout>
      <div className="pdone-container">
        <div className="pdone-grid">
          {/* Left Column: Success Hero + Earnings Breakdown */}
          <div className="pdone-left-col">
            <div className="pdone-hero">
              <div className="pdone-hero-icon">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="pdone-hero-title">Battery Swap Completed! 🎉</h2>
              <p className="pdone-hero-sub">
                The driver has been powered up. Customer ride resumed safely.
              </p>
            </div>

            <div className="pdone-card">
              <h3 className="pdone-card-title">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Earnings & Payout Summary</span>
              </h3>

              <div className="pdone-earnings-grid">
                <div className="pdone-earning-tile" style={{ background: '#ECFDF5' }}>
                  <div className="pdone-earning-emoji">💰</div>
                  <h4 className="pdone-earning-val" style={{ color: '#16A34A' }}>₹89.00</h4>
                  <p className="pdone-earning-lbl">Credited for This Swap</p>
                </div>

                <div className="pdone-earning-tile" style={{ background: '#EEF2FF' }}>
                  <div className="pdone-earning-emoji">📈</div>
                  <h4 className="pdone-earning-val" style={{ color: '#4F46E5' }}>₹1,329</h4>
                  <p className="pdone-earning-lbl">Today's Net Total</p>
                </div>

                <div className="pdone-earning-tile" style={{ background: '#FFFBEB' }}>
                  <div className="pdone-earning-emoji">🎯</div>
                  <h4 className="pdone-earning-val" style={{ color: '#D97706' }}>7</h4>
                  <p className="pdone-earning-lbl">Completed Today</p>
                </div>
              </div>

              <div className="pdone-summary-list">
                <div className="pdone-summary-row">
                  <span>Order Reference</span>
                  <span style={{ fontFamily: 'monospace' }}>{customer.requestId || 'RYD-2024-00142'}</span>
                </div>
                <div className="pdone-summary-row">
                  <span>Customer Name</span>
                  <span>{customer.name || 'Ramesh Kumar'}</span>
                </div>
                <div className="pdone-summary-row">
                  <span>Delivered Module</span>
                  <span style={{ color: '#16A34A' }}>RX-104 (48V / 3.2 kWh)</span>
                </div>
                <div className="pdone-summary-row">
                  <span>Recovered Module</span>
                  <span style={{ color: '#D97706' }}>RX-088 (Stored in B-106)</span>
                </div>
                <div className="pdone-summary-row">
                  <span>Customer Satisfaction</span>
                  <span>⭐⭐⭐⭐⭐ 5.0 Rated</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="pdone-dashboard-btn"
              onClick={() => navigate('/partner/dashboard')}
            >
              <Home className="w-5 h-5" />
              <span>Return to Partner Dashboard</span>
            </button>
          </div>

          {/* Right Column: Updated Dock Status & Sector Performance */}
          <div className="pdone-right-col">
            <div className="pdone-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Battery className="w-5 h-5 text-gray-700" />
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Updated Dock Slots
                  </h4>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                  2/6 Charged
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {updatedSlots.map(slot => (
                  <div
                    key={slot.id}
                    style={{
                      borderRadius: '10px', padding: '10px 6px', textAlign: 'center',
                      background: slot.status === 'full' ? '#ECFDF5' : slot.status === 'empty' ? '#F8FAFC' : '#FFFBEB',
                      border: `1.5px solid ${slot.status === 'full' ? '#86EFAC' : slot.status === 'empty' ? '#E2E8F0' : '#FCD34D'}`
                    }}
                  >
                    <p style={{ fontSize: '10px', fontWeight: 800, margin: '0 0 2px 0' }}>{slot.id}</p>
                    <p style={{ fontSize: '16px', margin: '0 0 2px 0' }}>
                      {slot.status === 'full' ? '⚡' : slot.status === 'empty' ? '○' : '↩'}
                    </p>
                    <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'capitalize', margin: 0, color: '#64748B' }}>
                      {slot.status}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '12px' }}>
                <p style={{ fontSize: '11px', color: '#92400E', fontWeight: 600, margin: 0 }}>
                  🔋 Spent battery <strong>RX-088</strong> is safely locked in Slot B-106. Deposit at charging hub when convenient.
                </p>
              </div>
            </div>

            <div className="pdone-card">
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                Driver Performance Record
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '10px' }}>
                  <span style={{ color: '#64748B' }}>Trip Time</span>
                  <span style={{ fontWeight: 800 }}>3.4 minutes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '10px' }}>
                  <span style={{ color: '#64748B' }}>Customer Feedback</span>
                  <span style={{ fontWeight: 800, color: '#16A34A' }}>"Very fast service!"</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '10px' }}>
                  <span style={{ color: '#64748B' }}>Safety Score</span>
                  <span style={{ fontWeight: 800, color: '#2563EB' }}>100 / 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
