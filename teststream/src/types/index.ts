
// Common Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Item {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  taxRate: number;
  batchTracking: boolean;
  serialTracking: boolean;
  reorderPoint: number;
  preferredVendorId: string;
  availableStock: number;
  committedStock: number;
  stockOnHand: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItemBundle {
  id: string;
  name: string;
  description: string;
  sku: string;
  bundleItems: BundleItem[];
  unitPrice: number;
  active: boolean;
}

export interface BundleItem {
  itemId: string;
  quantity: number;
  item?: Item;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: Address;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  isDefault: boolean;
  bins: WarehouseBin[];
  active: boolean;
}

export interface WarehouseBin {
  id: string;
  name: string;
  code: string;
  warehouseId: string;
}

export interface InventoryLevel {
  itemId: string;
  warehouseId: string;
  quantity: number;
  committedQuantity: number;
  reorderPoint: number;
  binId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  taxId: string;
  creditTerms: number;
  defaultCurrency: string;
  averageLeadTime: number;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  billingAddress: Address;
  shippingAddress: Address;
  taxId: string;
  creditLimit: number;
  paymentTerms: number;
  customerType: 'retail' | 'wholesale' | 'distributor';
  active: boolean;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  orderDate: string;
  dueDate: string;
  status: 'draft' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  trackingNumber?: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  notes?: string;
  salesChannel: 'direct' | 'amazon' | 'ebay' | 'shopify' | 'b2b' | 'retail';
  externalOrderId?: string;
  createdAt: string;
  updatedAt: string;
  paidAmount: number;
  balanceDue: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendor?: Vendor;
  orderDate: string;
  expectedDeliveryDate: string;
  status: 'draft' | 'issued' | 'partially_received' | 'received' | 'billed' | 'cancelled';
  items: OrderItem[];
  deliveryAddress: Address;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  paidAmount: number;
  balanceDue: number;
}

export interface OrderItem {
  id: string;
  itemId: string;
  item?: Item;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  warehouseId?: string;
  binId?: string;
  receivedQuantity?: number;
}

export interface InventoryTransaction {
  id: string;
  transactionType: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  itemId: string;
  quantity: number;
  sourceWarehouseId?: string;
  destinationWarehouseId?: string;
  sourceBinId?: string;
  destinationBinId?: string;
  referenceId?: string;
  referenceType?: 'sales_order' | 'purchase_order' | 'adjustment' | 'transfer';
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: 'low_stock' | 'stock_out' | 'overdue_shipment' | 'overdue_payment' | 'price_change';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  itemId?: string;
  warehouseId?: string;
  orderId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'ecommerce' | 'shipping' | 'accounting' | 'payment';
  provider: string;
  status: 'active' | 'inactive' | 'error';
  lastSyncTime?: string;
  settings: Record<string, any>;
}

export interface Report {
  id: string;
  name: string;
  type: 'inventory_valuation' | 'stock_movement' | 'sales_analysis' | 'purchase_analysis' | 'profitability';
  dateRange: {
    start: string;
    end: string;
  };
  filters: Record<string, any>;
  createdAt: string;
  createdBy: string;
}

// Dashboard Types
export interface DashboardSummary {
  totalOrders: number;
  totalItems: number;
  pendingOrders: number;
  fulfillmentRate: number;
  topSellingProducts: {
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }[];
  lowStockItems: {
    itemId: string;
    itemName: string;
    available: number;
    reorderPoint: number;
  }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    date: string;
    total: number;
    status: string;
  }[];
  salesVsPurchaseData: {
    period: string;
    sales: number;
    purchases: number;
  }[];
}
