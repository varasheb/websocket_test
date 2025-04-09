
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

import { mockAlerts } from '../../data/mockData';
import { Alert } from '../../types';

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
      id={`alert-tabpanel-${index}`}
      aria-labelledby={`alert-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Alerts: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertFilter, setAlertFilter] = useState<string>('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAlertFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlertFilter(event.target.value as string);
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  // Filter alerts based on tab and filter selection
  const filteredAlerts = mockAlerts.filter(alert => {
    if (tabValue === 0) { // All alerts
      if (alertFilter === 'all') return true;
      return alert.type === alertFilter;
    } else if (tabValue === 1) { // Unread alerts
      if (alertFilter === 'all') return !alert.isRead;
      return !alert.isRead && alert.type === alertFilter;
    } else { // Read alerts
      if (alertFilter === 'all') return alert.isRead;
      return alert.isRead && alert.type === alertFilter;
    }
  });

  // Get alert icon based on severity
  const getAlertIcon = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  // Get alert type label
  const getAlertTypeLabel = (type: string) => {
    switch(type) {
      case 'low_stock':
        return 'Low Stock';
      case 'stock_out':
        return 'Stock Out';
      case 'overdue_shipment':
        return 'Overdue Shipment';
      case 'overdue_payment':
        return 'Overdue Payment';
      case 'price_change':
        return 'Price Change';
      default:
        return type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1);
    }
  };

  // Get chip color based on severity
  const getChipColor = (severity: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch(severity) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box className="page-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Alerts & Notifications
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<SettingsIcon />}
            onClick={handleOpenSettings}
          >
            Alert Settings
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All Alerts" id="alert-tab-0" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Unread
                  <Chip 
                    label={mockAlerts.filter(a => !a.isRead).length} 
                    size="small" 
                    color="error" 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
              id="alert-tab-1" 
            />
            <Tab label="Read" id="alert-tab-2" />
          </Tabs>
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200, my: 1 }}>
            <InputLabel id="alert-filter-label">Filter by Type</InputLabel>
            <Select
              labelId="alert-filter-label"
              id="alert-filter"
              value={alertFilter}
              onChange={handleAlertFilterChange}
              label="Filter by Type"
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="low_stock">Low Stock</MenuItem>
              <MenuItem value="stock_out">Stock Out</MenuItem>
              <MenuItem value="overdue_shipment">Overdue Shipment</MenuItem>
              <MenuItem value="overdue_payment">Overdue Payment</MenuItem>
              <MenuItem value="price_change">Price Change</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <AlertList alerts={filteredAlerts} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <AlertList alerts={filteredAlerts} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <AlertList alerts={filteredAlerts} />
        </TabPanel>
      </Paper>

      {/* Alert Settings Dialog */}
      <Dialog open={settingsOpen} onClose={handleCloseSettings} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon sx={{ mr: 1 }} />
            Alert Settings
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
            Configure which alerts you want to receive and how you want to be notified.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Alert Types
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="Low Stock Alerts" 
                secondary="Notify when inventory falls below reorder point" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ErrorIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Stock Out Alerts" 
                secondary="Notify when items are completely out of stock" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="Overdue Shipment Alerts" 
                secondary="Notify when orders are past their shipping due date" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="info" />
              </ListItemIcon>
              <ListItemText 
                primary="Price Change Alerts" 
                secondary="Notify when vendor prices change significantly" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Notification Methods
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText 
                primary="In-App Notifications" 
                secondary="Show alerts in the notification center" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Email Notifications" 
                secondary="Send alerts to your email address" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Email Recipients" 
              />
              <TextField
                variant="outlined"
                size="small"
                defaultValue="admin@example.com"
                sx={{ width: 250 }}
              />
            </ListItem>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Alert Thresholds
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ width: 300 }}>
              Low Stock Threshold Multiplier:
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              defaultValue="1.0"
              InputProps={{
                inputProps: { min: 0.1, max: 5, step: 0.1 }
              }}
              helperText="Multiple of reorder point (1.0 = exactly at reorder point)"
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 300 }}>
              Price Change Alert Threshold:
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              defaultValue="10"
              InputProps={{
                inputProps: { min: 1, max: 50, step: 1 }
              }}
              helperText="Percentage change to trigger alert"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Cancel</Button>
          <Button onClick={handleCloseSettings} variant="contained" color="primary">
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// AlertList component to display alerts
interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  // Get alert icon based on severity
  const getAlertIcon = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  // Get alert type label
  const getAlertTypeLabel = (type: string) => {
    switch(type) {
      case 'low_stock':
        return 'Low Stock';
      case 'stock_out':
        return 'Stock Out';
      case 'overdue_shipment':
        return 'Overdue Shipment';
      case 'overdue_payment':
        return 'Overdue Payment';
      case 'price_change':
        return 'Price Change';
      default:
        return type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1);
    }
  };

  // Get chip color based on severity
  const getChipColor = (severity: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch(severity) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  if (alerts.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6">No alerts to display</Typography>
        <Typography variant="body2" color="text.secondary">
          All caught up! There are no alerts matching your current filters.
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {alerts.map((alert) => (
        <React.Fragment key={alert.id}>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              {getAlertIcon(alert.severity)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="span" sx={{ mr: 1 }}>
                    {getAlertTypeLabel(alert.type)}
                  </Typography>
                  <Chip 
                    label={alert.severity} 
                    size="small" 
                    color={getChipColor(alert.severity)} 
                  />
                  {!alert.isRead && (
                    <Chip 
                      label="New" 
                      size="small" 
                      color="primary" 
                      sx={{ ml: 1 }} 
                    />
                  )}
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" component="span" color="text.primary">
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
                    {format(new Date(alert.createdAt), 'MMM dd, yyyy - h:mm a')}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: 'flex' }}>
                <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                  {alert.isRead ? 'Mark Unread' : 'Mark Read'}
                </Button>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Alerts;
