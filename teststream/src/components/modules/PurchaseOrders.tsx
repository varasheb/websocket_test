
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
  LocalShipping as ReceiveIcon,
  MonetizationOn as BillIcon,
  Archive as ArchiveIcon,
  FileCopy as DuplicateIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

import { mockPurchaseOrders, mockVendors } from '../../data/mockData';
import { PurchaseOrder } from '../../types';

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
      id={`po-tabpanel-${index}`}
      aria-labelledby={`po-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PurchaseOrders: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  // Enrich purchase orders with vendor data
  const poWithVendors = mockPurchaseOrders.map(po => {
    const vendor = mockVendors.find(v => v.id === po.vendorId);
    return { ...po, vendorName: vendor?.name || 'Unknown Vendor' };
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, po: PurchaseOrder) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedPO(po);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  // Filter purchase orders based on search query and tab
  const filteredPOs = poWithVendors.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab/status
    if (tabValue === 0) return matchesSearch; // All POs
    if (tabValue === 1) return matchesSearch && ['draft', 'issued'].includes(po.status); // Open POs
    if (tabValue === 2) return matchesSearch && ['partially_received', 'received'].includes(po.status); // Received
    if (tabValue === 3) return matchesSearch && po.status === 'billed'; // Billed
    if (tabValue === 4) return matchesSearch && po.status === 'cancelled'; // Cancelled
    
    return matchesSearch;
  });

  // Status chip component
  const StatusChip = ({ status }: { status: string }) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
    let label = status.replace('_', ' ');
    
    switch(status) {
      case 'draft':
        color = 'default';
        break;
      case 'issued':
        color = 'primary';
        break;
      case 'partially_received':
        color = 'info';
        label = 'Partially Received';
        break;
      case 'received':
        color = 'success';
        break;
      case 'billed':
        color = 'secondary';
        break;
      case 'cancelled':
        color = 'error';
        break;
    }
    
    return (
      <Chip 
        label={label.charAt(0).toUpperCase() + label.slice(1)} 
        color={color}
        size="small"
      />
    );
  };

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: 'poNumber', headerName: 'PO #', width: 150 },
    { field: 'vendorName', headerName: 'Vendor', width: 200 },
    { 
      field: 'orderDate', 
      headerName: 'Order Date', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yyyy')}</Typography>
      )
    },
    { 
      field: 'expectedDeliveryDate', 
      headerName: 'Expected Delivery', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yyyy')}</Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 170,
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
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams<PurchaseOrder>) => (
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
          Purchase Orders
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Create Purchase Order
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All POs" id="po-tab-0" />
          <Tab label="Open" id="po-tab-1" />
          <Tab label="Received" id="po-tab-2" />
          <Tab label="Billed" id="po-tab-3" />
          <Tab label="Cancelled" id="po-tab-4" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by PO number or vendor..."
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
            rows={filteredPOs}
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
            rows={filteredPOs}
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
            rows={filteredPOs}
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
            rows={filteredPOs}
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
            rows={filteredPOs}
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
          <ListItemText>Edit PO</ListItemText>
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
          <ListItemText>Email to Vendor</ListItemText>
        </MenuItem>
        {selectedPO?.status === 'issued' && (
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <ReceiveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Receive Items</ListItemText>
          </MenuItem>
        )}
        {(selectedPO?.status === 'received' || selectedPO?.status === 'partially_received') && (
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <BillIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Create Bill</ListItemText>
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

export default PurchaseOrders;
