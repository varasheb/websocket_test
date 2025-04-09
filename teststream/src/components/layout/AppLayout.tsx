
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  BellAlertIcon,
  Cog6ToothIcon,
  PuzzlePieceIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const drawerWidth = 240;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/' },
    { text: 'Items', icon: <ShoppingBagIcon className="h-5 w-5" />, path: '/items' },
    { text: 'Sales Orders', icon: <ShoppingCartIcon className="h-5 w-5" />, path: '/sales-orders' },
    { text: 'Purchase Orders', icon: <TruckIcon className="h-5 w-5" />, path: '/purchase-orders' },
    { text: 'Warehouses', icon: <BuildingStorefrontIcon className="h-5 w-5" />, path: '/warehouses' },
    { text: 'Reports', icon: <ChartBarIcon className="h-5 w-5" />, path: '/reports' },
    { text: 'Alerts', icon: <BellAlertIcon className="h-5 w-5" />, path: '/alerts', badge: 4 },
    { text: 'Settings', icon: <Cog6ToothIcon className="h-5 w-5" />, path: '/settings' },
    { text: 'Integrations', icon: <PuzzlePieceIcon className="h-5 w-5" />, path: '/integrations' },
  ];

  const drawer = (
    <div className="h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-primary">Inventory System</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.text} className="px-3 py-1">
            <button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`w-full text-left nav-link ${
                location.pathname === item.path ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
              {item.badge && (
                <span className="ml-auto bg-danger text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {item.badge}
                </span>
              )}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-20 md:hidden" 
          onClick={handleDrawerToggle}
        />
      )}

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {drawer}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        {drawer}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={handleDrawerToggle}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-medium text-gray-800 ml-2">
                {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleNotifications}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
                >
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-danger-dark font-medium">Low stock alert: Widget A (2 remaining)</p>
                        <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                      </button>
                      
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-danger-dark font-medium">Stock out: Premium Gadget</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </button>
                      
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-warning-dark font-medium">Order #1234 is overdue for shipping</p>
                        <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                      </button>
                      
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50">
                        <p className="text-sm text-warning-dark font-medium">3 purchase orders awaiting approval</p>
                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                      </button>
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button 
                        onClick={() => {
                          navigate('/alerts');
                          setNotificationsOpen(false);
                        }}
                        className="text-sm text-primary font-medium"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white">
                    A
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200">
                    <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                      <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
