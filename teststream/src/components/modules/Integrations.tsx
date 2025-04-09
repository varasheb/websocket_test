
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  ShoppingCart as EcommerceIcon,
  LocalShipping as ShippingIcon,
  AccountBalance as AccountingIcon,
  Payment as PaymentIcon,
  AddCircle as AddIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Sync as SyncIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface Integration {
  id: string;
  name: string;
  type: 'ecommerce' | 'shipping' | 'accounting' | 'payment';
  provider: string;
  status: 'active' | 'inactive' | 'error';
  description: string;
  lastSync?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Shopify Store',
    type: 'ecommerce',
    provider: 'shopify',
    status: 'active',
    description: 'Sync inventory, orders, and products with your Shopify store.',
    lastSync: '2023-05-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Amazon Marketplace',
    type: 'ecommerce',
    provider: 'amazon',
    status: 'active',
    description: 'Connect to Amazon Seller Central to manage inventory and orders.',
    lastSync: '2023-05-10T12:15:00Z'
  },
  {
    id: '3',
    name: 'eBay Store',
    type: 'ecommerce',
    provider: 'ebay',
    status: 'error',
    description: 'Sync with eBay to manage listings and orders.',
    lastSync: '2023-05-09T09:45:00Z'
  },
  {
    id: '4',
    name: 'QuickBooks Online',
    type: 'accounting',
    provider: 'quickbooks',
    status: 'active',
    description: 'Sync invoices, bills, and inventory transactions with QuickBooks.',
    lastSync: '2023-05-10T08:30:00Z'
  },
  {
    id: '5',
    name: 'UPS Shipping',
    type: 'shipping',
    provider: 'ups',
    status: 'active',
    description: 'Generate shipping labels and track shipments with UPS.',
    lastSync: '2023-05-10T10:45:00Z'
  },
  {
    id: '6',
    name: 'Stripe Payments',
    type: 'payment',
    provider: 'stripe',
    status: 'inactive',
    description: 'Process payments and manage subscriptions with Stripe.'
  }
];

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'settings'>('add');

  const handleOpenDialog = (type: 'add' | 'edit' | 'settings', integration?: Integration) => {
    setDialogType(type);
    setSelectedIntegration(integration || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedIntegration(null);
  };

  const handleSync = (id: string) => {
    // In a real app, this would trigger a sync with the integration
    console.log(`Syncing integration ${id}`);
    
    // Update last sync time
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, lastSync: new Date().toISOString() } 
        : integration
    ));
  };

  const handleToggleStatus = (id: string) => {
    // In a real app, this would activate/deactivate the integration
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, status: integration.status === 'active' ? 'inactive' : 'active' } 
        : integration
    ));
  };

  const getIntegrationIcon = (type: string) => {
    switch(type) {
      case 'ecommerce':
        return <EcommerceIcon fontSize="large" />;
      case 'shipping':
        return <ShippingIcon fontSize="large" />;
      case 'accounting':
        return <AccountingIcon fontSize="large" />;
      case 'payment':
        return <PaymentIcon fontSize="large" />;
      default:
        return <EcommerceIcon fontSize="large" />;
    }
  };

  const getStatusChip = (status: string) => {
    switch(status) {
      case 'active':
        return <Chip icon={<CheckIcon />} label="Active" color="success" size="small" />;
      case 'inactive':
        return <Chip label="Inactive" color="default" size="small" />;
      case 'error':
        return <Chip icon={<ErrorIcon />} label="Error" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const getProviderName = (provider: string) => {
    switch(provider) {
      case 'shopify':
        return 'Shopify';
      case 'amazon':
        return 'Amazon';
      case 'ebay':
        return 'eBay';
      case 'quickbooks':
        return 'QuickBooks';
      case 'ups':
        return 'UPS';
      case 'stripe':
        return 'Stripe';
      default:
        return provider;
    }
  };

  return (
    <Box className="page-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Integrations
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
        >
          Add Integration
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Integration Types
            </Typography>
            <List component="nav">
              <ListItem button>
                <ListItemIcon>
                  <EcommerceIcon />
                </ListItemIcon>
                <ListItemText primary="E-commerce Platforms" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Shipping Carriers" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountingIcon />
                </ListItemIcon>
                <ListItemText primary="Accounting Software" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Payment Processors" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant="h6" gutterBottom>
            Active Integrations
          </Typography>
          <Grid container spacing={3}>
            {integrations.map((integration) => (
              <Grid item xs={12} md={6} lg={4} key={integration.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 2, color: 'primary.main' }}>
                        {getIntegrationIcon(integration.type)}
                      </Box>
                      <Box>
                        <Typography variant="h6" component="div">
                          {integration.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getProviderName(integration.provider)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      {getStatusChip(integration.status)}
                      <FormControlLabel
                        control={
                          <Switch 
                            size="small" 
                            checked={integration.status === 'active'}
                            onChange={() => handleToggleStatus(integration.id)}
                          />
                        }
                        label=""
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {integration.description}
                    </Typography>
                    {integration.lastSync && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Last synced: {new Date(integration.lastSync).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<SyncIcon />}
                      onClick={() => handleSync(integration.id)}
                      disabled={integration.status !== 'active'}
                    >
                      Sync Now
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<SettingsIcon />}
                      onClick={() => handleOpenDialog('settings', integration)}
                    >
                      Settings
                    </Button>
                    <Button 
                      size="small" 
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Add/Edit Integration Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'add' && 'Add New Integration'}
          {dialogType === 'edit' && 'Edit Integration'}
          {dialogType === 'settings' && `${selectedIntegration?.name} Settings`}
        </DialogTitle>
        <DialogContent>
          {(dialogType === 'add' || dialogType === 'edit') && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Integration Name"
                  variant="outlined"
                  defaultValue={selectedIntegration?.name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Integration Type</InputLabel>
                  <Select
                    label="Integration Type"
                    defaultValue={selectedIntegration?.type || 'ecommerce'}
                  >
                    <MenuItem value="ecommerce">E-commerce Platform</MenuItem>
                    <MenuItem value="shipping">Shipping Carrier</MenuItem>
                    <MenuItem value="accounting">Accounting Software</MenuItem>
                    <MenuItem value="payment">Payment Processor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Provider</InputLabel>
                  <Select
                    label="Provider"
                    defaultValue={selectedIntegration?.provider || ''}
                  >
                    <MenuItem value="shopify">Shopify</MenuItem>
                    <MenuItem value="amazon">Amazon</MenuItem>
                    <MenuItem value="ebay">eBay</MenuItem>
                    <MenuItem value="woocommerce">WooCommerce</MenuItem>
                    <MenuItem value="magento">Magento</MenuItem>
                    <MenuItem value="bigcommerce">BigCommerce</MenuItem>
                    <MenuItem value="ups">UPS</MenuItem>
                    <MenuItem value="fedex">FedEx</MenuItem>
                    <MenuItem value="usps">USPS</MenuItem>
                    <MenuItem value="dhl">DHL</MenuItem>
                    <MenuItem value="quickbooks">QuickBooks</MenuItem>
                    <MenuItem value="xero">Xero</MenuItem>
                    <MenuItem value="stripe">Stripe</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={selectedIntegration?.description || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  API Configuration
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API URL"
                  variant="outlined"
                  placeholder="https://api.example.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="API Key / Client ID"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="API Secret / Client Secret"
                  variant="outlined"
                  type="password"
                />
              </Grid>
            </Grid>
          )}

          {dialogType === 'settings' && selectedIntegration && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Sync Settings
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-sync inventory levels"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Automatically update inventory levels when changes occur.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-import orders"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Automatically import new orders from this integration.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Sync product information"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Sync product details, images, and descriptions.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Update shipping status"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Update shipping status on the platform when orders are shipped.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Sync Schedule
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sync Frequency</InputLabel>
                  <Select
                    label="Sync Frequency"
                    defaultValue="15"
                  >
                    <MenuItem value="5">Every 5 minutes</MenuItem>
                    <MenuItem value="15">Every 15 minutes</MenuItem>
                    <MenuItem value="30">Every 30 minutes</MenuItem>
                    <MenuItem value="60">Every hour</MenuItem>
                    <MenuItem value="360">Every 6 hours</MenuItem>
                    <MenuItem value="720">Every 12 hours</MenuItem>
                    <MenuItem value="1440">Once a day</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  API Configuration
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API URL"
                  variant="outlined"
                  defaultValue="https://api.example.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="API Key / Client ID"
                  variant="outlined"
                  defaultValue="••••••••••••••••"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="API Secret / Client Secret"
                  variant="outlined"
                  type="password"
                  defaultValue="••••••••••••••••"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<SyncIcon />}
                >
                  Test Connection
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            {dialogType === 'add' ? 'Add Integration' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Integrations;
