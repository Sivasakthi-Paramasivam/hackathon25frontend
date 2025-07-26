import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import StarIcon from '@mui/icons-material/Star';


const ProductDetailPage: React.FC = () => {

  const product = useSelector((state: RootState) => state.productDetail.product);


  const handleAddToCart = () => {
    // Add to cart logic
    if (product) {
    }
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">Loading product details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: 'flex-start',
        background: '#f1f3f6',
        borderRadius: 2,
        p: { xs: 1, md: 3 },
        boxShadow: 1,
      }}>
        {/* Product Images and Main Actions */}
        <Box sx={{ flex: '0 0 400px', width: { xs: '100%', md: 400 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{ p: 3, background: '#fff', borderRadius: 2, boxShadow: 2, minWidth: 320, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              component="img"
              src={product.Image}
              alt={product.Name}
              sx={{
                width: '100%',
                maxWidth: 320,
                height: 'auto',
                borderRadius: 2,
                objectFit: 'contain',
                background: '#f7f7f7',
                p: 2,
              }}
              loading="lazy"
            />
          </Card>
          {/* Add vertical space between image and buttons */}
          <Box sx={{ height: 24 }} />
          {/* Quantity and Add to Cart/Buy Now (now directly below product name) */}
          <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2, maxWidth: 320, width: '100%', mx: 'auto', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={product.Stock === 0}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: '#ff9f00',
                color: '#fff',
                boxShadow: 2,
                '&:hover': { background: '#fb641b' },
                px: 4,
                py: 1.5,
                borderRadius: 1.5,
                minWidth: 160,
                height: 48,
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: '#fb641b',
                color: '#fff',
                boxShadow: 2,
                '&:hover': { background: '#ff9f00' },
                px: 4,
                py: 1.5,
                borderRadius: 1.5,
                minWidth: 160,
                height: 48,
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>

        {/* Product Info */}
        <Box sx={{ flex: 1, background: '#fff', borderRadius: 2, p: 3, boxShadow: 2 }}>
          {/* Product Name above Ratings */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121', mb: 1, textAlign: 'left' }}>
            {product.Name}
          </Typography>
          {/* Price above Ratings */}
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#388e3c', mb: 1, textAlign: 'left' }}>
            Price: ${product.Price}
          </Typography>
          {/* Ratings and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ background: '#388e3c', color: '#fff', px: 1, borderRadius: 1, fontWeight: 700, display: 'flex', alignItems: 'center', fontSize: 16 }}>
              4.3 <StarIcon sx={{ fontSize: 16, ml: 0.2 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">(1,234 ratings & 234 reviews)</Typography>
          </Box>

          {/* Stock Status and Availability */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: product.Stock > 0 ? '#388e3c' : '#d32f2f' }}>
              {product.Stock > 0
                ? `In Stock (${product.Stock} available)`
                : 'Out of Stock'
              }
            </Typography>
            <Chip
              label={product.Availability === 'pre_order' ? 'Pre-Order' : product.Availability}
              color={product.Availability === 'pre_order' ? 'warning' : 'success'}
              size="small"
            />
          </Box>

          {/* Description in Table */}
          <Box sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 2, background: '#fafbfc' }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: '#2874f0' }}>
              Product Details
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', width: '180px', background: '#f7f7f7' }}>Brand</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product.Brand}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>Color</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product.Color}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>Size</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product.Size}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>Availability</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product.Availability}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>EAN</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product.EAN}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>Short Description</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>{product['Short Description']}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '8px', border: '1px solid #eee', background: '#f7f7f7' }}>Description</td>
                    <td style={{ padding: '8px', border: '1px solid #eee' }}>
                      <span dangerouslySetInnerHTML={{ __html: product.Description }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage; 