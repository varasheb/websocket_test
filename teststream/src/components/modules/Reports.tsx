
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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  BarChart as ChartIcon,
  ShowChart as LineChartIcon,
  PieChart as PieChartIcon,
  TableChart as TableIcon,
  GetApp as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { mockItems, mockWarehouses } from '../../data/mockData';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const handleReportChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedReport(event.target.value as string);
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Sample inventory valuation data
  const inventoryValuationData = mockItems.map(item => ({
    id: item.id,
    name: item.name,
    sku: item.sku,
    quantity: item.stockOnHand,
    avgCost: item.costPrice,
    totalValue: item.stockOnHand * item.costPrice
  }));

  // Sample chart options for inventory value by category
  const categoryChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: ['Electronics', 'Accessories', 'Office Supplies'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#1976d2', '#dc004e', '#ff9800']
  };

  const categoryChartSeries = [25000, 8000, 5000]; // Sample data

  // Sample chart options for stock movement
  const stockMovementOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    markers: {
      size: 4
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val.toString()
        }
      }
    },
    colors: ['#1976d2', '#dc004e', '#4caf50']
  };

  const stockMovementSeries = [
    {
      name: 'Opening Stock',
      data: [100, 120, 150, 170, 180, 200]
    },
    {
      name: 'Incoming',
      data: [30, 40, 35, 50, 49, 60]
    },
    {
      name: 'Outgoing',
      data: [10, 10, 15, 40, 29, 35]
    }
  ];

  // Sample chart options for sales analysis
  const salesAnalysisOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yaxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return "$ " + val.toLocaleString()
        }
      }
    },
    colors: ['#1976d2', '#4caf50', '#ff9800']
  };

  const salesAnalysisSeries = [
    {
      name: 'Direct',
      data: [12000, 15000, 18000, 16000, 20000, 22000]
    },
    {
      name: 'Online Marketplace',
      data: [8000, 10000, 12000, 14000, 16000, 18000]
    },
    {
      name: 'B2B',
      data: [5000, 6000, 7000, 8000, 10000, 12000]
    }
  ];

  return (
    <Box className="page-container">
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="report-select-label">Select Report</InputLabel>
              <Select
                labelId="report-select-label"
                id="report-select"
                value={selectedReport}
                label="Select Report"
                onChange={handleReportChange}
              >
                <MenuItem value="inventory_valuation">Inventory Valuation</MenuItem>
                <MenuItem value="stock_movement">Stock Movement</MenuItem>
                <MenuItem value="sales_analysis">Sales Analysis</MenuItem>
                <MenuItem value="purchase_analysis">Purchase Analysis</MenuItem>
                <MenuItem value="profitability">Profitability Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <DateRangeIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <DateRangeIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Templates */}
      <Typography variant="h5" gutterBottom>
        Report Templates
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Inventory Valuation
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Calculate the current value of your inventory using different valuation methods (FIFO, LIFO, Average Cost).
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setSelectedReport('inventory_valuation')}>
                Generate
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LineChartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Stock Movement
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track inventory changes over time, including incoming and outgoing stock, adjustments, and transfers.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setSelectedReport('stock_movement')}>
                Generate
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PieChartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Sales Analysis
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Analyze sales performance by product, category, customer, or sales channel over time.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setSelectedReport('sales_analysis')}>
                Generate
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TableIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Profitability
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Calculate gross and net profit margins by product, category, or overall business performance.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setSelectedReport('profitability')}>
                Generate
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Report Display Area */}
      {selectedReport && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              {selectedReport === 'inventory_valuation' && 'Inventory Valuation Report'}
              {selectedReport === 'stock_movement' && 'Stock Movement Report'}
              {selectedReport === 'sales_analysis' && 'Sales Analysis Report'}
              {selectedReport === 'purchase_analysis' && 'Purchase Analysis Report'}
              {selectedReport === 'profitability' && 'Profitability Report'}
            </Typography>
            <Box>
              <IconButton>
                <PrintIcon />
              </IconButton>
              <IconButton>
                <DownloadIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Period: {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {selectedReport === 'inventory_valuation' && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell>SKU</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Avg. Cost</TableCell>
                          <TableCell align="right">Total Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {inventoryValuationData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${item.avgCost.toFixed(2)}</TableCell>
                            <TableCell align="right">${item.totalValue.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                            Total Inventory Value:
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            ${inventoryValuationData.reduce((sum, item) => sum + item.totalValue, 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Inventory Value by Category
                    </Typography>
                    <ReactApexChart 
                      options={categoryChartOptions} 
                      series={categoryChartSeries} 
                      type="pie" 
                      height={300} 
                    />
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mb: 2 }}>
                <FormControl sx={{ minWidth: 200, mr: 2 }}>
                  <InputLabel>Valuation Method</InputLabel>
                  <Select
                    value="average"
                    label="Valuation Method"
                  >
                    <MenuItem value="average">Weighted Average</MenuItem>
                    <MenuItem value="fifo">FIFO</MenuItem>
                    <MenuItem value="lifo">LIFO</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Warehouse</InputLabel>
                  <Select
                    value="all"
                    label="Warehouse"
                  >
                    <MenuItem value="all">All Warehouses</MenuItem>
                    {mockWarehouses.map(warehouse => (
                      <MenuItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
          
          {selectedReport === 'stock_movement' && (
            <Box>
              <ReactApexChart 
                options={stockMovementOptions} 
                series={stockMovementSeries} 
                type="line" 
                height={350} 
              />
              
              <Box sx={{ mt: 3, mb: 2 }}>
                <FormControl sx={{ minWidth: 200, mr: 2 }}>
                  <InputLabel>Item</InputLabel>
                  <Select
                    value="all"
                    label="Item"
                  >
                    <MenuItem value="all">All Items</MenuItem>
                    {mockItems.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Movement Type</InputLabel>
                  <Select
                    value="all"
                    label="Movement Type"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="purchase">Purchases</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="adjustment">Adjustments</MenuItem>
                    <MenuItem value="transfer">Transfers</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
          
          {selectedReport === 'sales_analysis' && (
            <Box>
              <ReactApexChart 
                options={salesAnalysisOptions} 
                series={salesAnalysisSeries} 
                type="bar" 
                height={350} 
              />
              
              <Box sx={{ mt: 3, mb: 2 }}>
                <FormControl sx={{ minWidth: 200, mr: 2 }}>
                  <InputLabel>Group By</InputLabel>
                  <Select
                    value="channel"
                    label="Group By"
                  >
                    <MenuItem value="channel">Sales Channel</MenuItem>
                    <MenuItem value="product">Product</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Time Interval</InputLabel>
                  <Select
                    value="month"
                    label="Time Interval"
                  >
                    <MenuItem value="day">Daily</MenuItem>
                    <MenuItem value="week">Weekly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="quarter">Quarterly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Reports;
