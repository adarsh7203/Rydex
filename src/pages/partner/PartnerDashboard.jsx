import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import {
  Battery, MapPin, Package, TrendingUp, Star, Clock,
  ChevronRight, CheckCircle, Zap, AlertCircle, Phone
} from 'lucide-react';
import './PartnerDashboard.css';

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const { partner, partnerOnline, setPartnerOnline } = useApp();
  const slots = partner.slots || [
    { id: 'B-101', status: 'full' },
    { id: 'B-102', status: 'full' },
    { id: 'B-103', status: 'full' },
    { id: 'B-104', status: 'full' },
    { id: 'B-105', status: 'empty' },
    { id: 'B-106', status: 'used' },
  ];
  const charged = slots.filter(s => s.status === 'full').length;

  return (
    <Layout>
      <div className="pd-container">
        {/* ── Welcome Header + Availability Switch ── */}
        <div className="pd-header">
          <div className="pd-header-info">
            <p className="pd-greeting">Welcome back 👋</p>
            <h2 className="pd-name">{partner.name || 'Aakash Verma'}</h2>
            <p className="pd-meta">
              {partner.partnerId || 'RX-P9021'} · {partner.vehicleId || 'EV Delivery Bike · Lucknow Central'}
            </p>
          </div>

          <div className="pd-toggle-card">
            <div className="pd-toggle-info">
              <h4>Dispatch Status</h4>
              <p>{partnerOnline ? 'Currently receiving nearby requests' : 'Offline — no requests assigned'}</p>
            </div>
            <div className="pd-toggle-controls">
              <span className={`pd-status-text ${partnerOnline ? 'online' : 'offline'}`}>
                {partnerOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
              <div
                className="pd-switch"
                style={{ background: partnerOnline ? '#22C55E' : '#CBD5E1' }}
                onClick={() => setPartnerOnline(!partnerOnline)}
              >
                <div
                  className="pd-switch-thumb"
                  style={{ transform: partnerOnline ? 'translateX(22px)' : 'translateX(0)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metric Cards Row ── */}
        <div className="pd-metrics-grid">
          {[
            {
              icon: Package,
              label: "Today's Swaps",
              value: partner.todaySwaps || '7',
              sub: 'Target: 10 swaps',
              color: '#16A34A',
              bg: '#DCFCE7',
              stripe: '#22C55E',
            },
            {
              icon: TrendingUp,
              label: "Today's Earnings",
              value: partner.todayEarnings || '₹1,329',
              sub: '₹89 avg/swap + bonus',
              color: '#4F46E5',
              bg: '#EEF2FF',
              stripe: '#6366F1',
            },
            {
              icon: Star,
              label: 'Driver Rating',
              value: `${partner.rating || '4.8'} ★`,
              sub: `${partner.totalSwaps || '247'} total deliveries`,
              color: '#D97706',
              bg: '#FEF3C7',
              stripe: '#F59E0B',
            },
            {
              icon: Battery,
              label: 'Charged Modules',
              value: `${charged}/6`,
              sub: 'Ready in battery dock',
              color: '#059669',
              bg: '#ECFDF5',
              stripe: '#10B981',
            },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="pd-metric-card">
                <div className="pd-metric-stripe" style={{ background: m.stripe }}></div>
                <div className="pd-metric-body">
                  <div>
                    <p className="pd-metric-label">{m.label}</p>
                    <h3 className="pd-metric-val">{m.value}</h3>
                    <p className="pd-metric-sub">{m.sub}</p>
                  </div>
                  <div className="pd-metric-icon" style={{ background: m.bg, color: m.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Main Content Grid ── */}
        <div className="pd-content-grid">
          {/* Left Column: Live Incoming Request / Offline Banner + Map */}
          <div className="pd-left-col">
            {partnerOnline ? (
              <div className="pd-incoming-card anim-slide-r">
                <div className="pd-incoming-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="pd-incoming-badge">⚡ INCOMING REQUEST</span>
                      <span style={{ fontSize: '12px', color: '#86EFAC', fontWeight: 600 }}>Expires in 45s</span>
                    </div>
                    <h3 className="pd-incoming-title">Battery Swap · Ramesh Kumar</h3>
                    <p className="pd-incoming-sub">Hazratganj, Lucknow · 1.2 km away (~4 min drive)</p>
                  </div>
                </div>

                <div className="pd-incoming-specs">
                  <div className="pd-incoming-pill">
                    <div className="pd-pill-top">
                      <span>🛺</span>
                      <span>Vehicle</span>
                    </div>
                    <p className="pd-pill-val">E-Rickshaw 3W</p>
                  </div>

                  <div className="pd-incoming-pill">
                    <div className="pd-pill-top">
                      <span>⚡</span>
                      <span>Spec Required</span>
                    </div>
                    <p className="pd-pill-val">48V / 3.2 kWh</p>
                  </div>

                  <div className="pd-incoming-pill">
                    <div className="pd-pill-top">
                      <span>💰</span>
                      <span>Partner Payout</span>
                    </div>
                    <p className="pd-pill-val">₹89.00</p>
                  </div>
                </div>

                <div className="pd-verified-box">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Battery RX-104 in Slot B-101 is compatible & fully charged (100%)</span>
                </div>

                <div className="pd-actions-row">
                  <button
                    type="button"
                    className="pd-btn-decline"
                    onClick={() => setPartnerOnline(false)}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="pd-btn-accept"
                    onClick={() => navigate('/partner/request')}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Accept Request & Start Navigation</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="pd-offline-card">
                <div className="pd-offline-icon">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#334155', margin: '0 0 6px 0' }}>
                  You are Currently Offline
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px 0' }}>
                  Switch your dispatch toggle to Online to start receiving battery swap notifications.
                </p>
                <button
                  type="button"
                  onClick={() => setPartnerOnline(true)}
                  style={{
                    padding: '12px 24px', background: '#22C55E', color: 'white', border: 'none',
                    borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex',
                    alignItems: 'center', gap: '8px'
                  }}
                >
                  <Zap className="w-4 h-4" /> Go Online
                </button>
              </div>
            )}

            {/* Partner Standby Sector Map */}
            <div className="pd-card">
              <div className="pd-card-header">
                <div className="pd-card-title">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span>Your Standby Sector</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#DCFCE7', padding: '4px 10px', borderRadius: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803D' }}>GPS Signal Strong</span>
                </div>
              </div>

              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
                <iframe
                  title="partner-loc"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.9289%2C26.8421%2C80.9489%2C26.8621&layer=mapnik&marker=26.8521%2C80.9389"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: '#64748B' }}>Station Hub: <strong>Aminabad Hub #4, Lucknow</strong></span>
                <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>26.8521° N, 80.9389° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Battery Slots Dock + Shift Performance */}
          <div className="pd-right-col">
            {/* Battery Slots Dock */}
            <div className="pd-card">
              <div className="pd-card-header">
                <div className="pd-card-title">
                  <Battery className="w-5 h-5 text-gray-700" />
                  <span>Vehicle Battery Dock</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                  {charged}/6 Ready
                </span>
              </div>

              <div className="pd-slots-grid">
                {slots.map(slot => (
                  <div key={slot.id} className={`pd-slot-tile ${slot.status}`}>
                    <div className="pd-slot-id">{slot.id}</div>
                    <div className="pd-slot-icon">
                      {slot.status === 'full' ? '⚡' : slot.status === 'empty' ? '○' : '↩'}
                    </div>
                    <div className="pd-slot-status">{slot.status}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '11px', color: '#64748B', margin: 0 }}>
                  🔋 <strong>Slot B-101</strong> (RX-104) is prioritized for your next delivery.
                </p>
              </div>
            </div>

            {/* Shift Performance Summary */}
            <div className="pd-card">
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                Shift Summary
              </h4>

              <div className="pd-perf-item">
                <span>Avg Acceptance Time</span>
                <span>12.4s</span>
              </div>
              <div className="pd-perf-item">
                <span>Avg Travel Time</span>
                <span>3.8 min</span>
              </div>
              <div className="pd-perf-item">
                <span>On-Time Arrival Rate</span>
                <span style={{ color: '#16A34A' }}>100%</span>
              </div>
              <div className="pd-perf-item">
                <span>Incentive Status</span>
                <span style={{ color: '#2563EB' }}>₹200 Tier 1 Unlocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
