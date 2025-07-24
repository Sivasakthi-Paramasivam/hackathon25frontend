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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ApiService from '@/services/api';

// Mock product data for demonstration
const mockProducts = Array.from({ length: 24 }, (_, i) => ({
  'Internal ID': `product-${i + 1}`,
  'Product Name': `Product ${i + 1}`,
  'Product Description': `This is a description for product ${i + 1}. It's a high-quality item with great features.`,
  'Product Category': ['Electronics', 'Clothing', 'Home & Garden', 'Sports'][i % 4],
  'Product Price': Math.floor(Math.random() * 1000) + 50,
  'Product Image URL': `https://picsum.photos/300/300?random=${i + 1}`,
  'Product Brand': `Brand ${i % 5 + 1}`,
  'Product Rating': (Math.random() * 2 + 3).toFixed(1),
  'Product Reviews': Math.floor(Math.random() * 1000),
  'Product Stock': Math.floor(Math.random() * 100),
}));

const ProductListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Sports'];

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product['Product Name'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product['Product Description'].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product['Product Category'] === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'price':
          aValue = a['Product Price'];
          bValue = b['Product Price'];
          break;
        case 'rating':
          aValue = parseFloat(a['Product Rating']);
          bValue = parseFloat(b['Product Rating']);
          break;
        case 'reviews':
          aValue = a['Product Reviews'];
          bValue = b['Product Reviews'];
          break;
        default:
          aValue = a['Product Name'];
          bValue = b['Product Name'];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, sortBy, sortOrder]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Products
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="reviews">Reviews</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
      </Typography>

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
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product['Product Image URL']}
              alt={product['Product Name']}
              loading="lazy"
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {product['Product Name']}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                {product['Product Description'].substring(0, 100)}...
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {product['Product Rating']}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product['Product Reviews']} reviews)
                </Typography>
              </Box>
              <Chip
                label={product['Product Category']}
                size="small"
                sx={{ mb: 2, alignSelf: 'flex-start' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ${product['Product Price']}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none' }}
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