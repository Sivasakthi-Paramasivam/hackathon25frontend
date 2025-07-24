import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Circle as CircleIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import banner images
import banner1 from '../assets/images/Banners/banner1.jpg';
import banner2 from '../assets/images/Banners/banner2.jpg';
import banner3 from '../assets/images/Banners/banner3.jpg';

const heroData = [
  {
    id: 1,
    title: "Discover Amazing Products",
    subtitle: "Shop the latest trends with lightning-fast performance and exceptional user experience.",
    image: banner1,
    ctaText: "Shop Now",
    ctaSecondary: "Browse Categories",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    subtitle: "Every product is carefully selected to ensure the highest quality and customer satisfaction.",
    image: banner2,
    ctaText: "Explore Premium",
    ctaSecondary: "Learn More",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Fast & Secure Shopping",
    subtitle: "Enjoy seamless shopping with our secure payment system and fast delivery options.",
    image: banner3,
    ctaText: "Start Shopping",
    ctaSecondary: "View Deals",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  }
];

const HeroCarousel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentHero = heroData[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '80vh' },
        overflow: 'hidden',
        background: currentHero.gradient,
        color: 'white',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${currentHero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4, 
          alignItems: 'center',
          width: '100%'
        }}>
          <Box>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 700, 
                lineHeight: 1.2,
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              {currentHero.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                mb: 4, 
                opacity: 0.9, 
                lineHeight: 1.6,
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
            >
              {currentHero.subtitle}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                animation: 'fadeInUp 0.8s ease-out 0.4s both'
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
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
                {currentHero.ctaText}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
              >
                {currentHero.ctaSecondary}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: { xs: 300, md: 400 },
              animation: 'fadeInRight 0.8s ease-out 0.6s both'
            }}
          >
            <Box
              component="img"
              src={currentHero.image}
              alt={currentHero.title}
              sx={{
                maxWidth: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                borderRadius: 2,
              }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Container>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
          },
          zIndex: 3,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
          },
          zIndex: 3,
        }}
      >
        <ArrowForwardIcon />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 3,
        }}
      >
        {heroData.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              p: 0.5,
              color: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <CircleIcon sx={{ fontSize: index === currentSlide ? 12 : 8 }} />
          </IconButton>
        ))}
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroCarousel; 