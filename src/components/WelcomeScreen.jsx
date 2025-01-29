import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  Grid, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    });
  }, [controls]);

  const handleButtonClick = () => {
    navigate("/LoanTypeSelection");
  };

  return (
    <Container 
      component="main" 
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 80%)`,
          opacity: 0.05,
        }}
      />

      {/* Floating gradient circles */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <Grid 
        container 
        spacing={6}
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            <Box
              sx={{
                padding: isMobile ? 3 : 6,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
                }
              }}
            >
              <Typography 
                variant={isMobile ? 'h4' : 'h2'}
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                Welcome to the Student Loan Application Portal
              </Typography>

              <Typography 
                variant="body1" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Achieve your academic goals with our intuitive loan platform. 
                Get instant eligibility checks, competitive rates, and 
                flexible repayment options - all in three simple steps.
              </Typography>

              <Button 
                fullWidth
                variant="contained" 
                onClick={handleButtonClick}
                sx={{
                  py: 2,
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Start Free Application
              </Button>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                position: 'relative',
                textAlign: 'center',
                perspective: 1000,
              }}
            >
              <Box
                sx={{
                  padding: isMobile ? 3 : 6,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
                  textAlign: 'left',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
                  }
                }}
              >
                <Typography 
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  Why Choose Us?
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  • Instant eligibility checks<br />
                  • Competitive interest rates<br />
                  • Flexible repayment options<br />
                  • No hidden fees<br />
                  • 24/7 customer support
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
                    borderRadius: '2px',
                    mt: 3,
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomeScreen;