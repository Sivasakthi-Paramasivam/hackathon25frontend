import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Mock cart data
const mockCartItems = [
  {
    product: {
      'Internal ID': 'product-1',
      'Product Name': 'Premium Wireless Headphones',
      'Product Price': 299.99,
      'Product Image URL': 'https://picsum.photos/100/100?random=1',
    },
    quantity: 1,
  },
  {
    product: {
      'Internal ID': 'product-2',
      'Product Name': 'Smart Watch Pro',
      'Product Price': 199.99,
      'Product Image URL': 'https://picsum.photos/100/100?random=2',
    },
    quantity: 2,
  },
];

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const cartItems = mockCartItems;
  const total = cartItems.reduce((sum, item) => sum + (item.product['Product Price'] * item.quantity), 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Shopping Cart ({cartItems.length})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Your cart is empty
              </Typography>
            </Box>
          ) : (
            cartItems.map((item) => (
              <Box key={item.product['Internal ID']} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.product['Product Image URL']}
                    alt={item.product['Product Name']}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.product['Product Name']}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                      ${item.product['Product Price']}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total:
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
            {/* Removed Proceed to Checkout button as per API availability */}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer; 