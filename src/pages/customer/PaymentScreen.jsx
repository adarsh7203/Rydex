import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { CreditCard, Shield, ChevronRight, Zap } from 'lucide-react';
import './PaymentScreen.css';

const METHODS = [
  { id: 'upi', label: 'UPI Payment', sub: 'PhonePe · GPay · Paytm · BHIM', emoji: '📱' },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa · Mastercard · RuPay', emoji: '💳' },
  { id: 'wallet', label: 'Rydex Wallet', sub: 'Balance: ₹450.00 available', emoji: '👛' },
  { id: 'cash', label: 'Cash on Delivery', sub: 'Pay the partner directly', emoji: '💵' },
];

export default function PaymentScreen() {
  const navigate = useNavigate();
  const { setPaymentDone, setRequestStatus, customer } = useApp();
  const [selected, setSelected] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState('');

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentDone(true);
      setRequestStatus('completed');
      navigate('/customer/complete');
    }, 1800);
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-8 max-w-5xl">
        {/* Left: Payment methods */}
        <div className="col-span-2 space-y-5">
          <div className="card card-p">
            <h3 className="font-bold text-gray-900 text-lg mb-5">Select Payment Method</h3>
            <div className="space-y-3">
              {METHODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                    selected === m.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{m.label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{m.sub}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selected === m.id ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {selected === m.id && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>

            {selected === 'upi' && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter UPI ID</label>
                <input className="inp" placeholder="yourname@ybl / yourname@okaxis" value={upiId} onChange={e => setUpiId(e.target.value)} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Payments are secured with 256-bit SSL encryption</p>
          </div>
        </div>

        {/* Right: Bill summary */}
        <div className="space-y-5">
          <div className="card card-p">
            <h3 className="font-bold text-gray-900 mb-5">Bill Summary</h3>
            <div className="space-y-4">
              {[
                { label: 'Battery Swap Service', amount: '₹120.00' },
                { label: 'Delivery Charge', amount: '₹20.00' },
                { label: 'Platform Fee', amount: '₹9.00' },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.amount}</p>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
                <p className="font-bold text-gray-900">Total</p>
                <p className="text-2xl font-black text-green-600">₹149.00</p>
              </div>
            </div>

            <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" fill="#3BAA67" />
              <p className="text-xs text-green-700 font-medium">OTP Verified ✓ · Battery ID: RX-104 · Partner: Aakash Verma</p>
            </div>
          </div>

          <button className="btn btn-green-lg" onClick={handlePay} disabled={loading}>
            {loading ? (
              <div className="loader" style={{ width: 22, height: 22, borderWidth: 3 }}></div>
            ) : (
              <><CreditCard className="w-5 h-5" /> Pay ₹149.00 <ChevronRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-xs text-center text-gray-400">By paying, you agree to the Rydex terms of service</p>
        </div>
      </div>
    </Layout>
  );
}
