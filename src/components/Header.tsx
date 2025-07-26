import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ApiService from '@/services/api';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        // Convert search query to product index (assuming it's a number)
        const query = parseInt(searchQuery.trim());
        
        if (isNaN(query)) {
          return;
        }
        
        const apiService = new ApiService();
        const searchResults = await apiService.searchProducts(query, 1, 10);
        console.log("Search results:", searchResults)
        // Navigate to products page with search results
        navigate(`/products?search=${query}`);
      } catch (error) {
        console.error('Search error:', error);
        // Still navigate to products page even if API call fails
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 0, 
            cursor: 'pointer',
            fontWeight: 700,
            color: '#1976d2'
          }}
          onClick={() => navigate('/')}
        >
          ShopHub
        </Typography>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            flexGrow: 1,
            mx: { xs: 1, md: 4 },
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
          }}
        >
          <InputBase
            placeholder="Enter product index..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              ml: 2,
              flex: 1,
              color: 'inherit',
              '& .MuiInputBase-input': {
                color: 'inherit',
              },
            }}
          />
          <IconButton type="submit" sx={{ p: 1, color: 'inherit' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/products')}
              sx={{ textTransform: 'none' }}
            >
              Products
            </Button>
            <IconButton color="inherit">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" onClick={onCartClick}>
              <Badge badgeContent={2} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={onCartClick}>
              <Badge badgeContent={2} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 