# ⚡ Rydex — On-Demand Mobile EV Battery Swapping & Energy Logistics

<div align="center">

![Rydex Banner](https://img.shields.io/badge/Rydex-Energy%20%26%20Logistics-16A34A?style=for-the-badge&logo=bolt&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete%20Prototype-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<p align="center">
  <strong>Power when you need it. Anywhere.</strong><br>
  On-demand doorstep & roadside mobile battery swapping network designed for commercial EV 3-wheelers, e-rickshaws, and logistics fleets.
</p>

[Explore Customer Portal](#-customer-portal-flow) • [Explore Partner Portal](#-delivery-partner-portal-flow) • [Installation & Setup](#-getting-started) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

Commercial EV operators (such as e-rickshaw drivers and last-mile delivery riders) lose **2–4 earning hours every day** waiting in long queues at fixed swap stations or charging points.

**Rydex solves this downtime bottleneck** with an on-demand, mobile battery delivery and exchange platform. Instead of drivers searching for a station, **Rydex brings fully charged battery packs directly to their location within minutes.**

### 🌟 Key Highlights
- **Zero Station Queueing:** On-demand battery runner dispatched directly to the EV's live GPS coordinates.
- **Dual-Sided Unified Platform:** Complete portals for **EV Drivers (Customers)** and **Delivery Partners (Runners)**.
- **Secure 4-Digit Handshake OTP (`7842`):** Hardware swap unlock verification preventing fraudulent battery claims.
- **Hardware Compatibility Engine:** Auto-checks voltage (48V / 60V / 72V), capacity (2.5 – 3.5 kWh), and mount configuration (Type-A Top Handle vs. Slide-in).
- **100% Responsive Architecture:** Desktop dashboard experience and mobile bottom-sheet drawer with hamburger navigation.
- **Modular Component Styling:** Every single view has its own dedicated `.css` stylesheet alongside its `.jsx` component.

---

## 🛺 Customer Portal Flow

Designed for speed, low cognitive load, and accessibility in outdoor sunlight conditions:

1. **Live Battery Telemetry Dashboard:** Real-time SoC percentage gauge with proactive low-battery alerts (< 18%).
2. **Interactive 4-Step Swap Request:**
   - **Step 1:** Select EV vehicle type (E-Rickshaw 3W, Cargo Loader, Delivery 2W).
   - **Step 2:** Select required battery voltage and kWh capacity.
   - **Step 3:** Confirm pickup location on interactive OpenStreetMap.
   - **Step 4:** Real-time pricing review, instant cost breakdown, and runner dispatch trigger.
3. **Radar Dispatch Search:** Dynamic pulsating radar animation simulating runner proximity matching.
4. **Live Turn-by-Turn Tracking:** Track assigned delivery partner in real-time with live ETA, vehicle number, phone call shortcut, and bold 4-digit security swap code.
5. **Digital Payment Gateway:** Instant UPI, Rydex Wallet, or cash settlement with transparent tariffs.
6. **Swap History & Tax Invoices:** Lifetime metrics (Total Swaps, kWh charged, ₹ fuel savings, kg CO₂ offset) with printable digital invoice modal.
7. **Driver Profile & Vehicle Settings:** Manage vehicle registration, primary battery mount preference, and 24x7 SOS helpline desk.

---

## 🚴 Delivery Partner Portal Flow

A streamlined operating system for battery carrier riders:

1. **Partner Shift Console:** One-tap Online/Offline dispatch toggle switch with daily earnings overview.
2. **Incoming Order Dispatch Alert:** Audio-visual request card with customer distance, battery specs, and payout estimate.
3. **Hardware Compatibility Verification:** Ensures carrier stock battery matches customer's vehicle mount and voltage specs before acceptance.
4. **GPS Turn-by-Turn Route Navigation:** Integrated route map with live countdown timer, speed telemetry, and arrival triggers.
5. **Security Vault OTP Handshake:** 4-box auto-advancing security input with error shaking feedback to unlock battery dock.
6. **Physical Swap Execution Protocol:**
   - Hand over verified fully charged battery pack (**Slot B-101 · 100% SoC**).
   - Collect and secure depleted customer battery into carrier dock (**Slot B-106 · 14% SoC**).
7. **Carrier Battery Storage Telemetry:** Detailed dock view of all 6 on-board slots showing individual SoC %, State of Health (SoH %), operating temperature, and lock status.
8. **Partner Shift Settings:** Shift preferences, high-frequency GPS toggle, night surge incentives, and verified UPI bank payout account.

---

## 🛠 Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/), [JavaScript (ESNext)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| **Build Tool & Bundler** | [Vite 8](https://vite.dev/) with Fast HMR |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling & Design System**| Modular Vanilla CSS (BEM naming, custom CSS tokens, modern glassmorphism) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) |
| **Maps & Geospatial** | [Leaflet](https://leafletjs.com/) & OpenStreetMap tiles |
| **Linting & Code Quality** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Structure

```bash
Rydex/
├── public/                 # Static assets, SVG icons, and favicons
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/
│   │   ├── Layout.jsx      # Global Shell with Sidebar & Mobile Hamburger Drawer
│   │   └── Layout.css      # Responsive Shell, Drawer & Topbar styling
│   ├── context/
│   │   └── AppContext.jsx  # Global state (Role, Customer, Partner, Storage slots)
│   ├── pages/
│   │   ├── Login.jsx       # Split-screen responsive login with role selector
│   │   ├── Login.css       # Mobile bottom-sheet login styling
│   │   ├── customer/       # Customer Portal
│   │   │   ├── CustomerHome.jsx & .css       # Battery gauge & quick stats
│   │   │   ├── RequestBattery.jsx & .css     # 4-step battery booking flow
│   │   │   ├── FindingPartner.jsx & .css     # Radar dispatch simulation
│   │   │   ├── LiveTracking.jsx & .css       # GPS runner tracking & OTP
│   │   │   ├── PaymentScreen.jsx & .css      # UPI payment checkout
│   │   │   ├── SwapComplete.jsx & .css       # Completion invoice & rating
│   │   │   ├── CustomerHistory.jsx & .css    # Lifetime metrics & tax invoice
│   │   │   └── CustomerSettings.jsx & .css   # Vehicle & account settings
│   │   └── partner/        # Delivery Partner Portal
│   │       ├── PartnerDashboard.jsx & .css   # Shift console & dock preview
│   │       ├── PartnerRequest.jsx & .css     # Order card & hardware check
│   │       ├── PartnerNavigation.jsx & .css  # Turn-by-turn route & ETA
│   │       ├── OTPVerification.jsx & .css    # 4-digit security validation
│   │       ├── BatteryExchange.jsx & .css    # Handover & collection protocol
│   │       ├── PartnerDone.jsx & .css        # Swap payout & shift summary
│   │       ├── PartnerStorage.jsx & .css     # 6-slot dock telemetry
│   │       └── PartnerSettings.jsx & .css    # Shift preferences & UPI payout
│   ├── App.jsx             # Route definitions & provider tree
│   ├── index.css           # Global CSS variables and color tokens
│   └── main.jsx            # Application entrypoint
├── .gitignore              # Production gitignore rules
├── index.html              # HTML template
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite config
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher)
- [npm](https://www.npmjs.com/) (version `9.0.0` or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adarsh7203/Rydex.git
   cd Rydex
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔑 Demo Credentials & Quick Testing

Rydex includes ready-to-test prototype data for instantaneous evaluation without backend setup:

| Role | Login Selection | Default Route | Security Handshake OTP |
| :--- | :--- | :--- | :--- |
| **EV Driver (Customer)** | Tap **🛺 Customer** on Login | `/customer/home` | `7842` (Visible on tracking card) |
| **Delivery Partner** | Tap **🚴 Delivery Partner** on Login | `/partner/dashboard` | `7842` (Enter in OTP verification) |

---

## 🗺️ Roadmap & Future Enhancements

- [ ] **Live WebSockets & MQTT:** Real-time bi-directional telemetry streaming between partner and customer.
- [ ] **Smart BMS Integration:** Hardware CAN bus connection to read voltage, cell temperature, and cycle degradation dynamically.
- [ ] **Production Payment Gateway:** Integration with Razorpay UPI Autopay and Cashfree escrow settlements.
- [ ] **Fleet Analytics Dashboard:** Web portal for fleet supervisors to manage battery inventories across urban charging hubs.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for research, prototype, or production purposes.

---

<div align="center">
  <sub>Built with 💚 for clean, sustainable urban electric mobility.</sub>
</div>
