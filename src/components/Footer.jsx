import { Box, Container, Grid, Typography, Link, Divider, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Home', path: '/' },
    { title: 'New Application', path: '/loan-type' },
    { title: 'Dashboard', path: '/admin-dashboard' },
    { title: 'Privacy Policy', path: '/privacy' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: '👔' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'GitHub', url: '#', icon: '💻' },
    { name: 'Email', url: 'mailto:contact@loanportal.com', icon: '✉️' }
  ];

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #1A237E, #2A4B8C)',
      color: 'white',
      mt: 8,
      py: 6,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #00BFA5, #3A86FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                LoanPortal
              </Typography>
            </motion.div>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
              Empowering students through accessible education financing solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}>
                    <Typography variant="h6">{social.icon}</Typography>
                  </Box>
                </motion.a>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.map((link) => (
                <motion.div key={link.title} whileHover={{ x: 5 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography sx={{ opacity: 0.9 }}>
                📍 123 Education Street, Finance City
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                📞 +1 (555) 123-4567
              </Typography>
              <motion.a 
                href="mailto:contact@loanportal.com" 
                style={{ textDecoration: 'none', color: 'inherit' }}
                whileHover={{ x: 5 }}
              >
                <Typography sx={{ 
                  opacity: 0.9,
                  '&:hover': {
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}>
                  📧 contact@loanportal.com
                </Typography>
              </motion.a>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((text) => (
                <motion.div key={text} whileHover={{ x: 5 }}>
                  <Link
                    href="#"
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {text}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: 4, 
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          opacity: 0.8
        }}>
          <Typography variant="body2">
            © {currentYear} LoanPortal. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2">
              FCA Registered: 123456
            </Typography>
            <Typography variant="body2">
              ISO 27001 Certified
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;