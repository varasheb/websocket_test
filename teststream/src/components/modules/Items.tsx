
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CloneIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

import { mockItems, mockWarehouses, mockVendors } from '../../data/mockData';
import { Item } from '../../types';

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
      id={`item-tabpanel-${index}`}
      aria-labelledby={`item-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Items: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemDialogMode, setItemDialogMode] = useState<'add' | 'edit'>('add');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenItemDialog = (mode: 'add' | 'edit', item?: Item) => {
    setItemDialogMode(mode);
    setSelectedItem(item || null);
    setOpenItemDialog(true);
  };

  const handleCloseItemDialog = () => {
    setOpenItemDialog(false);
    setSelectedItem(null);
  };

  const handleSaveItem = () => {
    // In a real app, this would save the item to the backend
    console.log('Saving item:', selectedItem);
    handleCloseItemDialog();
  };

  // Filter items based on search query
  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // DataGrid columns for Items
  const itemColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 130 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { 
      field: 'unitPrice', 
      headerName: 'Unit Price', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>${params.value.toFixed(2)}</Typography>
      )
    },
    { 
      field: 'availableStock', 
      headerName: 'Available', 
      width: 120,
      renderCell: (params: GridRenderCellParams<Item>) => {
        const item = params.row;
        const isLowStock = item.availableStock <= item.reorderPoint;
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{item.availableStock}</Typography>
            {isLowStock && (
              <Tooltip title="Below reorder point">
                <WarningIcon color="warning" fontSize="small" sx={{ ml: 1 }} />
              </Tooltip>
            )}
          </Box>
        );
      }
    },
    { field: 'committedStock', headerName: 'Committed', width: 120 },
    { field: 'stockOnHand', headerName: 'On Hand', width: 120 },
    {
      field: 'tracking',
      headerName: 'Tracking',
      width: 200,
      renderCell: (params: GridRenderCellParams<Item>) => {
        const item = params.row;
        return (
          <Box>
            {item.batchTracking && <Chip label="Batch" size="small" color="primary" sx={{ mr: 0.5 }} />}
            {item.serialTracking && <Chip label="Serial" size="small" color="secondary" />}
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params: GridRenderCellParams<Item>) => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => handleOpenItemDialog('edit', params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clone">
            <IconButton size="small">
              <CloneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // DataGrid columns for Item Bundles
  const bundleColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 130 },
    { field: 'name', headerName: 'Name', width: 200 },
    { 
      field: 'unitPrice', 
      headerName: 'Bundle Price', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>${params.value.toFixed(2)}</Typography>
      )
    },
    { 
      field: 'items', 
      headerName: 'Items in Bundle', 
      width: 200,
      renderCell: () => (
        <Typography>Multiple Items</Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: () => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clone">
            <IconButton size="small">
              <CloneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box className="page-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Inventory Items
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenItemDialog('add')}
        >
          Add New Item
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Items" id="item-tab-0" />
          <Tab label="Item Bundles" id="item-tab-1" />
          <Tab label="Categories" id="item-tab-2" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search items by name, SKU, or category..."
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
            rows={filteredItems}
            columns={itemColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
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
            rows={[]} // In a real app, this would be populated with bundle data
            columns={bundleColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1">
            Item categories management would be implemented here.
          </Typography>
        </TabPanel>
      </Paper>

      {/* Add/Edit Item Dialog */}
      <Dialog open={openItemDialog} onClose={handleCloseItemDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {itemDialogMode === 'add' ? 'Add New Item' : 'Edit Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name"
                variant="outlined"
                value={selectedItem?.name || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                variant="outlined"
                value={selectedItem?.sku || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, sku: e.target.value} : null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={selectedItem?.description || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, description: e.target.value} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedItem?.category || ''}
                  label="Category"
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, category: e.target.value} : null)}
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                  <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Preferred Vendor</InputLabel>
                <Select
                  value={selectedItem?.preferredVendorId || ''}
                  label="Preferred Vendor"
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, preferredVendorId: e.target.value} : null)}
                >
                  {mockVendors.map(vendor => (
                    <MenuItem key={vendor.id} value={vendor.id}>{vendor.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Price"
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={selectedItem?.unitPrice || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, unitPrice: parseFloat(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cost Price"
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={selectedItem?.costPrice || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, costPrice: parseFloat(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                variant="outlined"
                type="number"
                value={selectedItem?.taxRate || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, taxRate: parseFloat(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Reorder Point"
                variant="outlined"
                type="number"
                value={selectedItem?.reorderPoint || ''}
                onChange={(e) => setSelectedItem(prev => prev ? {...prev, reorderPoint: parseInt(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Initial Warehouse</InputLabel>
                <Select
                  label="Initial Warehouse"
                  defaultValue=""
                >
                  {mockWarehouses.map(warehouse => (
                    <MenuItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={selectedItem?.batchTracking || false}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, batchTracking: e.target.checked} : null)}
                  />
                }
                label="Batch Tracking"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={selectedItem?.serialTracking || false}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, serialTracking: e.target.checked} : null)}
                  />
                }
                label="Serial Number Tracking"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItemDialog}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained" color="primary">
            {itemDialogMode === 'add' ? 'Add Item' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Items;
