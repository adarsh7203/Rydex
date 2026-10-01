import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const DEMO_CUSTOMER = {
  name: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  email: 'ramesh@example.com',
  vehicleType: 'EV 3-Wheeler (E-Rickshaw)',
  batteryVoltage: '48V',
  batteryCapacity: '3.2 kWh',
  batteryType: 'Lithium-ion',
  batteryShape: 'Type A',
  location: { lat: 26.8467, lng: 80.9462, address: 'Hazratganj, Lucknow, UP' },
  requestId: 'RYD-2024-00142',
  otp: '7842',
};

export const DEMO_PARTNER = {
  name: 'Aakash Verma',
  partnerId: 'RYD-P-0091',
  vehicleId: 'UP-32-AB-4521',
  phone: '+91 87654 32109',
  rating: 4.8,
  totalSwaps: 247,
  todaySwaps: 6,
  todayEarnings: '₹1,240',
  distance: '1.2 km',
  eta: '4 mins',
  batteryId: 'RX-104',
  collectedBatteryId: 'RX-089',
  location: { lat: 26.8521, lng: 80.9389 },
  supportedBatteries: ['48V', '60V'],
  slots: [
    { id: 'B-101', status: 'full' },
    { id: 'B-102', status: 'full' },
    { id: 'B-103', status: 'empty' },
    { id: 'B-104', status: 'used' },
    { id: 'B-105', status: 'full' },
    { id: 'B-106', status: 'empty' },
  ],
};

export function AppProvider({ children }) {
  const [role, setRole] = useState(null); // 'customer' | 'partner'
  const [requestStatus, setRequestStatus] = useState('idle');
  // idle | finding | matched | accepted | on_the_way | arrived | otp_verified | payment | completed
  const [otpEntered, setOtpEntered] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [partnerOnline, setPartnerOnline] = useState(true);

  return (
    <AppContext.Provider value={{
      role, setRole,
      requestStatus, setRequestStatus,
      otpEntered, setOtpEntered,
      paymentDone, setPaymentDone,
      partnerOnline, setPartnerOnline,
      customer: DEMO_CUSTOMER,
      partner: DEMO_PARTNER,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
