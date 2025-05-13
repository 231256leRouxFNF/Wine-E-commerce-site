import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Badge, 
  Drawer, List, ListItem, ListItemText, Box
} from '@mui/material';
import { ShoppingCart, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About', path: '/about' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navLinks.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.title}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          🍷 e-Wine
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navLinks.map((item) => (
            <IconButton
              key={item.title}
              component={Link}
              to={item.path}
              color="inherit"
            >
              {item.title}
            </IconButton>
          ))}
        </Box>

        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;