import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Pagination,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ApiService from '@/services/api';
import { Product } from '@/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductDetail } from '@/store/slices/productDetailSlice';

const ProductListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);


 

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      handleSearch(searchParam);
    } else {
      console.log("fetchProducts")
      fetchProducts();
    }
  }, [searchParams]);

  const fetchProducts = async() => {
    const ProductService = new ApiService()
    const result = await ProductService.getProducts()
    setProducts(result.products)
    console.log("Products:",result)
  }

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      const productIndex = parseInt(query);
      
      if (isNaN(productIndex)) {
        console.log("Invalid product index");
        return;
      }
      
      const ProductService = new ApiService();
      const result = await ProductService.searchProducts(productIndex, 1, 10);
      setProducts(result.products);
      console.log("Search results:", result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }

  const handleProductClick = async (id: string) => {
    const ProductService = new ApiService();
    console.log("Product:",id)
    const result = await ProductService.getProduct(id)
    console.log("Product:",result)
    dispatch(setProductDetail(result));
    navigate(`/product/${id}`)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* Search Results Header */}
      {searchQuery && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Search Results
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Showing results for product index: {searchQuery}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => {
              setSearchQuery('');
              navigate('/products');
            }}
            sx={{ mt: 2 }}
          >
            Clear Search
          </Button>
        </Box>
      )}

      {/* Loading State */}
      {isSearching && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Searching...</Typography>
        </Box>
      )}

      {/* Products Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        {currentProducts.map((product) => (
          <Card
            key={product['Internal ID']}
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
                image={product['Image']}
                alt={product['Name']}
                loading="lazy"
                // onClick={() => navigate(`/product/${product['Internal ID']}`)}
                onClick = {() => handleProductClick(product['Internal ID'])}
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
                {product['Name']}
              </Typography>
              {/* Category above price */}
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
                {product['Category']}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                {product['Description'].substring(0, 100)}...
              </Typography> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {product['Product Rating']}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product['Product Reviews']} reviews)
                </Typography>
              </Box> */}
              {/* <Chip
                label={product['Category']}
                size="small"
                sx={{ mb: 1, alignSelf: 'flex-start' }}
              /> */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  ${product.Price}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductListPage; 