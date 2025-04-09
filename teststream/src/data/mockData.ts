
export const mockSalesData = [
  { month: 'Jan', sales: 4000, purchases: 2400 },
  { month: 'Feb', sales: 3000, purchases: 1398 },
  { month: 'Mar', sales: 5000, purchases: 3800 },
  { month: 'Apr', sales: 2780, purchases: 3908 },
  { month: 'May', sales: 1890, purchases: 4800 },
  { month: 'Jun', sales: 2390, purchases: 3800 },
  { month: 'Jul', sales: 3490, purchases: 4300 },
];

export const mockAlerts = [
  {
    id: 1,
    type: 'danger',
    title: 'Stock Out Alert',
    description: 'Premium Gadget is out of stock in Warehouse A'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    description: 'Widget A is below reorder point (2 remaining)'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Order Overdue',
    description: 'Order #1234 is overdue for shipping by 2 days'
  },
  {
    id: 4,
    type: 'danger',
    title: 'Stock Discrepancy',
    description: 'Inventory count mismatch for Product X in Warehouse B'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Pending Approval',
    description: '3 purchase orders awaiting approval'
  },
];

export const mockRecentOrders = [
  {
    id: '1234',
    customer: 'Acme Corp',
    date: '2023-05-12',
    amount: '1,250.00',
    status: 'Completed'
  },
  {
    id: '1235',
    customer: 'TechStart Inc',
    date: '2023-05-11',
    amount: '3,420.50',
    status: 'Processing'
  },
  {
    id: '1236',
    customer: 'Global Supplies',
    date: '2023-05-10',
    amount: '820.75',
    status: 'Pending'
  },
  {
    id: '1237',
    customer: 'Metro Retail',
    date: '2023-05-09',
    amount: '1,640.30',
    status: 'Cancelled'
  },
  {
    id: '1238',
    customer: 'City Distributors',
    date: '2023-05-08',
    amount: '2,780.00',
    status: 'Completed'
  },
];

export const mockItems = [
  {
    id: 1,
    name: 'Premium Gadget',
    sku: 'PG-001',
    category: 'Electronics',
    inStock: 0,
    committed: 0,
    available: 0,
    reorderPoint: 10,
    reorderQty: 25,
    unitPrice: 199.99
  },
  {
    id: 2,
    name: 'Widget A',
    sku: 'WA-100',
    category: 'Components',
    inStock: 2,
    committed: 0,
    available: 2,
    reorderPoint: 15,
    reorderQty: 30,
    unitPrice: 24.95
  },
  {
    id: 3,
    name: 'Deluxe Package',
    sku: 'DP-200',
    category: 'Bundles',
    inStock: 18,
    committed: 5,
    available: 13,
    reorderPoint: 10,
    reorderQty: 10,
    unitPrice: 149.50
  },
  {
    id: 4,
    name: 'Budget Option',
    sku: 'BO-300',
    category: 'Electronics',
    inStock: 32,
    committed: 8,
    available: 24,
    reorderPoint: 20,
    reorderQty: 40,
    unitPrice: 99.99
  },
  {
    id: 5,
    name: 'Connector B',
    sku: 'CB-400',
    category: 'Components',
    inStock: 120,
    committed: 20,
    available: 100,
    reorderPoint: 50,
    reorderQty: 100,
    unitPrice: 4.99
  },
];

export const mockWarehouses = [
  {
    id: 1,
    name: 'Warehouse A',
    location: 'New York, NY',
    itemCount: 342,
    totalValue: 125000
  },
  {
    id: 2,
    name: 'Warehouse B',
    location: 'Los Angeles, CA',
    itemCount: 518,
    totalValue: 215000
  },
  {
    id: 3,
    name: 'Warehouse C',
    location: 'Chicago, IL',
    itemCount: 283,
    totalValue: 98000
  },
  {
    id: 4,
    name: 'Distribution Center',
    location: 'Dallas, TX',
    itemCount: 892,
    totalValue: 320000
  },
];
