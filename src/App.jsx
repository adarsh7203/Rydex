import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css';

// Pages
import Login from './pages/Login';
import CustomerHome from './pages/customer/CustomerHome';
import RequestBattery from './pages/customer/RequestBattery';
import FindingPartner from './pages/customer/FindingPartner';
import LiveTracking from './pages/customer/LiveTracking';
import PaymentScreen from './pages/customer/PaymentScreen';
import SwapComplete from './pages/customer/SwapComplete';
import CustomerHistory from './pages/customer/CustomerHistory';
import CustomerSettings from './pages/customer/CustomerSettings';

import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerRequest from './pages/partner/PartnerRequest';
import PartnerNavigation from './pages/partner/PartnerNavigation';
import OTPVerification from './pages/partner/OTPVerification';
import BatteryExchange from './pages/partner/BatteryExchange';
import PartnerDone from './pages/partner/PartnerDone';
import PartnerStorage from './pages/partner/PartnerStorage';
import PartnerSettings from './pages/partner/PartnerSettings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Customer Routes */}
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/request" element={<RequestBattery />} />
          <Route path="/customer/finding" element={<FindingPartner />} />
          <Route path="/customer/tracking" element={<LiveTracking />} />
          <Route path="/customer/payment" element={<PaymentScreen />} />
          <Route path="/customer/complete" element={<SwapComplete />} />
          <Route path="/customer/history" element={<CustomerHistory />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />

          {/* Partner Routes */}
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner/request" element={<PartnerRequest />} />
          <Route path="/partner/navigation" element={<PartnerNavigation />} />
          <Route path="/partner/otp" element={<OTPVerification />} />
          <Route path="/partner/exchange" element={<BatteryExchange />} />
          <Route path="/partner/done" element={<PartnerDone />} />
          <Route path="/partner/storage" element={<PartnerStorage />} />
          <Route path="/partner/settings" element={<PartnerSettings />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
