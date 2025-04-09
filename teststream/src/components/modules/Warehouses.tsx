
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
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  CompareArrows as TransferIcon
} from '@mui/icons-material';

import { mockWarehouses } from '../../data/mockData';
import { Warehouse } from '../../types';

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
      id={`warehouse-tabpanel-${index}`}
      aria-labelledby={`warehouse-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Warehouses: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenWarehouseDialog = (warehouse?: Warehouse) => {
    setSelectedWarehouse(warehouse || null);
    setWarehouseDialogOpen(true);
  };

  const handleCloseWarehouseDialog = () => {
    setWarehouseDialogOpen(false);
    setSelectedWarehouse(null);
  };

  const handleOpenTransferDialog = () => {
    setTransferDialogOpen(true);
  };

  const handleCloseTransferDialog = () => {
    setTransferDialogOpen(false);
  };

  // Filter warehouses based on search query
  const filteredWarehouses = mockWarehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="page-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Warehouses & Inventory Locations
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<TransferIcon />}
            sx={{ mr: 2 }}
            onClick={handleOpenTransferDialog}
          >
            Transfer Stock
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenWarehouseDialog()}
          >
            Add Warehouse
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Warehouses" id="warehouse-tab-0" />
          <Tab label="Bins & Zones" id="warehouse-tab-1" />
          <Tab label="Stock Adjustments" id="warehouse-tab-2" />
          <Tab label="Transfer History" id="warehouse-tab-3" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search warehouses..."
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
          <Grid container spacing={3}>
            {filteredWarehouses.map((warehouse) => (
              <Grid item xs={12} md={6} lg={4} key={warehouse.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {warehouse.name}
                      </Typography>
                      {warehouse.isDefault && (
                        <Chip label="Default" size="small" color="primary" />
                      )}
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Code: {warehouse.code}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      <LocationIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {warehouse.address.street1}, {warehouse.address.city}, {warehouse.address.state} {warehouse.address.postalCode}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2">
                      Contact: {warehouse.contactPerson}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {warehouse.contactPhone}
                    </Typography>
                    <Typography variant="body2">
                      Email: {warehouse.contactEmail}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2">
                      Bins/Zones: {warehouse.bins.length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpenWarehouseDialog(warehouse)}>
                      Edit
                    </Button>
                    <Button size="small" color="primary">
                      View Inventory
                    </Button>
                    <Button size="small" color="error">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" paragraph>
            Manage bins and zones within your warehouses for more granular inventory control.
          </Typography>
          
          {filteredWarehouses.map((warehouse) => (
            <Paper key={warehouse.id} sx={{ mb: 3, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {warehouse.name} - Bins/Zones
              </Typography>
              <List>
                {warehouse.bins.map((bin) => (
                  <React.Fragment key={bin.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <Tooltip title="Edit">
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={bin.name}
                        secondary={`Code: ${bin.code}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <Button startIcon={<AddIcon />} variant="outlined">
                  Add Bin/Zone
                </Button>
              </Box>
            </Paper>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph>
            Record inventory adjustments for damages, shrinkage, or other discrepancies.
          </Typography>
          
          <Button startIcon={<AddIcon />} variant="contained" sx={{ mb: 3 }}>
            New Stock Adjustment
          </Button>
          
          <Typography variant="body1">
            Recent adjustments will be listed here.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="body1" paragraph>
            View history of inventory transfers between warehouses.
          </Typography>
          
          <Typography variant="body1">
            Transfer history will be listed here.
          </Typography>
        </TabPanel>
      </Paper>

      {/* Warehouse Dialog */}
      <Dialog open={warehouseDialogOpen} onClose={handleCloseWarehouseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Warehouse Name"
                variant="outlined"
                defaultValue={selectedWarehouse?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Warehouse Code"
                variant="outlined"
                defaultValue={selectedWarehouse?.code || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                variant="outlined"
                defaultValue={selectedWarehouse?.address.street1 || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                defaultValue={selectedWarehouse?.address.city || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                variant="outlined"
                defaultValue={selectedWarehouse?.address.state || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                variant="outlined"
                defaultValue={selectedWarehouse?.address.postalCode || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                defaultValue={selectedWarehouse?.address.country || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person"
                variant="outlined"
                defaultValue={selectedWarehouse?.contactPerson || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                variant="outlined"
                defaultValue={selectedWarehouse?.contactPhone || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Email"
                variant="outlined"
                defaultValue={selectedWarehouse?.contactEmail || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarehouseDialog}>Cancel</Button>
          <Button onClick={handleCloseWarehouseDialog} variant="contained" color="primary">
            {selectedWarehouse ? 'Save Changes' : 'Add Warehouse'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Stock Dialog */}
      <Dialog open={transferDialogOpen} onClose={handleCloseTransferDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Transfer Stock Between Warehouses
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="From Warehouse"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select warehouse</option>
                {mockWarehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="To Warehouse"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select warehouse</option>
                {mockWarehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Items to Transfer
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Item"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select item</option>
                <option value="1">Premium Smartphone</option>
                <option value="2">Wireless Earbuds</option>
                <option value="3">Laptop Backpack</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity to Transfer"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Quantity"
                variant="outlined"
                value="32"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Reason for transfer or additional details..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransferDialog}>Cancel</Button>
          <Button onClick={handleCloseTransferDialog} variant="contained" color="primary">
            Transfer Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Warehouses;
