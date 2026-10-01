import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { ChevronLeft, CheckCircle, ArrowRightLeft, ChevronRight, Check } from 'lucide-react';
import './BatteryExchange.css';

export default function BatteryExchange() {
  const navigate = useNavigate();
  const { customer, partner } = useApp();
  const [step, setStep] = useState(1);
  const [given, setGiven] = useState(false);
  const [collected, setCollected] = useState(false);

  return (
    <Layout>
      <div className="bex-container">
        {/* Steps header */}
        <div className="bex-stepper-header">
          <button
            type="button"
            onClick={() => navigate('/partner/otp')}
            className="bex-back-btn"
            title="Back to OTP"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="bex-stepper-content">
            <div className="bex-stepper-meta">
              <span className="bex-stepper-title">
                Step {step} of 3 — {['', 'Verify Hardware Compatibility', 'Perform Physical Swap', 'Confirmation & Receipt'][step]}
              </span>
              <span className="bex-otp-verified-badge">OTP Verified ✅</span>
            </div>
            <div className="bex-step-bars">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`bex-step-bar ${i < step ? 'done' : i === step ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="bex-grid">
          {/* Main Action Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Step 1: Verification */}
            {step >= 1 && (
              <div className="bex-card">
                <div className="bex-step-title-row">
                  <div className="bex-step-number">1</div>
                  <h3 className="bex-step-title">Hardware Compatibility Check</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" style={{ marginLeft: 'auto' }} />
                </div>

                <div className="bex-compare-grid">
                  <div className="bex-compare-box needed">
                    <p className="bex-compare-label needed">Customer EV Specs</p>
                    <div className="bex-spec-item">
                      <span>Voltage</span>
                      <span>{customer.batteryVoltage || '48V'}</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Capacity</span>
                      <span>{customer.batteryCapacity || '3.2 kWh'}</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Chemistry</span>
                      <span>{customer.batteryType || 'LFP'}</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Mount Shape</span>
                      <span>{customer.batteryShape || 'Type A'}</span>
                    </div>
                  </div>

                  <div className="bex-compare-box have">
                    <p className="bex-compare-label have">Dock Module (RX-104)</p>
                    <div className="bex-spec-item">
                      <span>Voltage</span>
                      <span style={{ color: '#15803D' }}>{customer.batteryVoltage || '48V'} ✓</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Capacity</span>
                      <span style={{ color: '#15803D' }}>{customer.batteryCapacity || '3.2 kWh'} ✓</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Chemistry</span>
                      <span style={{ color: '#15803D' }}>{customer.batteryType || 'LFP'} ✓</span>
                    </div>
                    <div className="bex-spec-item">
                      <span>Mount Shape</span>
                      <span style={{ color: '#15803D' }}>{customer.batteryShape || 'Type A'} ✓</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#14532D', fontSize: '13px', fontWeight: 700, marginBottom: step === 1 ? '16px' : 0 }}>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>PERFECT HARDWARE MATCH — Approved for unmounting and installation</span>
                </div>

                {step === 1 && (
                  <button
                    type="button"
                    className="bex-proceed-btn"
                    onClick={() => setStep(2)}
                  >
                    <span>Proceed to Physical Battery Swap</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Step 2: Swap Action */}
            {step >= 2 && (
              <div className="bex-card">
                <div className="bex-step-title-row">
                  <div className="bex-step-number">2</div>
                  <h3 className="bex-step-title">Execute Battery Swap</h3>
                </div>

                <div className="bex-swap-tiles-grid">
                  {/* Give charged */}
                  <div
                    onClick={() => setGiven(true)}
                    className={`bex-swap-tile ${given ? 'done-give' : ''}`}
                  >
                    <div className="bex-tile-top">
                      <span style={{ fontSize: '28px' }}>📤</span>
                      <div className="bex-tile-check" style={{ background: given ? '#22C55E' : '#E2E8F0' }}>
                        {given ? <Check className="w-4 h-4" /> : null}
                      </div>
                    </div>
                    <div>
                      <h4 className="bex-tile-title">Hand Over Charged Module</h4>
                      <p className="bex-tile-sub">Battery ID: <strong>{partner.batteryId || 'RX-104'}</strong></p>
                      <p className="bex-tile-sub">48V / 3.2 kWh · Slot B-101 (100% ⚡)</p>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 800, color: given ? '#15803D' : '#22C55E', marginTop: '12px' }}>
                      {given ? '✓ Handed Over & Mounted' : 'Tap to confirm handover →'}
                    </p>
                  </div>

                  {/* Collect used */}
                  <div
                    onClick={() => setCollected(true)}
                    className={`bex-swap-tile ${collected ? 'done-collect' : ''}`}
                  >
                    <div className="bex-tile-top">
                      <span style={{ fontSize: '28px' }}>📥</span>
                      <div className="bex-tile-check" style={{ background: collected ? '#F59E0B' : '#E2E8F0' }}>
                        {collected ? <Check className="w-4 h-4" /> : null}
                      </div>
                    </div>
                    <div>
                      <h4 className="bex-tile-title">Collect Discharged Module</h4>
                      <p className="bex-tile-sub">Battery ID: <strong>{partner.collectedBatteryId || 'RX-088'}</strong></p>
                      <p className="bex-tile-sub">48V / 3.2 kWh · Place in empty Slot B-106</p>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 800, color: collected ? '#B45309' : '#D97706', marginTop: '12px' }}>
                      {collected ? '✓ Placed in Dock Slot B-106' : 'Tap to confirm collection →'}
                    </p>
                  </div>
                </div>

                {given && collected && step === 2 && (
                  <button
                    type="button"
                    className="bex-proceed-btn"
                    onClick={() => setStep(3)}
                  >
                    <span>Confirm Exchange Verification</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step >= 3 && (
              <div className="bex-card" style={{ background: '#F0FDF4', borderColor: '#86EFAC' }}>
                <div className="bex-step-title-row">
                  <div className="bex-step-number">3</div>
                  <h3 className="bex-step-title" style={{ color: '#14532D' }}>Battery Swap Complete</h3>
                  <CheckCircle className="w-6 h-6 text-green-600" style={{ marginLeft: 'auto' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                    <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 2px 0' }}>Module Installed</p>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#14532D', margin: 0 }}>RX-104 (48V / 3.2 kWh)</p>
                  </div>
                  <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                    <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 2px 0' }}>Module Recovered</p>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#92400E', margin: 0 }}>RX-088 (Stored in B-106)</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="bex-proceed-btn"
                  onClick={() => navigate('/partner/done')}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Finalize Swap & View Earnings</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar: Details & Instructions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="bex-card">
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 14px 0' }}>
                Order Summary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Customer</span>
                  <span style={{ fontWeight: 700 }}>{customer.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Request ID</span>
                  <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{customer.requestId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Vehicle</span>
                  <span style={{ fontWeight: 700 }}>Mahindra Treo</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>OTP Status</span>
                  <span style={{ fontWeight: 800, color: '#16A34A' }}>Verified ✓</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '18px', padding: '18px' }}>
              <p style={{ fontSize: '13px', fontWeight: 800, color: '#1E40AF', margin: '0 0 8px 0' }}>
                ℹ️ Standard Operating Safety:
              </p>
              <ul style={{ fontSize: '12px', color: '#1E3A8A', margin: 0, paddingLeft: '18px', lineHeight: '1.6' }}>
                <li>Ensure vehicle ignition is completely OFF</li>
                <li>Inspect plug socket for dust or physical damage</li>
                <li>Listen for positive click when sliding in RX-104</li>
                <li>Lock slot B-106 after depositing spent battery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
