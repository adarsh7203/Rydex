import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { ChevronRight, Zap, MapPin, CheckCircle, ChevronLeft, ShieldCheck } from 'lucide-react';
import './RequestBattery.css';

const VEHICLE_TYPES = [
  { id: 'ev3', label: 'EV 3-Wheeler', sublabel: 'E-Rickshaw & Passenger Auto', emoji: '🛺', badge: 'Most Common' },
  { id: 'ev2', label: 'EV 2-Wheeler', sublabel: 'Delivery Scooter & e-Bike', emoji: '🛵', badge: 'Fast Swap' },
  { id: 'l5', label: 'L5 Cargo Vehicle', sublabel: 'Heavy Commercial Cargo EV', emoji: '🚐', badge: 'High Power' },
  { id: 'other', label: 'Custom Fleet EV', sublabel: 'Fleet & Specialized Vehicles', emoji: '⚡', badge: 'Standard Spec' },
];

const VOLTAGES = [
  { val: '48V', sub: 'Standard EV' },
  { val: '60V', sub: 'High Torque' },
  { val: '72V', sub: 'Heavy Duty' },
];

const CAPACITIES = [
  { val: '2.0 kWh', range: '~45 km' },
  { val: '3.2 kWh', range: '~75 km' },
  { val: '4.0 kWh', range: '~95 km' },
  { val: '5.0 kWh', range: '~120 km' },
];

const SHAPES = [
  { val: 'Type A (Vertical)', sub: 'Top Handle' },
  { val: 'Type B (Compact)', sub: 'Side Locking' },
  { val: 'Type C (Modular)', sub: 'Dual Terminal' },
];

export default function RequestBattery() {
  const navigate = useNavigate();
  const { setRequestStatus, customer } = useApp();
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState('ev3');
  const [voltage, setVoltage] = useState('48V');
  const [capacity, setCapacity] = useState('3.2 kWh');
  const [shape, setShape] = useState('Type A (Vertical)');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setRequestStatus('finding');
      navigate('/customer/finding');
    }
  };

  const selectedVehicle = VEHICLE_TYPES.find(v => v.id === vehicle);

  return (
    <Layout>
      <div className="rb-container">
        {/* ── Stepper Navigation ── */}
        <div className="rb-stepper-header">
          <button
            type="button"
            onClick={() => (step > 1 ? setStep(step - 1) : navigate('/customer/home'))}
            className="rb-back-btn"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="rb-stepper-content">
            <div className="rb-stepper-meta">
              <span className="rb-stepper-title">
                Step {step} of 4 — {['', 'Vehicle Type', 'Battery Specifications', 'Confirm Location', 'Order Review'][step]}
              </span>
              <span className="rb-stepper-percentage">{step * 25}% Completed</span>
            </div>
            <div className="rb-step-bars">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`rb-step-bar ${i < step ? 'done' : i === step ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="rb-layout-grid">
          {/* Main Form Card */}
          <div className="rb-main-card">
            {/* Step 1: Vehicle */}
            {step === 1 && (
              <div>
                <div className="rb-card-header">
                  <h3 className="rb-card-title">Select Your Electric Vehicle</h3>
                  <p className="rb-card-subtitle">Choose your vehicle type to filter compatible battery modules</p>
                </div>
                <div className="rb-vehicle-grid">
                  {VEHICLE_TYPES.map(v => (
                    <div
                      key={v.id}
                      onClick={() => setVehicle(v.id)}
                      className={`rb-vehicle-tile ${vehicle === v.id ? 'selected' : ''}`}
                    >
                      <div>
                        <div className="rb-vehicle-emoji">{v.emoji}</div>
                        <h4 className="rb-vehicle-name">{v.label}</h4>
                        <p className="rb-vehicle-desc">{v.sublabel}</p>
                      </div>
                      <span className="rb-vehicle-badge">{v.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Battery Specs */}
            {step === 2 && (
              <div>
                <div className="rb-card-header">
                  <h3 className="rb-card-title">Battery Specifications</h3>
                  <p className="rb-card-subtitle">Select the voltage, capacity, and form factor for your vehicle</p>
                </div>
                <div className="rb-specs-section">
                  {/* Voltage */}
                  <div className="rb-spec-group">
                    <label className="rb-spec-title">
                      <span>⚡ Operating Voltage</span>
                    </label>
                    <div className="rb-pill-grid">
                      {VOLTAGES.map(item => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setVoltage(item.val)}
                          className={`rb-spec-btn ${voltage === item.val ? 'active' : ''}`}
                        >
                          <span>{item.val}</span>
                          <span className="rb-spec-btn-sub">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="rb-spec-group">
                    <label className="rb-spec-title">
                      <span>🔋 Capacity & Range</span>
                    </label>
                    <div className="rb-pill-grid-4">
                      {CAPACITIES.map(item => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setCapacity(item.val)}
                          className={`rb-spec-btn ${capacity === item.val ? 'active' : ''}`}
                        >
                          <span>{item.val}</span>
                          <span className="rb-spec-btn-sub">{item.range}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Factor */}
                  <div className="rb-spec-group">
                    <label className="rb-spec-title">
                      <span>📐 Form Factor / Locking Mechanism</span>
                    </label>
                    <div className="rb-pill-grid">
                      {SHAPES.map(item => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setShape(item.val)}
                          className={`rb-spec-btn ${shape === item.val ? 'active' : ''}`}
                        >
                          <span>{item.val}</span>
                          <span className="rb-spec-btn-sub">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div>
                <div className="rb-card-header">
                  <h3 className="rb-card-title">Confirm Delivery Location</h3>
                  <p className="rb-card-subtitle">GPS automatically located your current EV standstill point</p>
                </div>

                <div className="rb-location-box" style={{ height: '300px' }}>
                  <iframe
                    title="location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=80.9362%2C26.8367%2C80.9562%2C26.8567&layer=mapnik&marker=26.8467%2C80.9462"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>

                <div className="rb-location-details">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#22C55E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="rb-location-addr">
                      <h4>{customer.location.address || 'Hazratganj, Lucknow, UP'}</h4>
                      <p>26.8467° N, 80.9462° E · GPS Accuracy High (±3m)</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', background: '#DCFCE7', padding: '6px 12px', borderRadius: '8px' }}>
                    Active GPS
                  </span>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div>
                <div className="rb-card-header">
                  <h3 className="rb-card-title">Order Review & Confirmation</h3>
                  <p className="rb-card-subtitle">Review the swap specifications before dispatching your request</p>
                </div>

                <div className="rb-confirm-list">
                  {[
                    { icon: selectedVehicle?.emoji, label: 'Vehicle Type', value: selectedVehicle?.label },
                    { icon: '⚡', label: 'Battery Voltage', value: voltage },
                    { icon: '🔋', label: 'Capacity Rating', value: capacity },
                    { icon: '📐', label: 'Mounting Shape', value: shape },
                    { icon: '📍', label: 'Service Location', value: customer.location.address || 'Hazratganj, Lucknow, UP' },
                    { icon: '💳', label: 'Fixed Swapping Fee', value: '₹149.00 (All Inclusive)' },
                  ].map(item => (
                    <div key={item.label} className="rb-confirm-row">
                      <span className="rb-confirm-icon">{item.icon}</span>
                      <div className="rb-confirm-info">
                        <p>{item.label}</p>
                        <p>{item.value}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" fill="#22C55E" style={{ color: 'white' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="rb-sidebar-col">
            <div className="rb-summary-card">
              <h4 className="rb-summary-title">Request Summary</h4>
              <div className="rb-summary-items">
                <div className="rb-summary-row">
                  <span>Vehicle</span>
                  <span>{selectedVehicle?.label || '—'}</span>
                </div>
                <div className="rb-summary-row">
                  <span>Voltage</span>
                  <span>{voltage}</span>
                </div>
                <div className="rb-summary-row">
                  <span>Capacity</span>
                  <span>{capacity}</span>
                </div>
                <div className="rb-summary-row">
                  <span>Shape</span>
                  <span>{shape.split(' ')[0]}</span>
                </div>
                <div className="rb-summary-total">
                  <span className="rb-total-label">Total Fee</span>
                  <span className="rb-total-price">₹149.00</span>
                </div>
              </div>

              <button
                type="button"
                className="rb-continue-btn"
                onClick={handleNext}
              >
                {step === 4 ? (
                  <>
                    <Zap className="w-5 h-5" fill="white" />
                    <span>Dispatch Partner</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Step {step + 1}</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Nearest Partner Live Info */}
            <div className="rb-partner-banner">
              <p className="rb-partner-banner-header">⚡ Nearest Partner Live</p>
              <h5 className="rb-partner-banner-name">Aakash Verma · 1.2 km</h5>
              <p className="rb-partner-banner-sub">Ready with charged {voltage} / {capacity} battery. Estimated arrival: ~4 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
