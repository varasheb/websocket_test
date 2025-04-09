
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  LocalShipping as ShipIcon,
  Archive as ArchiveIcon,
  FileCopy as DuplicateIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

import { mockSalesOrders, mockCustomers } from '../../data/mockData';
import { SalesOrder } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orders-tabpanel-${index}`}
      aria-labelledby={`orders-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SalesOrders: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);

  // Enrich orders with customer data
  const ordersWithCustomers = mockSalesOrders.map(order => {
    const customer = mockCustomers.find(c => c.id === order.customerId);
    return { ...order, customerName: customer?.name || 'Unknown Customer' };
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, order: SalesOrder) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  // Filter orders based on search query and tab
  const filteredOrders = ordersWithCustomers.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab/status
    if (tabValue === 0) return matchesSearch; // All orders
    if (tabValue === 1) return matchesSearch && ['draft', 'confirmed'].includes(order.status); // Open orders
    if (tabValue === 2) return matchesSearch && ['packed', 'shipped'].includes(order.status); // In Progress
    if (tabValue === 3) return matchesSearch && order.status === 'delivered'; // Delivered
    if (tabValue === 4) return matchesSearch && order.status === 'cancelled'; // Cancelled
    
    return matchesSearch;
  });

  // Status chip component
  const StatusChip = ({ status }: { status: string }) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
    
    switch(status) {
      case 'draft':
        color = 'default';
        break;
      case 'confirmed':
        color = 'primary';
        break;
      case 'packed':
        color = 'info';
        break;
      case 'shipped':
        color = 'warning';
        break;
      case 'delivered':
        color = 'success';
        break;
      case 'cancelled':
        color = 'error';
        break;
    }
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={color}
        size="small"
      />
    );
  };

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: 'Order #', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 200 },
    { 
      field: 'orderDate', 
      headerName: 'Order Date', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yyyy')}</Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <StatusChip status={params.value} />
      )
    },
    { 
      field: 'total', 
      headerName: 'Total', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>${params.value.toFixed(2)}</Typography>
      )
    },
    { 
      field: 'salesChannel', 
      headerName: 'Channel', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value.replace('_', ' ').toUpperCase()} 
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams<SalesOrder>) => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton 
            size="small"
            onClick={(event) => handleActionMenuOpen(event, params.row)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box className="page-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Sales Orders
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Create Sales Order
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Orders" id="orders-tab-0" />
          <Tab label="Open" id="orders-tab-1" />
          <Tab label="In Progress" id="orders-tab-2" />
          <Tab label="Delivered" id="orders-tab-3" />
          <Tab label="Cancelled" id="orders-tab-4" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by order number or customer..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TabPanel value={tabValue} index={0}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Order</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email to Customer</ListItemText>
        </MenuItem>
        {selectedOrder?.status === 'confirmed' && (
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <ShipIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mark as Shipped</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SalesOrders;
