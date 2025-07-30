import React from 'react';
import { useParams } from 'react-router-dom';
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
  Chip,
} from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart } from '@mui/icons-material';
import { useProduct } from '../context/ProductContext';

const categoryProducts = {
  telescopes: [
    {
      id: 1,
      name: 'Matrix Phoenix Refractor Telescope',
      price: 3999,
      description: '60/700 refractor, aluminum tripod, 1.25" eyepieces - Perfect for beginners',
      image: '../../images/telescope/telescope1.jpg',
      target: 'Beginners',
      features: ['60/700 refractor', 'Aluminum tripod', '1.25" eyepieces'],
    },
    {
      id: 2,
      name: 'Celestron AstroMaster Motor Drive',
      price: 32999,
      description: 'Professional telescope with motor drive and automatic tracking system',
      image: '../../images/telescope/telescope2.jpg',
      target: 'Professional',
      features: ['Motor drive', 'Automatic tracking', 'Professional grade optics'],
    },
    {
      id: 3,
      name: 'SSEA Professional Astronomical',
      price: 7499,
      description: '70mm aperture telescope with phone adapter for astrophotography',
      image: '../../images/telescope/telescope3.jpg',
      target: 'Intermediate',
      features: ['70mm aperture', 'Phone adapter', 'Portable design'],
    },
    {
      id: 4,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope4.jpg',
      target: 'Advanced',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    },
    {
      id: 5,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope5.jpg',
      target: 'Advanced',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    },
    {
      id: 6,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope6.jpg',
      target: 'Advanced',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    },
    {
      id: 7,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope7.jpeg',
      target: 'Advanced',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    },
    {
      id: 8,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope8.jpeg',
      target: 'Advanced',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    },
    {
      id: 9,
      name: 'Astronomical Reflector Telescope',
      price: 15999,
      description: '114mm aperture reflector telescope with motor drive for advanced users',
      image: '../../images/telescope/telescope9.jpg',
      features: ['114mm aperture', 'Motor drive', 'Advanced optics'],
    }
  ],
  merchandise: [
    {
      id: 11,
      name: 'Addicted To Astronomy T-shirt',
      price: 499,
      description: 'Small size',
      image: '../images/merchandise/merchandise1.jpg',
      
    },
    {
      id: 12,
      name: 'Solar System T-shirt',
      price: 999,
      description: 'Medium size',
      image: '../images/merchandise/merchandise2.jpeg',
      
    },
    {
      id: 13,
      name: 'Diagonally Mounted Solar System T-shirt',
      price: 1299,
      description: 'Large size',
      image: '../images/merchandise/merchandise3.webp',
      
   
    },
    {
      id: 14,
      name: '3D Solar System T-shirt',
      price: 999,
      description: 'Small size',
      image: '../images/merchandise/merchandise4.jpeg',

    },
    {
      id: 15,
      name: '3D printed T-shirt',
      price: 999,
      description: 'Small size',
      image: '../images/merchandise/merchandise5.png',
    
   
    },
    {
      id: 16,
      name: 'Colourful Printed T-shirt',
      price: 799,
      description: 'Small size',
      image: '../images/merchandise/merchandise6.jpeg',

      
    },
    {
      id: 17,
      name: 'Siting on the Moon Printed T-shirt',
      price: 999,
      description: 'Medium size',
      image: '../images/merchandise/merchandise7.jpg',

    },
    {
      id: 18,
      name: 'Siting on the Moon Printed T-shirte',
      price: 699,
      description: 'Small size',
      image: '../images/merchandise/merchandise8.jpg',
    },
    {
      id: 19,
      name: 'Astronomer Playing Baseball Printed T-shirt',
      price: 15999,
      description: 'Large size',
      image: '../images/merchandise/merchandise9.jpg',

    }
  ],
  books: [
    {
      id: 21,
      name: 'Notebook of Astronomy',
      price: 499,
      description: 'Medium size 200 pages notebook for astronomy enthusiasts',
      image: '../images/study materials/study material1.jpg',
    
    },
    {
      id: 22,
      name: 'Space book',
      price: 999,
      description: 'Basics of astronomy for beginners',
      image: '../images/study materials/study material2.jpg',
 
    },
    {
      id: 23,
      name:'paint Your Own Solar System',
      price: 999,
      description: 'for knwledge of colours of planets',
      image: '../images/study materials/study material3.jpg',

    },
    {
      id: 24,
      name: 'Rings of Planets',
      price: 1499,
      description: 'for knowledge of rings of planets',
      image: '../images/study materials/study material4.jpg',

    },
    {
      id: 25,
      name: 'Basics of Solar System',
      price: 999,
      description: 'Best book for beginners to learn about the solar system',
      image: '../images/study materials/study material5.jpg',
    
    },
    {
      id: 26,
      name: '4 in 1 Celestial Body Info-chart',
      price: 999,
      description: 'Basic Knowledge of Our Planet,Moon and two other planets',
      image: '../images/study materials/study material6.jpg',
  
    },
    {
      id: 27,
      name: 'The Milky Way Galaxy',
      price: 999,
      description: 'Best Book For Beginners To Learn About Milky Way Galaxy',
      image: '../images/study materials/study material7.jpg',

    },
    {
      id: 28,
      name: 'Hawkings black hole',
      price: 999,
      description: 'Best Book For Beginners To Learn Bbout Black Holes',
      image: '../images/study materials/study material8.jpg',

    },
    {
      id: 29,
      name: 'INFINITY',
      price: 999,
      description: 'Basics of astronomy for beginners',
      image: '../images/study materials/study material9.jpg',

    }
  ],
  gadgets: [
    {
      id: 31,
      name: 'DIY Mars Rover Kit',
      price: 3499,
      description: 'Build your own Mars rover with this educational kit',
      image: '../images/space toys/space toy1.jpg',
      target: 'Tech enthusiasts',
    },
    {
      id: 32,
      name: 'DIY Mars Rover Kit',
      price: 3499,
      description: 'Build your own Mars rover with this educational kit',
      image: '../images/space toys/space toy2.jpg',
    
    },
    {
      id: 33,
      name: '3D Solar System',
      price: 3499,
      description: 'Adjust Solar System with 3D model',
      image: '../images/space toys/space toy3.webp',
    
    },
    {
      id: 34,
      name: 'Space Exploration Kit', 
      price: 3499,
      description: 'Explore the universe with this interactive kit',
      image: '../images/space toys/space toy4.webp',

    },
    {
      id: 35,
      name: '3D Solar System planetarium', 
      price: 2099,
      description: 'build your own solar system with this educational kit',
      image: '../images/space toys/space toy5.jpg',
      
    },
    {
      id: 36,
      name: 'Smart Star Finder',
      price: 2999,
      description: 'Digital star finder with smartphone integration',
      image: '../images/space toys/space toy6.jpeg',
      target: 'Hobbyists',
    }
  ],
  collectibles: [
    {
      id: 41,
      name: 'Statue of Astronaut',
      price: 999,
      description: 'plastic built statue of astronaut',
      image: '../images/home decor/home decor1.jpg',
    },
    {
      id: 42,
      name: 'Door Wallpaper',
      price: 999,
      description: 'Door Wallpaper of Moon',
      image: '../images/home decor/home decor2.jpg',
    },
    {
      id: 43,
      name: 'Full Moon Wall Paper',
      price: 999,
      description: 'Full Moon Wall Paper that glows in dark',
      image: '../images/home decor/home decor3.jpg',
    },
    {
      id: 44,
      name: 'Colourful Wall Paper',
      price: 999,
      description: '7 different colours of wall paper',
      image: '../images/home decor/home decor4.jpg',
    },
    {
      id: 45,
      name: 'Colourful picture frame',
      price: 999,
      description: 'planet with rings picture frame',
      image: '../images/home decor/home decor5.jpg',
    },
    {
      id: 46,
      name: 'Sun rising picture with frame t',
      price: 999,
      description: 'beautiful sun rising picture with frame',
      image: '../images/home decor/home decor6.jpg',
    },
    {
      id: 47,
      name: 'statue of astronaut',
      price: 999,
      description: '3 Staue of astronaut',
      image: '../images/home decor/home decor7.jpg',
    }
  ],
  home: [
    {
      id: 51,
      name: 'Galaxy Projector Pro',
      price: 749,
      description: 'night lamp with galaxy projector ',
      image: '../../images/space lamps/lamp1.jpg',

    },
    {
      id: 52,
      name: 'Night Lamp',
      price: 549,
      description: 'very bright night lamp with 3D effect',
      image: '../../images/space lamps/lamp2.jpg',
    
    },
    {
      id: 53,
      name: 'Night Lamp',
      price: 399,
      description: 'bright night lamp with 3D Solar system effect',
      image: '../../images/space lamps/lamp3.jpg',

    },
    {
      id: 51,
      name: '3D Moon Lamp',
      price: 499,
      description: 'Orange and white 3D moon lamp',
      image: '../../images/space lamps/lamp4.jpg',

    },
    {
      id: 55,
      name: 'Galaxy Projector Pro',
      price: 799,
      description: 'High-quality galaxy projector with remote control',
      image: '../../images/space lamps/lamp5.jpg',
  
    },
    {
      id: 56,
      name: 'Milky Way Galaxy Portal Lamp',
      price: 699,
      description: 'Unique lamp with a 3D effect of the Milky Way galaxy',
      image: '../../images/space lamps/lamp6.jpg',

    }
  ]
};

const CategoryPage = () => {
  const { categoryPath } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useProduct();
  
  const products = categoryProducts[categoryPath] || [];
  const categoryName = {
    telescopes: 'Telescopes',
    merchandise: 'Apparel T-shirts',
    books: 'Books & Education',
    gadgets: 'Space Toys',
    collectibles: 'Home Decor',
    home: 'Galaxy Lamps',
  }[categoryPath] || 'Products';

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Box sx={{ py: 6, minHeight: '100vh' }}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
          }}
        >
          {categoryName}
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                  },
                  bgcolor: 'background.paper',
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <IconButton
                  onClick={() => handleAddToWishlist(product)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'background.paper',
                    },
                  }}
                >
                  {isInWishlist(product.id) ? (
                    <Favorite sx={{ color: 'cosmic.nebula' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
                {product.target && (
                  <Chip
                    label={product.target}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                    }}
                  />
                )}
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
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      minHeight: 60,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </Typography>
                  {product.features && (
                    <Box sx={{ mb: 2 }}>
                      {product.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  <Typography
                    variant="h6"
                    sx={{ color: 'primary.main', mb: 2 }}
                  >
                    ₹{product.price.toLocaleString()}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart(product)}
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                      },
                    }}
                  >
                    Add to Cart
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

export default CategoryPage;
