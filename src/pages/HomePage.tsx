import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeroCarousel from '../components/HeroCarousel';
import ApiService from '@/services/api';
import { LatestProduct } from '../types';
import { setProductDetail } from '@/store/slices/productDetailSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [latestProducts, setLatestProducts] = useState<LatestProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    console.log("useEffect")
    fetchLatestProducts();
  },[])

  const fetchLatestProducts = async() => {
    try {
      console.log("fetchLatestProducts")
      const ProductService = new ApiService()
      const result = await ProductService.getLatestProducts(10) // Get 8 latest products
      setLatestProducts(result.products)
      console.log("Latest Products:", result.products)
    } catch (error) {
      console.error("Error fetching latest products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = async (id: string) => {
    const ProductService = new ApiService();
    console.log("Product:", id)
    const result = await ProductService.getProduct(id)
    console.log("Product:", result)
    dispatch(setProductDetail(result));
    navigate(`/product/${id}`)
  }


  return (
    <Box>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Latest Products Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}
        >
          Latest Products
        </Typography>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Loading latest products...</Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3
          }}>
            {latestProducts.map((product) => (
              <Card
                key={product['internal_id']}
                sx={{
                  height: 320,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  width: '100%',
                  bgcolor: '#f5f7fa',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottom: '1px solid #f0f0f0',
                  overflow: 'hidden',
                }}>
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: 160,
                      width: 'auto',
                      objectFit: 'contain',
                      m: 'auto',
                      cursor: 'pointer',
                    }}
                    image={product['image']}
                    alt={product['name']}
                    loading="lazy"
                    onClick={() => handleProductClick(product['internal_id'])}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '0.9rem',
                      minHeight: 40,
                      maxHeight: 50,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      pt: 1,
                      pb: 1,
                      pl: 1.5,
                      pr: 1.5,
                    }}
                  >
                    {product['name']}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      textAlign: 'left',
                      pl: 1,
                      pr: 2,
                      mb: 0.5,
                    }}
                  >
                    {product['category']}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: 'none'}}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        {!loading && latestProducts.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
              }}
            >
              View All Products
            </Button>
          </Box>
        )}
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