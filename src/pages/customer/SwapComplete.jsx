import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { CheckCircle, Battery, Star, Home, Share2, Download } from 'lucide-react';
import './SwapComplete.css';

export default function SwapComplete() {
  const navigate = useNavigate();
  const { customer, partner } = useApp();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState(false);
  const now = new Date();

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-8 max-w-5xl">
        {/* Left: Success + Receipt */}
        <div className="col-span-2 space-y-5">
          {/* Success banner */}
          <div className="hero-card text-center py-10 anim-fade-up">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-white" fill="white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Battery Swap Complete! 🎉</h2>
            <p className="text-green-300">Your EV is powered up and ready to go.</p>
          </div>

          {/* Receipt */}
          <div className="card card-p anim-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-dashed border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Battery className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Transaction Receipt</p>
                  <p className="text-xs text-gray-400">{customer.requestId}</p>
                </div>
              </div>
              <span className="badge badge-green text-sm">Paid ₹149 ✓</span>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: 'Battery Delivered', value: `${partner.batteryId} · 48V / 3.2 kWh · Fully Charged` },
                { label: 'Battery Collected', value: `${partner.collectedBatteryId} · 48V / 3.2 kWh · Discharged` },
                { label: 'Delivery Partner', value: partner.name },
                { label: 'Vehicle', value: customer.vehicleType },
                { label: 'Date', value: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { label: 'Time', value: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
                { label: 'Payment Method', value: 'UPI' },
                { label: 'Amount Paid', value: '₹149.00' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="btn btn-ghost flex-1"><Share2 className="w-4 h-4" /> Share Receipt</button>
            <button className="btn btn-ghost flex-1"><Download className="w-4 h-4" /> Download PDF</button>
            <button className="btn btn-green flex-1" onClick={() => navigate('/customer/home')}>
              <Home className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>

        {/* Right: Rate partner */}
        <div className="space-y-5">
          {!rated ? (
            <div className="card card-p text-center anim-fade-up" style={{ animationDelay: '0.15s' }}>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center font-black text-white text-2xl mx-auto mb-4 shadow-lg">A</div>
              <h3 className="font-bold text-gray-900 text-lg">{partner.name}</h3>
              <p className="text-gray-400 text-sm mb-5">How was your experience?</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1,2,3,4,5].map(s => (
                  <button key={s}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => { setRating(s); setTimeout(() => setRated(true), 500); }}
                    className="transition-transform hover:scale-125">
                    <Star className="w-10 h-10" fill={s <= (hover || rating) ? '#FBBF24' : 'none'} stroke={s <= (hover || rating) ? '#FBBF24' : '#D1D5DB'} />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">Tap to rate your delivery partner</p>
            </div>
          ) : (
            <div className="card card-p text-center py-8 bg-green-50 border-2 border-green-200 anim-fade">
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-bold text-green-800">Thanks for rating!</p>
              <p className="text-sm text-green-600 mt-1">Your feedback helps improve the service.</p>
            </div>
          )}

          {/* Summary card */}
          <div className="card card-p">
            <h3 className="font-bold text-gray-900 mb-4">Swap Summary</h3>
            <div className="space-y-3">
              {[
                { emoji: '⚡', label: 'Time Saved', value: '~3.5 hours' },
                { emoji: '🛺', label: 'Back to Work', value: 'Immediately' },
                { emoji: '🌱', label: 'Green Impact', value: 'EV powered' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{item.emoji}</span>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
