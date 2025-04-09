
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import Dashboard from './components/modules/Dashboard';
import Items from './components/modules/Items';
import SalesOrders from './components/modules/SalesOrders';
import PurchaseOrders from './components/modules/PurchaseOrders';
import Warehouses from './components/modules/Warehouses';
import Reports from './components/modules/Reports';
import Alerts from './components/modules/Alerts';
import Settings from './components/modules/Settings';
import Integrations from './components/modules/Integrations';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/sales-orders" element={<SalesOrders />} />
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/integrations" element={<Integrations />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
