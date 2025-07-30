import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
} from '@mui/icons-material';

const categories = [
  { name: 'Telescopes', path: '/products?category=Telescopes & Accessories' },
  { name: 'Space Merchandise', path: '/products?category=Space Merchandise' },
  { name: 'Books & Education', path: '/products?category=Books & Education' },
  { name: 'Home & Lifestyle', path: '/products?category=Home & Lifestyle' },
  { name: 'Gadgets & Kits', path: '/products?category=Gadgets & Kits' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              About Cosmos Shop
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}
            >
              Your premier destination for astronomical equipment, space merchandise,
              and cosmic discoveries. Explore the universe with our curated collection
              of telescopes and space-themed products.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#7c4dff' },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#7c4dff' },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#7c4dff' },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#7c4dff' },
                }}
              >
                <YouTube />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {categories.map((category) => (
                <Typography
                  key={category.name}
                  component={Link}
                  to={category.path}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#7c4dff',
                    },
                  }}
                >
                  {category.name}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}
            >
              Email: support@cosmosshop.com
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}
            >
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Hours: Mon-Fri 9:00 AM - 6:00 PM EST
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'rgba(255,255,255,0.5)', mt: 4 }}
        >
          {new Date().getFullYear()} Cosmos Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
