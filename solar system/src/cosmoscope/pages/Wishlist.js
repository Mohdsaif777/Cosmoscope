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
} from '@mui/material';
import { ShoppingCart, Delete } from '@mui/icons-material';
import { useProduct } from '../context/ProductContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useProduct();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Box sx={{ 
      py: 6, 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d0c22 0%, #1a1b3f 100%)',
      color: '#fff',
      position: 'relative',
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
    }}>
      <Container sx={{ position: 'relative' }}>
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
          My Wishlist
        </Typography>

        {wishlist.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              background: 'rgba(13, 12, 34, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)'
            }}
          >
            <Typography variant="h5" sx={{ color: '#fff', mb: 2 }} gutterBottom>
              Your wishlist is empty
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Add items you love to your wishlist. Review them anytime and easily move them to the cart.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {wishlist.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    background: 'rgba(13, 12, 34, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 0 30px rgba(0, 255, 157, 0.4)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <IconButton
                    onClick={() => removeFromWishlist(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(13, 12, 34, 0.7)',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 0, 0.2)',
                        color: '#ff4d4d',
                        boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        minHeight: 64,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: '#fff',
                        textShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{
                        minHeight: 60,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ 
                        color: '#00ff9d',
                        mb: 2,
                        textShadow: '0 0 10px rgba(0, 255, 157, 0.5)',
                      }}
                    >
                      ₹{product.price?.toLocaleString() || 'N/A'}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleMoveToCart(product)}
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
                      Move to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;
