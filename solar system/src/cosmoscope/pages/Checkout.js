import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  CreditCard,
  AccountBalance,
  PhoneAndroid,
} from '@mui/icons-material';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Address', 'Payment', 'Review'];

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard />,
    description: 'Pay securely with your card',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: <PhoneAndroid />,
    description: 'Pay using any UPI app',
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: <AccountBalance />,
    description: 'Pay through your bank account',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: <LocalShipping />,
    description: 'Pay when you receive your order',
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal } = useProduct();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bank: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePlaceOrder = () => {
    // Here you would typically make an API call to process the payment
    // For now, we'll just simulate a successful payment
    setTimeout(() => {
      navigate('/order-success');
    }, 2000);
  };

  const renderAddressForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formData.address}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="PIN Code"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Box>
      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          {paymentMethods.map((method) => (
            <Paper
              key={method.id}
              sx={{
                mb: 2,
                border: paymentMethod === method.id ? '2px solid #00ff9d' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                background: 'rgba(13, 12, 34, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: paymentMethod === method.id ? '0 0 15px #00ff9d' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <FormControlLabel
                value={method.id}
                control={
                  <Radio 
                    sx={{
                      color: '#00ff9d',
                      '&.Mui-checked': {
                        color: '#00ff9d',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <Box sx={{ 
                      mr: 2,
                      color: '#00ff9d',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {method.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#fff',
                        fontWeight: 600,
                        textShadow: '0 0 10px rgba(0, 255, 157, 0.5)'
                      }}>
                        {method.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {method.description}
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%' }}
              />
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              sx={{
                input: {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: '#00ff9d',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name on Card"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              sx={{
                input: {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: '#00ff9d',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              sx={{
                input: {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: '#00ff9d',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              type="password"
              value={formData.cvv}
              onChange={handleInputChange}
              sx={{
                input: {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: '#00ff9d',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'upi' && (
        <TextField
          required
          fullWidth
          label="UPI ID"
          name="upiId"
          placeholder="username@upi"
          value={formData.upiId}
          onChange={handleInputChange}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        />
      )}

      {paymentMethod === 'netbanking' && (
        <TextField
          required
          fullWidth
          select
          label="Select Bank"
          name="bank"
          value={formData.bank}
          onChange={handleInputChange}
          SelectProps={{
            native: true,
          }}
          sx={{
            input: {
              color: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#00ff9d',
              },
            },
          }}
        >
          <option value="">Select a bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="axis">Axis Bank</option>
        </TextField>
      )}
    </Box>
  );

  const renderReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {cart.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" align="right">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Grid container justifyContent="space-between">
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">₹{getCartTotal().toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ 
      py: 6, 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d0c22 0%, #1a1b3f 100%)',
      color: '#fff'
    }}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00ff9d 30%, #00ffff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
            mb: 6,
          }}
        >
          Checkout
        </Typography>

        <Paper sx={{ 
          p: 4, 
          background: 'rgba(13, 12, 34, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)'
        }}>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 5,
              '& .MuiStepLabel-label': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-active': {
                  color: '#00ff9d',
                },
              },
              '& .MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.3)',
                '&.Mui-active': {
                  color: '#00ff9d',
                },
                '&.Mui-completed': {
                  color: '#00ff9d',
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Processing your order...
              </Typography>
            </Box>
          ) : (
            <>
              {activeStep === 0 && renderAddressForm()}
              {activeStep === 1 && renderPaymentForm()}
              {activeStep === 2 && renderReview()}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: '#00ff9d',
                      color: '#00ff9d',
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                  sx={{
                    background: 'linear-gradient(45deg, #00ff9d 30%, #00ffff 90%)',
                    color: '#0d0c22',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00ffff 30%, #00ff9d 90%)',
                      boxShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;
