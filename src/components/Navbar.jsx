import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery, IconButton, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'New Application', path: '/LoanTypeSelection', icon: <DescriptionIcon /> },
  { title: 'Dashboard', path: '/AdminDashboard', icon: <DashboardIcon /> }
];

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(135deg, #2A4B8C, #3A86FF)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textDecoration: 'none',
            color: 'white',
            '&:hover': { opacity: 0.9 }
          }}
        >
          LoanPortal
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              {anchorEl ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <CloseIcon />
                </motion.div>
              ) : (
                <MenuIcon />
              )}
            </IconButton>
            
            <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  sx={{
    '& .MuiPaper-root': {
      width: '80vw',
      maxWidth: '300px',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      py: 1,
    }
  }}
  MenuListProps={{
    sx: { py: 0 }
  }}
>
  {navLinks.map((link) => (
    <motion.div
      key={link.title}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MenuItem
        component={Link}
        to={link.path}
        onClick={handleMenuClose}
        selected={location.pathname === link.path}
        sx={{
          minHeight: 56,
          '&.Mui-selected': {
            background: 'rgba(42, 75, 140, 0.1)',
            '&:hover': { background: 'rgba(42, 75, 140, 0.15)' }
          },
          '&:hover': { background: 'rgba(0, 0, 0, 0.05)' }
        }}
      >
        <ListItemIcon sx={{ color: '#1A237E' }}> {/* Fixed icon color */}
          {link.icon}
        </ListItemIcon>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600, 
            color: '#1A237E', // Explicit dark color
            flexGrow: 1
          }}
        >
          {link.title}
        </Typography>
      </MenuItem>
    </motion.div>
  ))}
  
  <Divider sx={{ my: 1 }} />
  
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.2 }}
  >
    <MenuItem
      component={Link}
      to="/admin-dashboard"
      onClick={handleMenuClose}
      sx={{
        background: 'linear-gradient(135deg, #00BFA5, #3A86FF)',
        color: 'white',
        borderRadius: '8px',
        mx: 2,
        my: 1,
        '&:hover': { opacity: 0.95 }
      }}
    >
      <DashboardIcon sx={{ mr: 2 }} />
      <Typography variant="body1" fontWeight={600}>
        Admin Dashboard
      </Typography>
    </MenuItem>
  </motion.div>
</Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                variant="text"
                sx={{
                  color: 'white',
                  fontWeight: location.pathname === link.path ? 700 : 500,
                  fontSize: '1rem',
                  textTransform: 'none',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: location.pathname === link.path ? 'white' : 'transparent',
                    transition: 'all 0.3s ease'
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {link.title}
              </Button>
            ))}
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 2 }} />
            <Button
              component={Link}
              to="/AdminDashboard"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #00BFA5, #3A86FF)',
                borderRadius: '8px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0, 191, 165, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 191, 165, 0.4)'
                }
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;