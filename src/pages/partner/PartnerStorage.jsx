import { useState } from 'react';
import Layout from '../../components/Layout';
import { Battery, Zap, RotateCw, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import './PartnerStorage.css';

const DOCK_SLOTS = [
  { id: 'Slot B-101', serial: 'RX-104', type: '48V / 3.2 kWh', status: 'charged', soc: 100, temp: '29°C', soh: '99%' },
  { id: 'Slot B-102', serial: 'RX-109', type: '48V / 3.2 kWh', status: 'charged', soc: 98, temp: '30°C', soh: '98%' },
  { id: 'Slot B-103', serial: 'RX-211', type: '60V / 3.2 kWh', status: 'charged', soc: 100, temp: '28°C', soh: '100%' },
  { id: 'Slot B-104', serial: 'RX-115', type: '48V / 3.2 kWh', status: 'charged', soc: 96, temp: '31°C', soh: '97%' },
  { id: 'Slot B-105', serial: '—', type: 'Empty Bay', status: 'empty', soc: 0, temp: '—', soh: '—' },
  { id: 'Slot B-106', serial: 'RX-088', type: '48V / 3.2 kWh', status: 'discharged', soc: 14, temp: '34°C', soh: '95%' },
];

export default function PartnerStorage() {
  const [replenishing, setReplenishing] = useState(false);

  const handleReplenish = () => {
    setReplenishing(true);
    setTimeout(() => {
      setReplenishing(false);
      alert('Replenishment route generated: Navigate to Hub #4, Aminabad to swap discharged module RX-088.');
    }, 1200);
  };

  return (
    <Layout>
      <div className="pstore-container">
        {/* Header */}
        <div className="pstore-header">
          <div className="pstore-title-group">
            <h2>Vehicle Battery Storage & Dock</h2>
            <p>Real-time State of Charge (SoC), thermal telemetry, and inventory management</p>
          </div>
          <button
            type="button"
            onClick={handleReplenish}
            disabled={replenishing}
            style={{
              padding: '10px 20px', background: '#22C55E', color: 'white',
              borderRadius: '12px', border: 'none', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <RotateCw className={`w-4 h-4 ${replenishing ? 'animate-spin' : ''}`} />
            <span>{replenishing ? 'Checking Station...' : 'Find Swap Station'}</span>
          </button>
        </div>

        {/* Metrics Row */}
        <div className="pstore-metrics-grid">
          <div className="pstore-metric-card">
            <div className="pstore-metric-top">
              <div className="pstore-metric-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                <Battery className="w-5 h-5" />
              </div>
            </div>
            <h3 className="pstore-metric-val">4 / 6 Ready</h3>
            <p className="pstore-metric-lbl">Fully Charged Modules</p>
          </div>

          <div className="pstore-metric-card">
            <div className="pstore-metric-top">
              <div className="pstore-metric-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="pstore-metric-val">12.8 kWh</h3>
            <p className="pstore-metric-lbl">Total Onboard Energy</p>
          </div>

          <div className="pstore-metric-card">
            <div className="pstore-metric-top">
              <div className="pstore-metric-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="pstore-metric-val">1 Spent</h3>
            <p className="pstore-metric-lbl">Needs Station Recharge</p>
          </div>

          <div className="pstore-metric-card">
            <div className="pstore-metric-top">
              <div className="pstore-metric-icon" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <h3 className="pstore-metric-val">98% Avg</h3>
            <p className="pstore-metric-lbl">State of Health (SoH)</p>
          </div>
        </div>

        {/* 6 Dock Slots Detailed Cards */}
        <div className="pstore-dock-grid">
          {DOCK_SLOTS.map(slot => (
            <div key={slot.id} className={`pstore-slot-card ${slot.status}`}>
              <div>
                <div className="pstore-slot-header">
                  <span className="pstore-slot-id">{slot.id}</span>
                  <span className={`pstore-slot-badge ${slot.status}`}>
                    {slot.status === 'charged' ? '⚡ 100% Ready' : slot.status === 'discharged' ? '↩ Discharged' : '○ Available'}
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Module Serial</p>
                  <p style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '0 0 2px 0', fontFamily: 'monospace' }}>
                    {slot.serial}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569', margin: 0 }}>
                    {slot.type}
                  </p>
                </div>

                <div className="pstore-soc-row">
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CHARGE LEVEL</span>
                  <span className="pstore-soc-val">{slot.soc}%</span>
                </div>

                <div className="pstore-soc-bar-bg">
                  <div
                    className="pstore-soc-bar-fill"
                    style={{
                      width: `${slot.soc}%`,
                      background: slot.status === 'charged' ? '#22C55E' : slot.status === 'discharged' ? '#F59E0B' : '#E2E8F0'
                    }}
                  ></div>
                </div>
              </div>

              <div className="pstore-slot-stats">
                <span>Temp: <strong>{slot.temp}</strong></span>
                <span>Health: <strong>{slot.soh}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Nearest Recharge Hub Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px 24px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                Primary Swapping Hub: Aminabad Station #4
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                1.4 km from your standby location · 18 charged batteries ready for fast dock exchange
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReplenish}
            style={{
              padding: '10px 18px', background: '#F1F5F9', border: '1px solid #E2E8F0',
              borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: '#0F172A', cursor: 'pointer'
            }}
          >
            Route to Station
          </button>
        </div>
      </div>
    </Layout>
  );
}
