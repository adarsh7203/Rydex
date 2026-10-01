import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, MapPin, CheckCircle } from 'lucide-react';
import './FindingPartner.css';

export default function FindingPartner() {
  const navigate = useNavigate();
  const { setRequestStatus } = useApp();
  const [stage, setStage] = useState(0);
  const stages = ['Scanning nearby partners...', 'Checking battery compatibility...', 'Partner found! Sending request...'];

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 3000);
    const t3 = setTimeout(() => { setRequestStatus('matched'); navigate('/customer/tracking'); }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0D2B1A 0%, #14532D 60%, #1e7a40 100%)' }}>
      <div className="text-center px-8 max-w-lg w-full">
        {/* Radar animation */}
        <div className="relative w-48 h-48 mx-auto mb-10">
          {[0, 1, 2].map(i => (
            <div key={i} className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(59,170,103,0.12)',
                animation: `ping 2s ease-out ${i * 0.5}s infinite`,
              }}></div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
              style={{ boxShadow: '0 0 48px rgba(59,170,103,0.5)' }}>
              <Zap className="w-14 h-14 text-white" fill="white" />
            </div>
          </div>
          {stage >= 2 && (
            <div className="absolute top-2 right-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center anim-fade">
              <span className="text-2xl">🛺</span>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-black text-white mb-3">
          {stage < 2 ? 'Finding Your Partner' : '🎉 Partner Found!'}
        </h2>
        <p className="text-green-300 text-base mb-10">{stages[stage]}</p>

        {/* Stage checklist */}
        <div className="space-y-3 mb-10">
          {[
            'Scanning nearby partners',
            'Verifying battery compatibility',
            'Partner matched & notified',
          ].map((label, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{ background: i <= stage ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: i < stage ? '#4ADE80' : i === stage ? '#22C55E' : 'rgba(255, 255, 255, 0.2)' }}>
                {i < stage ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <p className={`text-sm font-semibold ${i <= stage ? 'text-white' : 'text-green-300'}`}>{label}</p>
              {i === stage && i < 2 && (
                <div className="ml-auto loader" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: 'white', width: 20, height: 20, borderWidth: 3 }}></div>
              )}
            </div>
          ))}
        </div>

        {stage >= 2 && (
          <div className="rounded-2xl p-5 anim-slide-r" style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center font-black text-white text-xl shadow-lg">A</div>
              <div className="text-left">
                <p className="font-black text-white text-lg">Aakash Verma</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-green-300" />
                  <p className="text-green-300">1.2 km away · ETA 4 minutes</p>
                </div>
              </div>
              <CheckCircle className="ml-auto w-8 h-8 text-green-400" fill="#4ade80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
