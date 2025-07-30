import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 64,
              color: 'success.main',
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for shopping with Cosmos Shop. Your order has been confirmed and will be shipped soon.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You will receive an email confirmation with order details and tracking information.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                },
                mr: 2,
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderSuccess;
