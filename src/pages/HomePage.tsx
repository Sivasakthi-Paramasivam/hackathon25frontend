import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const featuredCategories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized loading times and smooth interactions.'
    },
    {
      icon: '🛡️',
      title: 'Secure Shopping',
      description: 'Your data is protected with industry-standard security measures and encryption.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your products delivered quickly with our efficient shipping network.'
    }
  ];

  return (
    <Box>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}
        >
          Shop by Category
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
          gap: 3 
        }}>
          {featuredCategories.map((category) => (
            <Card
              key={category}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
            >
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {category}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}
          >
            Why Choose ShopHub?
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4 
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="white">
                    {feature.icon}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            py: 6,
            px: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Discover thousands of products at unbeatable prices
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 