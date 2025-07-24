import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
} from '@mui/material';

// Mock product data
const mockProduct = {
  'Internal ID': 'product-1',
  'Product Name': 'Premium Wireless Headphones',
  'Product Description': 'High-quality wireless headphones with noise cancellation, long battery life, and premium sound quality. Perfect for music lovers and professionals alike.',
  'Product Category': 'Electronics',
  'Product Price': 299.99,
  'Product Image URL': 'https://picsum.photos/600/600?random=1',
  'Product Brand': 'AudioTech Pro',
  'Product Rating': '4.8',
  'Product Reviews': 1247,
  'Product Stock': 45,
  'Product SKU': 'ATH-WH001',
  'Product Weight': 0.25,
  'Product Dimensions': '18 x 8 x 4 cm',
  'Product Color': 'Black',
  'Product Material': 'Premium Plastic & Metal',
  'Product Warranty': '2 Years',
  'Product Shipping': 'Free Shipping',
  'Product Return Policy': '30 Days Return',
  'Product Tags': ['Wireless', 'Noise Cancelling', 'Bluetooth', 'Premium'],
  'Product Features': [
    'Active Noise Cancellation',
    '40-hour battery life',
    'Bluetooth 5.0',
    'Premium audio drivers',
    'Touch controls',
    'Voice assistant support'
  ],
  'Product Specifications': {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 ohms',
    'Sensitivity': '100dB',
    'Battery Life': '40 hours',
    'Charging Time': '2 hours'
  }
};

const ProductDetailPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const product = mockProduct; // In real app, fetch by ID

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product['Product Stock']) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Adding to cart:', { product, quantity });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Product Images */}
        <Box>
          <Card>
            <Box
              component="img"
              src={product['Product Image URL']}
              alt={product['Product Name']}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
              }}
              loading="lazy"
            />
          </Card>
        </Box>

        {/* Product Info */}
        <Box>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {product['Product Name']}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                ${product['Product Price']}
              </Typography>
              <Chip label={product['Product Category']} color="primary" variant="outlined" />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="body1" color="text.secondary">
                ⭐ {product['Product Rating']}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ({product['Product Reviews']} reviews)
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              {product['Product Description']}
            </Typography>

            {/* Product Tags */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Tags:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product['Product Tags'].map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color={product['Product Stock'] > 0 ? 'success.main' : 'error.main'}>
                {product['Product Stock'] > 0 
                  ? `In Stock (${product['Product Stock']} available)`
                  : 'Out of Stock'
                }
              </Typography>
            </Box>

            {/* Quantity and Add to Cart */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Quantity:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, max: product['Product Stock'] }}
                  sx={{ width: 100 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={product['Product Stock'] === 0}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>

            {/* Product Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Product Details:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Brand:</strong> {product['Product Brand']}
                </Typography>
                <Typography variant="body2">
                  <strong>SKU:</strong> {product['Product SKU']}
                </Typography>
                <Typography variant="body2">
                  <strong>Color:</strong> {product['Product Color']}
                </Typography>
                <Typography variant="body2">
                  <strong>Material:</strong> {product['Product Material']}
                </Typography>
                <Typography variant="body2">
                  <strong>Weight:</strong> {product['Product Weight']} kg
                </Typography>
                <Typography variant="body2">
                  <strong>Dimensions:</strong> {product['Product Dimensions']}
                </Typography>
              </Box>
            </Box>

            {/* Shipping & Returns */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Shipping & Returns:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Shipping:</strong> {product['Product Shipping']}
                </Typography>
                <Typography variant="body2">
                  <strong>Warranty:</strong> {product['Product Warranty']}
                </Typography>
                <Typography variant="body2">
                  <strong>Return Policy:</strong> {product['Product Return Policy']}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Features
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {product['Product Features'].map((feature, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="body1">• {feature}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Specifications */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Specifications
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {Object.entries(product['Product Specifications']).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {key}:
                  </Typography>
                  <Typography variant="body2">
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetailPage; 