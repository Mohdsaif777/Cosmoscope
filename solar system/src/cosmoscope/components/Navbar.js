import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Menu as MenuIcon,
  Home,
  Close,
  Person,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { cart, wishlist, getCartCount } = useProduct();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home /> },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 240,
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleMobileMenuToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            onClick={handleMobileMenuToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.default',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{
                color: 'text.primary',
                mr: 2,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Home
            </Button>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              Cosmos Shop
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              sx={{
                color: 'text.primary',
                mr: 1,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Person />
            </IconButton>

            <IconButton
              color="inherit"
              component={Link}
              to="/wishlist"
              sx={{
                color: 'text.primary',
                mr: 1,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Badge
                badgeContent={wishlist.length}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Badge
                badgeContent={getCartCount()}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenuToggle}
                sx={{
                  ml: 1,
                  color: 'text.primary',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Navbar;
