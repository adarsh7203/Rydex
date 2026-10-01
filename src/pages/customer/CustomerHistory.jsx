import { useState } from 'react';
import Layout from '../../components/Layout';
import { History, Download, Zap, TrendingUp, Leaf, Battery, CheckCircle, FileText } from 'lucide-react';
import './CustomerHistory.css';

const SWAP_RECORDS = [
  { id: 'RYD-2024-00139', date: 'Sep 29, 2024 · 10:45 AM', partner: 'Aakash Verma', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Hazratganj, Lucknow' },
  { id: 'RYD-2024-00131', date: 'Sep 25, 2024 · 03:20 PM', partner: 'Rohit Sharma', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Gomti Nagar, Lucknow' },
  { id: 'RYD-2024-00118', date: 'Sep 20, 2024 · 11:15 AM', partner: 'Deepak Yadav', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Charbagh Station, Lucknow' },
  { id: 'RYD-2024-00104', date: 'Sep 16, 2024 · 02:40 PM', partner: 'Aakash Verma', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Alambagh, Lucknow' },
  { id: 'RYD-2024-00092', date: 'Sep 11, 2024 · 09:30 AM', partner: 'Manish Kumar', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Hazratganj, Lucknow' },
  { id: 'RYD-2024-00085', date: 'Sep 06, 2024 · 06:10 PM', partner: 'Rohit Sharma', battery: '48V / 3.2 kWh', energy: '3.2 kWh', amount: '₹149', status: 'Completed', loc: 'Indira Nagar, Lucknow' },
];

export default function CustomerHistory() {
  const [filter, setFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <Layout>
      <div className="chist-container">
        {/* Header */}
        <div className="chist-header">
          <div className="chist-title-group">
            <h2>Swap History & Invoices</h2>
            <p>Track your lifetime commercial EV battery swaps and tax receipts</p>
          </div>
          <button
            type="button"
            className="chist-export-btn"
            onClick={() => alert('Downloading CSV Statement for September 2024...')}
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>Export Statement</span>
          </button>
        </div>

        {/* Lifetime Metrics */}
        <div className="chist-metrics-grid">
          <div className="chist-metric-card">
            <div className="chist-metric-top">
              <div className="chist-metric-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                <Battery className="w-5 h-5" />
              </div>
            </div>
            <h3 className="chist-metric-val">23 Swaps</h3>
            <p className="chist-metric-lbl">Total Completed Swaps</p>
          </div>

          <div className="chist-metric-card">
            <div className="chist-metric-top">
              <div className="chist-metric-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="chist-metric-val">73.6 kWh</h3>
            <p className="chist-metric-lbl">Clean Energy Dispensed</p>
          </div>

          <div className="chist-metric-card">
            <div className="chist-metric-top">
              <div className="chist-metric-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h3 className="chist-metric-val">₹4,850</h3>
            <p className="chist-metric-lbl">Fuel Savings vs Petrol</p>
          </div>

          <div className="chist-metric-card">
            <div className="chist-metric-top">
              <div className="chist-metric-icon" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <h3 className="chist-metric-val">58.2 kg</h3>
            <p className="chist-metric-lbl">CO2 Emissions Saved</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="chist-filter-bar">
          <button
            type="button"
            className={`chist-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Swaps (23)
          </button>
          <button
            type="button"
            className={`chist-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed (23)
          </button>
          <button
            type="button"
            className={`chist-tab ${filter === 'invoices' ? 'active' : ''}`}
            onClick={() => setFilter('invoices')}
          >
            GST Invoices (23)
          </button>
        </div>

        {/* History Table */}
        <div className="chist-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="chist-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Date & Time</th>
                  <th>Partner</th>
                  <th>Battery Spec</th>
                  <th>Location</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {SWAP_RECORDS.map(rec => (
                  <tr key={rec.id}>
                    <td>
                      <span className="chist-id-cell">{rec.id}</span>
                    </td>
                    <td>{rec.date}</td>
                    <td>
                      <div className="chist-partner-cell">
                        <div className="chist-partner-avatar">
                          {rec.partner.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{rec.partner}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>{rec.battery}</span>
                    </td>
                    <td>{rec.loc}</td>
                    <td>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>{rec.amount}</span>
                    </td>
                    <td>
                      <span className="chist-badge-completed">
                        ✓ {rec.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="chist-action-btn"
                        onClick={() => setSelectedInvoice(rec)}
                      >
                        <FileText className="w-3.5 h-3.5" style={{ display: 'inline', marginRight: '4px' }} />
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Modal Preview */}
        {selectedInvoice && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}>
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', maxWidth: '440px', width: '100%',
              padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Tax Invoice Receipt</h3>
                <span style={{ fontSize: '11px', background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>PAID</span>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Transaction Ref</p>
                <p style={{ fontFamily: 'monospace', fontWeight: 800, margin: '0 0 8px 0' }}>{selectedInvoice.id}</p>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 2px 0' }}>Partner Handover</p>
                <p style={{ fontWeight: 700, margin: 0 }}>{selectedInvoice.partner}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Battery Service</span>
                  <span style={{ fontWeight: 700 }}>₹126.27</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>GST (18%)</span>
                  <span style={{ fontWeight: 700 }}>₹22.73</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', fontWeight: 900, fontSize: '16px' }}>
                  <span>Total Paid</span>
                  <span style={{ color: '#16A34A' }}>₹149.00</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                style={{
                  width: '100%', padding: '12px', background: '#22C55E', color: 'white',
                  borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer'
                }}
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
