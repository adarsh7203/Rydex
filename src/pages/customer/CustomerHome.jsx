import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import {
  Zap, MapPin, Clock, Star, TrendingUp,
  ChevronRight, AlertTriangle, Package
} from 'lucide-react';
import './CustomerHome.css';

const recentRequests = [
  { id: 'RYD-2024-00139', date: 'Sep 29, 2024', partner: 'Aakash Verma', battery: '48V / 3.2 kWh', amount: '₹149', status: 'Completed' },
  { id: 'RYD-2024-00131', date: 'Sep 25, 2024', partner: 'Rohit Sharma', battery: '48V / 3.2 kWh', amount: '₹149', status: 'Completed' },
  { id: 'RYD-2024-00118', date: 'Sep 20, 2024', partner: 'Deepak Yadav', battery: '48V / 3.2 kWh', amount: '₹149', status: 'Completed' },
];

export default function CustomerHome() {
  const navigate = useNavigate();
  const { customer } = useApp();

  return (
    <Layout>
      {/* ── Welcome Header Row ── */}
      <div className="ch-header">
        <div className="ch-header-info">
          <p className="ch-greeting">Good morning 👋</p>
          <h2 className="ch-name">{customer.name}</h2>
          <div className="ch-location">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>{customer.location.address}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/customer/request')}
          className="ch-request-btn"
        >
          <Zap className="w-5 h-5" fill="white" />
          <span>Request Battery Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Top Row: Battery Hero + Quick Stats ── */}
      <div className="ch-top-grid">
        {/* Battery status hero */}
        <div className="ch-battery-card">
          <div className="ch-battery-card-glow"></div>

          <div className="ch-battery-header">
            <div>
              <p className="ch-battery-tag">BATTERY STATUS</p>
              <h3 className="ch-battery-title">Critical — 12%</h3>
              <p className="ch-battery-sub">Your EV needs a battery swap soon to prevent breakdown</p>
            </div>
            <div className="ch-critical-badge">
              <AlertTriangle className="w-4 h-4 text-red-300" />
              <span>Critical</span>
            </div>
          </div>

          {/* Battery bar gauge */}
          <div className="ch-battery-gauge">
            <div className="ch-gauge-labels">
              <span>0% Empty</span>
              <span className="ch-gauge-highlight">⚡ 12% Remaining</span>
              <span>100% Full</span>
            </div>
            <div className="ch-gauge-track">
              <div className="ch-gauge-fill" style={{ width: '12%' }}></div>
            </div>
          </div>

          {/* Vehicle info tiles */}
          <div className="ch-specs-grid">
            <div className="ch-spec-box">
              <p className="ch-spec-label">Vehicle</p>
              <p className="ch-spec-val">🛺 E-Rickshaw</p>
            </div>
            <div className="ch-spec-box">
              <p className="ch-spec-label">Voltage</p>
              <p className="ch-spec-val">{customer.batteryVoltage || '48V'}</p>
            </div>
            <div className="ch-spec-box">
              <p className="ch-spec-label">Capacity</p>
              <p className="ch-spec-val">{customer.batteryCapacity || '3.2 kWh'}</p>
            </div>
            <div className="ch-spec-box">
              <p className="ch-spec-label">Chemistry</p>
              <p className="ch-spec-val">{customer.batteryType || 'LFP Lithium'}</p>
            </div>
          </div>
        </div>

        {/* Quick stats column */}
        <div className="ch-stats-col">
          {[
            {
              icon: Clock,
              label: 'Avg ETA',
              value: '4 min',
              sub: 'Fastest in your sector',
              color: '#16A34A',
              bg: '#DCFCE7',
              stripe: '#22C55E'
            },
            {
              icon: Star,
              label: 'Your Rating',
              value: '4.9 ★',
              sub: 'Based on 23 swaps',
              color: '#D97706',
              bg: '#FEF3C7',
              stripe: '#F59E0B'
            },
            {
              icon: TrendingUp,
              label: 'Total Swaps',
              value: '23',
              sub: '100% successful deliveries',
              color: '#4F46E5',
              bg: '#EEF2FF',
              stripe: '#6366F1'
            },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="ch-stat-tile">
                <div className="ch-stat-stripe" style={{ background: s.stripe }}></div>
                <div className="ch-stat-icon-wrapper" style={{ background: s.bg }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="ch-stat-label">{s.label}</p>
                  <p className="ch-stat-val">{s.value}</p>
                  <p className="ch-stat-sub">{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Row: Nearest Partner + Recent Requests ── */}
      <div className="ch-bottom-grid">
        {/* Nearest Partner Card */}
        <div className="ch-partner-card">
          <div>
            <div className="ch-partner-header">
              <h3 className="ch-partner-title">Nearest Partner</h3>
              <div className="ch-live-indicator">
                <span className="ch-live-dot"></span>
                <span className="ch-live-text">Live</span>
              </div>
            </div>

            <div className="ch-partner-profile">
              <div className="ch-partner-avatar">A</div>
              <div>
                <p className="ch-partner-name">Aakash Verma</p>
                <div className="ch-partner-rating">
                  <Star className="w-3.5 h-3.5 text-amber-400" fill="#FBBF24" />
                  <span>4.8 · 247 swaps completed</span>
                </div>
              </div>
            </div>

            <div className="ch-partner-specs">
              <div className="ch-spec-row dist">
                <span>Distance</span>
                <span className="ch-spec-row-val">1.2 km away</span>
              </div>
              <div className="ch-spec-row eta">
                <span>Estimated Arrival</span>
                <span className="ch-spec-row-val">~4 minutes</span>
              </div>
              <div className="ch-spec-row batt">
                <span>Ready Battery</span>
                <span className="ch-spec-row-val">48V / 3.2 kWh ✓</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="ch-partner-request-btn"
            onClick={() => navigate('/customer/request')}
          >
            <Zap className="w-4 h-4" fill="white" />
            <span>Request Swap from Aakash</span>
          </button>
        </div>

        {/* Recent Requests Table Card */}
        <div className="ch-requests-card">
          <div className="ch-requests-header">
            <div className="ch-requests-title">
              <Package className="w-5 h-5 text-gray-700" />
              <span>Recent Requests</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/customer/history')}
              className="ch-view-all-link"
            >
              View All
            </button>
          </div>

          <div className="ch-table-wrapper">
            <table className="ch-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Date</th>
                  <th>Partner</th>
                  <th>Battery</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map(req => (
                  <tr key={req.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: '#0F172A' }}>{req.id}</span>
                    </td>
                    <td>{req.date}</td>
                    <td>
                      <div className="ch-partner-cell">
                        <div className="ch-partner-chip">
                          {req.partner.charAt(0)}
                        </div>
                        <span>{req.partner}</span>
                      </div>
                    </td>
                    <td>{req.battery}</td>
                    <td style={{ fontWeight: 800, color: '#0F172A' }}>{req.amount}</td>
                    <td>
                      <span className="ch-status-pill">{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
