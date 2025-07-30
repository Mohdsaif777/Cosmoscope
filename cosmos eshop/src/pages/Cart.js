import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingBag,
  Rocket,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useProduct();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
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
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #48CAE4 30%, #00B4D8 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
            textShadow: '0 0 20px rgba(72, 202, 228, 0.3)',
          }}
        >
          Your Cosmic Cart
        </Typography>

        {cart.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Rocket sx={{ fontSize: 80, color: '#48CAE4', mb: 3 }} className="floating" />
            <Typography variant="h5" sx={{ color: '#CAF0F8', mb: 2 }}>
              Your cosmic cart is empty
            </Typography>
            <Typography variant="body1" sx={{ color: '#CAF0F8', opacity: 0.8, mb: 4 }}>
              Start your space shopping journey by adding items to your cart.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                color: 'white',
                py: 1.5,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                },
              }}
            >
              Explore Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 3, 
                  borderRadius: 4,
                }}
              >
                {cart.map((item) => (
                  <Box key={item.id}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography variant="h6" sx={{ color: '#CAF0F8', mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#CAF0F8', opacity: 0.8 }}>
                          {item.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            p: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            sx={{ color: '#48CAE4' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                            }
                            inputProps={{
                              min: 1,
                              style: { 
                                textAlign: 'center', 
                                width: '40px',
                                color: '#CAF0F8',
                              },
                            }}
                            sx={{ 
                              mx: 1,
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            sx={{ color: '#48CAE4' }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1" sx={{ color: '#48CAE4', fontWeight: 600 }}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </Typography>
                          <IconButton
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                              color: '#FF4D6D',
                              '&:hover': {
                                background: 'rgba(255, 77, 109, 0.1)',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Box>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 3, 
                  borderRadius: 4,
                  position: 'sticky', 
                  top: 24,
                }}
              >
                <Typography variant="h6" sx={{ color: '#CAF0F8', mb: 3 }}>
                  Order Summary
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ color: '#CAF0F8', opacity: 0.9 }}>
                      Subtotal
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#48CAE4' }}>
                      ₹{getCartTotal().toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ color: '#CAF0F8', opacity: 0.9 }}>
                      Shipping
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#00FF88' }}>
                      Free
                    </Typography>
                  </Grid>
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#CAF0F8' }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#48CAE4' }}>
                      ₹{getCartTotal().toLocaleString()}
                    </Typography>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/checkout')}
                    sx={{
                      background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                      color: 'white',
                      py: 2,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
