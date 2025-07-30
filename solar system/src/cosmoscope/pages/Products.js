import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Rating,
  useTheme,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  InputAdornment,
} from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart, Search } from '@mui/icons-material';
import { useProduct } from '../context/ProductContext';

const products = [
  // Telescopes & Accessories
  {
    id: 1,
    name: 'Matrix Phoenix Refractor Telescope',
    description: '60/700 refractor, aluminum tripod, 1.25" eyepieces',
    price: 3999,
    category: 'Telescopes & Accessories',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1024&q=80',
    rating: 4.5,
    reviews: 12,
    target: 'Beginners',
    features: ['60/700 refractor', 'Aluminum tripod', '1.25" eyepieces'],
  },
  {
    id: 2,
    name: 'Celestron AstroMaster Motor Drive',
    description: 'Motor drive with automatic tracking',
    price: 32999,
    category: 'Telescopes & Accessories',
    image: 'https://images.unsplash.com/photo-1579532536935-619928decd08?auto=format&fit=crop&w=1024&q=80',
    rating: 4.8,
    reviews: 8,
    target: 'Professional astronomers',
    features: ['Motor drive', 'Automatic tracking', 'Professional grade'],
  },
  // Space Merchandise
  {
    id: 3,
    name: 'NASA Apollo Mission Poster Set',
    description: 'Set of 3 vintage-style NASA mission posters',
    price: 1499,
    category: 'Space Merchandise',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1024&q=80',
    rating: 4.7,
    reviews: 25,
    target: 'Space enthusiasts',
    features: ['High quality print', 'Vintage design', '18x24 inches'],
  },
  {
    id: 4,
    name: 'Astronaut Hoodie',
    description: 'Premium cotton blend NASA astronaut hoodie',
    price: 999,
    category: 'Space Merchandise',
    image: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=1024&q=80',
    rating: 4.6,
    reviews: 42,
    target: 'Fashion enthusiasts',
    features: ['100% cotton', 'NASA logo', 'All sizes available'],
  },
  // Books & Education
  {
    id: 5,
    name: 'Astronomy Guide 2024',
    description: 'Comprehensive astronomy guide with star charts',
    price: 799,
    category: 'Books & Education',
    image: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1024&q=80',
    rating: 4.9,
    reviews: 18,
    target: 'Students',
    features: ['Updated for 2024', 'Star charts included', 'Beginner friendly'],
  },
  {
    id: 6,
    name: 'Star Atlas Premium',
    description: 'Professional star atlas with detailed constellation maps',
    price: 1499,
    category: 'Books & Education',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=1024&q=80',
    rating: 4.8,
    reviews: 15,
    target: 'Astronomers',
    features: ['Detailed maps', 'Professional grade', 'Hardcover'],
  },
  // Collectibles
  {
    id: 7,
    name: 'Authentic Meteorite Fragment',
    description: 'Certified meteorite fragment with display case',
    price: 2999,
    category: 'Collectibles',
    image: 'https://images.unsplash.com/photo-1534293230397-c067fc201ab8?auto=format&fit=crop&w=1024&q=80',
    rating: 4.9,
    reviews: 7,
    target: 'Collectors',
    features: ['Certificate included', 'Display case', 'Limited edition'],
  },
  {
    id: 8,
    name: 'Space Shuttle Model',
    description: 'Detailed 1:200 scale model of NASA Space Shuttle',
    price: 4999,
    category: 'Collectibles',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1024&q=80',
    rating: 4.7,
    reviews: 12,
    target: 'Model enthusiasts',
    features: ['Detailed replica', 'Metal construction', 'Display stand'],
  },
  // Gadgets & Kits
  {
    id: 9,
    name: 'DIY Mars Rover Kit',
    description: 'Educational robot building kit with programming module',
    price: 3499,
    category: 'Gadgets & Kits',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1024&q=80',
    rating: 4.6,
    reviews: 23,
    target: 'STEM learners',
    features: ['Programmable', 'Assembly required', 'Educational'],
  },
  {
    id: 10,
    name: 'Smart Star Finder',
    description: 'Digital star locator with smartphone connectivity',
    price: 24999,
    category: 'Gadgets & Kits',
    image: 'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?auto=format&fit=crop&w=1024&q=80',
    rating: 4.8,
    reviews: 16,
    target: 'Tech enthusiasts',
    features: ['Bluetooth enabled', 'Mobile app', 'Night vision'],
  },
  // Home & Lifestyle
  {
    id: 11,
    name: 'Galaxy Projector Pro',
    description: 'Advanced nebula and star projection system',
    price: 1999,
    category: 'Home & Lifestyle',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1024&q=80',
    rating: 4.7,
    reviews: 89,
    target: 'Home decor',
    features: ['Multiple modes', 'Remote control', 'Timer function'],
  },
  {
    id: 12,
    name: 'Constellation Bedding Set',
    description: 'Glow-in-the-dark constellation duvet cover set',
    price: 2499,
    category: 'Home & Lifestyle',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1024&q=80',
    rating: 4.5,
    reviews: 34,
    target: 'Space lovers',
    features: ['Queen size', 'Cotton blend', 'Glow-in-dark'],
  }
];

const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Telescopes & Accessories', value: 'telescopes', minPrice: 3999, maxPrice: 32999 },
  { name: 'Space Merchandise', value: 'merchandise', minPrice: 999, maxPrice: 1999 },
  { name: 'Books & Education', value: 'books', minPrice: 799, maxPrice: 1499 },
  { name: 'Collectibles', value: 'collectibles', minPrice: 2999, maxPrice: 4999 },
  { name: 'Gadgets & Kits', value: 'gadgets', minPrice: 3499, maxPrice: 24999 },
  { name: 'Home & Lifestyle', value: 'home', minPrice: 1999, maxPrice: 2499 },
  { name: 'Software & Apps', value: 'software' },
];

const sortOptions = [
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Rating: High to Low', value: 'rating_desc' },
  { name: 'Most Reviewed', value: 'reviews_desc' },
];

const Products = () => {
  const theme = useTheme();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price_asc');
  const [priceRange, setPriceRange] = useState([799, 32999]);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    // Update price range based on category
    if (category !== 'all') {
      const selectedCat = categories.find(cat => cat.value === category);
      if (selectedCat) {
        setPriceRange([selectedCat.minPrice, selectedCat.maxPrice]);
      }
    } else {
      setPriceRange([799, 32999]); // Reset to full range
    }
  };

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'reviews_desc':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Filters Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography gutterBottom>Price Range (₹)</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={799}
              max={32999}
              sx={{
                '& .MuiSlider-valueLabel': {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">₹{priceRange[0]}</Typography>
              <Typography variant="caption">₹{priceRange[1]}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  '& .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', pt: '75%' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                  }}
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
                    <Favorite sx={{ color: theme.palette.cosmic.nebula }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    mb: 1,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    height: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.name}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={product.target}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(0, 180, 216, 0.1)',
                      color: 'primary.main',
                      mr: 1,
                    }}
                  />
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(114, 9, 183, 0.1)',
                      color: 'secondary.main',
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: '3em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews})
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  ₹{product.price.toLocaleString()}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => addToCart(product)}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    color: 'background.paper',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
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
  );
};

export default Products;
