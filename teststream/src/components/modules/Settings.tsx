
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  CreditCard as PaymentIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
  ColorLens as ThemeIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('company');
  const [showPassword, setShowPassword] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="page-container">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: { xs: 2, md: 0 } }}>
            <List component="nav">
              <ListItem 
                button 
                selected={activeSection === 'company'} 
                onClick={() => handleSectionChange('company')}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Company Profile" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'user'} 
                onClick={() => handleSectionChange('user')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="User Profile" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'security'} 
                onClick={() => handleSectionChange('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <Divider />
              <ListItem 
                button 
                selected={activeSection === 'inventory'} 
                onClick={() => handleSectionChange('inventory')}
              >
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory Settings" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'invoicing'} 
                onClick={() => handleSectionChange('invoicing')}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Invoicing & Billing" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'shipping'} 
                onClick={() => handleSectionChange('shipping')}
              >
                <ListItemIcon>
                  <ShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Shipping" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'payment'} 
                onClick={() => handleSectionChange('payment')}
              >
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Payment Methods" />
              </ListItem>
              <Divider />
              <ListItem 
                button 
                selected={activeSection === 'notifications'} 
                onClick={() => handleSectionChange('notifications')}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'email'} 
                onClick={() => handleSectionChange('email')}
              >
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email Templates" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'appearance'} 
                onClick={() => handleSectionChange('appearance')}
              >
                <ListItemIcon>
                  <ThemeIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'localization'} 
                onClick={() => handleSectionChange('localization')}
              >
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Localization" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {/* Company Profile */}
            {activeSection === 'company' && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Company Profile
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      variant="outlined"
                      defaultValue="Acme Inventory Solutions"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tax ID / VAT Number"
                      variant="outlined"
                      defaultValue="US123456789"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company Address"
                      variant="outlined"
                      multiline
                      rows={2}
                      defaultValue="123 Business Street, Suite 100, Enterprise City, CA 90210, USA"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      variant="outlined"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      defaultValue="info@acmeinventory.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Website"
                      variant="outlined"
                      defaultValue="www.acmeinventory.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Base Currency</InputLabel>
                      <Select
                        label="Base Currency"
                        defaultValue="USD"
                      >
                        <MenuItem value="USD">USD - US Dollar</MenuItem>
                        <MenuItem value="EUR">EUR - Euro</MenuItem>
                        <MenuItem value="GBP">GBP - British Pound</MenuItem>
                        <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                        <MenuItem value="AUD">AUD - Australian Dollar</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company Logo URL"
                      variant="outlined"
                      defaultValue="https://example.com/logo.png"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" startIcon={<SaveIcon />}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* User Profile */}
            {activeSection === 'user' && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  User Profile
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80 }}>
                            JS
                          </Avatar>
                        }
                        title={
                          <Typography variant="h6">John Smith</Typography>
                        }
                        subheader="Administrator"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Member since: Jan 1, 2023
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last login: Today, 09:45 AM
                        </Typography>
                        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                          Change Avatar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          defaultValue="John"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          variant="outlined"
                          defaultValue="Smith"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          defaultValue="john.smith@acmeinventory.com"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
                          defaultValue="+1 (555) 987-6543"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Role</InputLabel>
                          <Select
                            label="Role"
                            defaultValue="admin"
                            disabled
                          >
                            <MenuItem value="admin">Administrator</MenuItem>
                            <MenuItem value="manager">Inventory Manager</MenuItem>
                            <MenuItem value="staff">Staff</MenuItem>
                            <MenuItem value="readonly">Read Only</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Time Zone</InputLabel>
                          <Select
                            label="Time Zone"
                            defaultValue="america_los_angeles"
                          >
                            <MenuItem value="america_los_angeles">America/Los Angeles (GMT-8)</MenuItem>
                            <MenuItem value="america_new_york">America/New York (GMT-5)</MenuItem>
                            <MenuItem value="europe_london">Europe/London (GMT+0)</MenuItem>
                            <MenuItem value="asia_tokyo">Asia/Tokyo (GMT+9)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" startIcon={<SaveIcon />}>
                          Save Changes
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Security Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ height: 56 }} /> {/* Spacer */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable Two-Factor Authentication"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Enhance your account security by requiring a verification code in addition to your password when signing in.
                    </Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom>
                  Session Management
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Session Timeout</InputLabel>
                      <Select
                        label="Session Timeout"
                        defaultValue="30"
                      >
                        <MenuItem value="15">15 minutes</MenuItem>
                        <MenuItem value="30">30 minutes</MenuItem>
                        <MenuItem value="60">1 hour</MenuItem>
                        <MenuItem value="120">2 hours</MenuItem>
                        <MenuItem value="240">4 hours</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Automatically log out after a period of inactivity.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" color="error">
                      Sign Out of All Devices
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Inventory Settings */}
            {activeSection === 'inventory' && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Inventory Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  General Settings
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Default Inventory Valuation Method</InputLabel>
                      <Select
                        label="Default Inventory Valuation Method"
                        defaultValue="average"
                      >
                        <MenuItem value="average">Weighted Average</MenuItem>
                        <MenuItem value="fifo">FIFO (First In, First Out)</MenuItem>
                        <MenuItem value="lifo">LIFO (Last In, First Out)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Low Stock Threshold</InputLabel>
                      <Select
                        label="Low Stock Threshold"
                        defaultValue="reorder"
                      >
                        <MenuItem value="reorder">At Reorder Point</MenuItem>
                        <MenuItem value="10_above">10% Above Reorder Point</MenuItem>
                        <MenuItem value="25_above">25% Above Reorder Point</MenuItem>
                        <MenuItem value="custom">Custom Value</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Auto-generate SKUs for new items"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Allow negative inventory"
                    />
                    <Typography variant="body2" color="text.secondary">
                      If enabled, the system will allow sales even when inventory is not available.
                    </Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom>
                  Barcode Settings
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Barcode Format</InputLabel>
                      <Select
                        label="Barcode Format"
                        defaultValue="code128"
                      >
                        <MenuItem value="code128">Code 128</MenuItem>
                        <MenuItem value="ean13">EAN-13</MenuItem>
                        <MenuItem value="upc">UPC</MenuItem>
                        <MenuItem value="qr">QR Code</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Print barcodes with item information"
                    />
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom>
                  Units of Measure
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Default Weight Unit</InputLabel>
                      <Select
                        label="Default Weight Unit"
                        defaultValue="kg"
                      >
                        <MenuItem value="kg">Kilograms (kg)</MenuItem>
                        <MenuItem value="g">Grams (g)</MenuItem>
                        <MenuItem value="lb">Pounds (lb)</MenuItem>
                        <MenuItem value="oz">Ounces (oz)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Default Dimension Unit</InputLabel>
                      <Select
                        label="Default Dimension Unit"
                        defaultValue="cm"
                      >
                        <MenuItem value="cm">Centimeters (cm)</MenuItem>
                        <MenuItem value="m">Meters (m)</MenuItem>
                        <MenuItem value="in">Inches (in)</MenuItem>
                        <MenuItem value="ft">Feet (ft)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" startIcon={<SaveIcon />}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Other sections would be implemented similarly */}
            {activeSection !== 'company' && 
             activeSection !== 'user' && 
             activeSection !== 'security' && 
             activeSection !== 'inventory' && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This settings section would be configured here.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
