import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Tab,
  Tabs,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Favorite,
  Settings,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
  AssignmentReturn,
} from '@mui/icons-material';

// Mock data for orders (replace with actual data from your backend)
const mockOrders = [
  {
    id: 'ORD001',
    date: '2025-03-15',
    deliveryDate: '2025-03-16',
    status: 'Delivered',
    total: 15999,
    items: [
      {
        name: 'Matrix Phoenix Refractor Telescope',
        quantity: 1,
        price: 15999,
        image: '/images/telescope-bg.jpg',
      },
    ],
  },
  {
    id: 'ORD002',
    date: '2025-03-10',
    status: 'Processing',
    total: 4998,
    items: [
      {
        name: 'NASA Space Hoodie',
        quantity: 2,
        price: 2499,
        image: '/images/merch-bg.jpg',
      },
    ],
  },
];

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} style={{ width: '100%' }}>
    {value === index && children}
  </div>
);

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setCancelDialogOpen(true);
  };

  const handleReturnOrder = (order) => {
    setSelectedOrder(order);
    setReturnDialogOpen(true);
  };

  const confirmCancelOrder = () => {
    // Add your cancel order logic here
    setCancelDialogOpen(false);
    setSelectedOrder(null);
  };

  const confirmReturnOrder = () => {
    // Add your return order logic here
    setReturnDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#00FF88';
      case 'Processing':
        return '#48CAE4';
      case 'Cancelled':
        return '#FF4D6D';
      default:
        return '#CAF0F8';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle sx={{ color: '#00FF88' }} />;
      case 'Processing':
        return <LocalShipping sx={{ color: '#48CAE4' }} />;
      case 'Cancelled':
        return <Cancel sx={{ color: '#FF4D6D' }} />;
      default:
        return <Schedule sx={{ color: '#CAF0F8' }} />;
    }
  };

  const isReturnEligible = (deliveryDate) => {
    if (!deliveryDate) return false;
    const delivered = new Date(deliveryDate);
    const now = new Date('2025-03-16T23:55:16+05:30');
    const diffTime = Math.abs(now - delivered);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const getReturnDeadline = (deliveryDate) => {
    if (!deliveryDate) return null;
    const deadline = new Date(deliveryDate);
    deadline.setDate(deadline.getDate() + 7);
    return deadline.toLocaleDateString();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #03071E, #000814)',
        position: 'relative',
        py: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/images/stars-bg.png) repeat',
          opacity: 0.5,
          animation: 'twinkle 8s linear infinite',
          pointerEvents: 'none',
        },
      }}
    >
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: '#48CAE4',
                  border: '4px solid rgba(72, 202, 228, 0.3)',
                }}
              >
                <Person sx={{ fontSize: 50 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#CAF0F8', mb: 1 }}>
                  Mohammad Saif
                </Typography>
                <Typography variant="body1" sx={{ color: '#CAF0F8', opacity: 0.8 }}>
                  saifmohd4422@gmail.com
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Tabs Navigation */}
          <Grid item xs={12}>
            <Paper
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    color: '#CAF0F8',
                    opacity: 0.7,
                    '&.Mui-selected': {
                      color: '#48CAE4',
                      opacity: 1,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#48CAE4',
                  },
                }}
              >
                <Tab icon={<ShoppingBag />} label="Orders" />
                <Tab icon={<Favorite />} label="Wishlist" />
                <Tab icon={<Settings />} label="Settings" />
              </Tabs>
            </Paper>
          </Grid>

          {/* Tab Content */}
          <Grid item xs={12}>
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" sx={{ color: '#CAF0F8', mb: 3 }}>
                Order History
              </Typography>
              <Grid container spacing={3}>
                {mockOrders.map((order) => (
                  <Grid item xs={12} key={order.id}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                      }}
                    >
                      <CardContent>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#CAF0F8' }}>
                            Order #{order.id}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(order.status)}
                            label={order.status}
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              color: getStatusColor(order.status),
                              borderRadius: 2,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#CAF0F8', opacity: 0.8, mb: 2 }}>
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        {order.deliveryDate && (
                          <Typography variant="body2" sx={{ color: '#CAF0F8', opacity: 0.8, mb: 2 }}>
                            Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                          </Typography>
                        )}
                        {order.deliveryDate && isReturnEligible(order.deliveryDate) && (
                          <Alert severity="info" sx={{ mb: 2, bgcolor: 'rgba(41, 121, 255, 0.1)', color: '#CAF0F8' }}>
                            Return available until {getReturnDeadline(order.deliveryDate)}
                          </Alert>
                        )}
                        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        {order.items.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                objectFit: 'cover',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" sx={{ color: '#CAF0F8' }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#CAF0F8', opacity: 0.8 }}>
                                Quantity: {item.quantity}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#48CAE4' }}>
                                ₹{item.price.toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: '#CAF0F8' }}>
                            Total Amount
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#48CAE4' }}>
                            ₹{order.total.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                          {order.status === 'Processing' && (
                            <Button
                              variant="outlined"
                              startIcon={<Cancel />}
                              onClick={() => handleCancelOrder(order)}
                              sx={{
                                color: '#FF4D6D',
                                borderColor: '#FF4D6D',
                                '&:hover': {
                                  borderColor: '#FF758F',
                                  background: 'rgba(255, 77, 109, 0.1)',
                                },
                              }}
                            >
                              Cancel Order
                            </Button>
                          )}
                          {order.status === 'Delivered' && isReturnEligible(order.deliveryDate) && (
                            <Button
                              variant="outlined"
                              startIcon={<AssignmentReturn />}
                              onClick={() => handleReturnOrder(order)}
                              sx={{
                                color: '#48CAE4',
                                borderColor: '#48CAE4',
                                '&:hover': {
                                  borderColor: '#00B4D8',
                                  background: 'rgba(72, 202, 228, 0.1)',
                                },
                              }}
                            >
                              Return Order
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                              color: 'white',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" sx={{ color: '#CAF0F8', mb: 3 }}>
                Wishlist
              </Typography>
              {/* Add Wishlist content here */}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" sx={{ color: '#CAF0F8', mb: 3 }}>
                Settings
              </Typography>
              {/* Add Settings content here */}
            </TabPanel>
          </Grid>
        </Grid>

        {/* Cancel Order Dialog */}
        <Dialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(3, 7, 30, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
            },
          }}
        >
          <DialogTitle sx={{ color: '#CAF0F8' }}>Cancel Order</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#CAF0F8' }}>
              Are you sure you want to cancel order #{selectedOrder?.id}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setCancelDialogOpen(false)}
              sx={{ color: '#CAF0F8' }}
            >
              No, Keep Order
            </Button>
            <Button
              onClick={confirmCancelOrder}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #FF4D6D 30%, #FF758F 90%)',
                color: 'white',
              }}
            >
              Yes, Cancel Order
            </Button>
          </DialogActions>
        </Dialog>

        {/* Return Order Dialog */}
        <Dialog
          open={returnDialogOpen}
          onClose={() => setReturnDialogOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(3, 7, 30, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
            },
          }}
        >
          <DialogTitle sx={{ color: '#CAF0F8' }}>Return Order</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#CAF0F8', mb: 2 }}>
              Are you sure you want to return order #{selectedOrder?.id}?
            </Typography>
            <Typography sx={{ color: '#CAF0F8', opacity: 0.8 }}>
              Please note that the product must be unused and in its original packaging. Our team will inspect the product upon return before processing the refund.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setReturnDialogOpen(false)}
              sx={{ color: '#CAF0F8' }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmReturnOrder}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                color: 'white',
              }}
            >
              Confirm Return
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Profile;
