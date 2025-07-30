import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import {
  CameraAlt,
  LocalMall,
  MenuBook,
  Science,
  Toys,
  NightlightRound,
} from '@mui/icons-material';

const categories = [
  {
    id: 1,
    name: 'Telescopes',
    description: 'Discover the cosmos with our premium telescopes',
    icon: <CameraAlt sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'telescopes',
    image: '/images/telescope/telescope.jpg',
    priceRange: '₹3,999 - ₹32,999'
  },
  {
    id: 2,
    name: 'Merchandise',
    description: 'Show your love for space with Astronomy themed apparels',
    icon: <LocalMall sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'merchandise',
    image: '/images/merchandise/merchandise.jpg',
    priceRange: '₹999 - ₹1,999'
  },
  {
    id: 3,
    name: 'Study Materials',
    description: 'Learn about the universe with our educational resources',
    icon: <MenuBook sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'books',
    image: '/images/study materials/study materials.jpg',
    priceRange: '₹799 - ₹1,499'
  },
  {
    id: 4,
    name: 'Space Toys',
    description: 'Educational and fun space toys for all ages',
    icon: <Toys sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'gadgets',
    image: '/images/space toys/space toys.jpg',
    priceRange: '₹3,499 - ₹24,999'
  },
  {
    id: 5,
    name: 'home decor',
    description: 'Rare and unique space themed home decor items',
    icon: <Science sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'collectibles',
    image: '/images/home decor/home decors.jpg',
    priceRange: '₹2,999 - ₹4,999'
  },
  {
    id: 6,
    name: 'Galaxy Lamps',
    description: 'Bring the stars into your room with our galaxy projectors',
    icon: <NightlightRound sx={{ fontSize: 40, color: '#48CAE4' }} />,
    path: 'home',
    image: '/images/space lamps/space lamps.jpg',
    priceRange: '₹1,999 - ₹2,499'
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.path}`);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #03071E, #000814)',
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
        },
        '@keyframes twinkle': {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0.3 },
        }
      }}
    >
      <Container sx={{ pt: 12, pb: 8, position: 'relative' }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: 'linear-gradient(45deg, #48CAE4 30%, #00B4D8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 20px rgba(72, 202, 228, 0.3)',
            }}
          >
            Explore the Cosmos
          </Typography>
          <Typography
            variant="h5"
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              mb: 6,
              color: '#CAF0F8',
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            Discover our curated collection of astronomical equipment, space merchandise, and cosmic treasures
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                onClick={() => handleCategoryClick(category)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                    },
                    '& .overlay': {
                      opacity: 0.4,
                    },
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={category.image}
                  alt={category.name}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    transition: '0.3s',
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    zIndex: 1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: 'white',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    p: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {category.icon}
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        ml: 2, 
                        fontWeight: 600,
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      opacity: 0.9, 
                      mb: 2,
                      textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                    }}
                  >
                    {category.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#48CAE4', 
                      mb: 3,
                      fontWeight: 500,
                      textShadow: '0 0 10px rgba(72, 202, 228, 0.5)'
                    }}
                  >
                    Price Range: {category.priceRange}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                      color: 'white',
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                      },
                    }}
                  >
                    Explore {category.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
