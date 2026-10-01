import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Layout.css';
import {
  Zap, Home, Battery, MapPin, History,
  Truck, LayoutDashboard, Package, LogOut,
  Bell, ChevronDown, User, Settings,
  Menu, X
} from 'lucide-react';

const customerNav = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: Battery, label: 'Request Battery', path: '/customer/request' },
  { icon: MapPin, label: 'Track Request', path: '/customer/tracking' },
  { icon: History, label: 'History', path: '/customer/history' },
];

const partnerNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/partner/dashboard' },
  { icon: Package, label: 'Active Request', path: '/partner/request' },
  { icon: MapPin, label: 'Navigation', path: '/partner/navigation' },
  { icon: Battery, label: 'Battery Storage', path: '/partner/storage' },
];

export default function Layout({ children }) {
  const { role, setRole, customer, partner, partnerOnline } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = role === 'customer' ? customerNav : partnerNav;
  const name = role === 'customer' ? customer?.name : partner?.name;

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {/* ── Mobile Backdrop ── */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="sidebar-logo__icon">
                <Zap className="w-5 h-5 text-green-300" fill="#86EFAC" />
              </div>
              <div className="sidebar-logo__wordmark">
                <h1>RYDEX</h1>
                <p>Energy & Logistics</p>
              </div>
            </div>
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role badge */}
        <div style={{ padding: '14px 16px 6px' }}>
          <div className={`sidebar-role-pill ${role === 'customer' ? 'sidebar-role-pill--customer' : 'sidebar-role-pill--partner'}`}>
            {role === 'customer' ? <User className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
            <span>{role === 'customer' ? 'Customer Panel' : 'Partner Panel'}</span>
            {role === 'partner' && (
              <span className="sidebar-role-pill__status">
                <span className="sidebar-role-pill__dot" style={{ background: partnerOnline ? '#4ade80' : '#9ca3af' }}></span>
                <span>{partnerOnline ? 'Online' : 'Offline'}</span>
              </span>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav__label">Navigation</span>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate(item.path);
                }}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="icon" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="sidebar-nav__divider"></div>
          <span className="sidebar-nav__label">Account</span>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate(role === 'customer' ? '/customer/settings' : '/partner/settings');
            }}
            className={`sidebar-item ${location.pathname === '/customer/settings' || location.pathname === '/partner/settings' ? 'active' : ''}`}
          >
            <Settings className="icon" />
            <span>Settings</span>
          </button>
        </nav>

        {/* User profile footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer__user">
            <div className="sidebar-footer__avatar">
              {name?.charAt(0) || 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="sidebar-footer__name">{name}</p>
              <p className="sidebar-footer__role">
                {role === 'customer' ? 'E-Rickshaw Driver' : 'Delivery Partner'}
              </p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="sidebar-item sidebar-item--logout">
            <LogOut className="icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__left">
            <button
              type="button"
              className="topbar__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div className="topbar__titles">
              <h1 className="topbar__title">
                {location.pathname.endsWith('/settings')
                  ? 'Settings & Profile'
                  : navItems.find(n => n.path === location.pathname)?.label || 'Rydex'}
              </h1>
              <p className="topbar__subtitle">
                {role === 'customer' ? 'EV 3-Wheeler · 48V / 3.2 kWh' : `ID: ${partner?.partnerId}`}
              </p>
            </div>
          </div>
          <div className="topbar__actions">
            <button type="button" className="topbar__bell" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="topbar__bell-dot"></div>
            </button>
            <div className="topbar__user-wrapper" ref={userMenuRef} style={{ position: 'relative' }}>
              <div
                className="topbar__user"
                onClick={() => setUserMenuOpen(prev => !prev)}
                role="button"
                tabIndex={0}
              >
                <div className="topbar__user-avatar">
                  {name?.charAt(0) || 'U'}
                </div>
                <span className="topbar__user-name">{name?.split(' ')[0]}</span>
                <ChevronDown
                  className="w-4 h-4 text-gray-400"
                  style={{
                    transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>

              {userMenuOpen && (
                <div className="topbar__user-menu">
                  <div className="topbar__user-menu-header">
                    <p className="topbar__user-menu-name">{name}</p>
                    <p className="topbar__user-menu-sub">
                      {role === 'customer' ? 'E-Rickshaw Driver · Lucknow' : 'Delivery Partner · Lucknow Fleet'}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="topbar__menu-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate(role === 'customer' ? '/customer/settings' : '/partner/settings');
                    }}
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>Settings & Profile</span>
                  </button>

                  {role === 'partner' && (
                    <button
                      type="button"
                      className="topbar__menu-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/partner/storage');
                      }}
                    >
                      <Battery className="w-4 h-4 text-gray-500" />
                      <span>Battery Storage Dock</span>
                    </button>
                  )}

                  {role === 'customer' && (
                    <button
                      type="button"
                      className="topbar__menu-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/customer/history');
                      }}
                    >
                      <History className="w-4 h-4 text-gray-500" />
                      <span>Swap History</span>
                    </button>
                  )}

                  {role === 'customer' && (
                    <button
                      type="button"
                      className="topbar__menu-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/customer/request');
                      }}
                    >
                      <Battery className="w-4 h-4 text-gray-500" />
                      <span>Request New Battery</span>
                    </button>
                  )}

                  <div className="topbar__menu-divider"></div>

                  <button
                    type="button"
                    className="topbar__menu-item logout"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-body">
          {children}
        </main>
      </div>
    </div>
  );
}
