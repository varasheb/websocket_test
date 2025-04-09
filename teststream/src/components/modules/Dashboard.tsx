
import React from 'react';
import { mockSalesData, mockAlerts, mockRecentOrders } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const totalItems = 1243;
  const totalSales = 24500;
  const pendingOrders = 18;
  const lowStockItems = 7;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex flex-col">
            <span className="text-lg font-medium opacity-90">Total Items</span>
            <span className="text-3xl font-bold mt-2">{totalItems}</span>
            <span className="mt-2 text-sm opacity-80">Across all warehouses</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex flex-col">
            <span className="text-lg font-medium opacity-90">Total Sales</span>
            <span className="text-3xl font-bold mt-2">${totalSales.toLocaleString()}</span>
            <span className="mt-2 text-sm opacity-80">Last 30 days</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex flex-col">
            <span className="text-lg font-medium opacity-90">Pending Orders</span>
            <span className="text-3xl font-bold mt-2">{pendingOrders}</span>
            <span className="mt-2 text-sm opacity-80">Awaiting fulfillment</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex flex-col">
            <span className="text-lg font-medium opacity-90">Low Stock Items</span>
            <span className="text-3xl font-bold mt-2">{lowStockItems}</span>
            <span className="mt-2 text-sm opacity-80">Below reorder point</span>
          </div>
        </div>
      </div>
      
      {/* Chart and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-800">Sales vs Purchases</h2>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Sales Chart Placeholder</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Recent Alerts</h2>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {mockAlerts.slice(0, 4).map((alert, index) => (
              <div key={index} className="flex items-start">
                <div className={`alert-badge ${alert.type} mr-3 mt-1`}>{alert.type}</div>
                <div>
                  <h3 className="font-medium text-gray-800">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-sm text-primary font-medium">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">#{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">${order.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
