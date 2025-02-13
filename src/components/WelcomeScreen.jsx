import { 
  Button, 
  Typography, 
  Container,
  Box, 
  Grid, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  MonetizationOn,
  Schedule,
  Description,
  School,
  ArrowForward
} from '@mui/icons-material';
import sudentimage from '../assets/studentlaptop.webp'
import Benifites from '../assets/benifites.webp'

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Color definitions for consistency
  const colors = {
    primary: '#2A4B8C',      // Dark Blue (Tata Capital's primary)
    secondary: '#E53E3E',    // Accent Red
    background: '#F7FAFC',   // Light background
    textPrimary: '#2D3748',  // Dark text
    textSecondary: '#4A5568' // Secondary text
  };

  const features = [
    { icon: <MonetizationOn fontSize="large" />, title: "Low Interest Rates", value: "Starting at 10.99%*" },
    { icon: <Schedule fontSize="large" />, title: "Flexible Tenure", value: "Up to 60 Months" },
    { icon: <Description fontSize="large" />, title: "Easy Documentation", value: "Minimal Paperwork" },
    { icon: <School fontSize="large" />, title: "Loan Amount", value: "Up to ₹50 Lakhs" },
  ];

  const benefits = [
    "Instant approval decision",
    "No collateral required",
    "Flexible repayment options",
    "24/7 online access",
    "No prepayment charges"
  ];

  return (
    <Box sx={{ backgroundColor: colors.background }}>
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={6} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800,
                  color: colors.primary,
                  mb: 3,
                  fontSize: isMobile ? '2.5rem' : '3.5rem',
                  lineHeight: 1.2
                }}
              >
                Education Loans for Your Academic Success
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: colors.textSecondary, 
                  mb: 4,
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  lineHeight: 1.6
                }}
              >
                Get instant approval for education loans up to ₹50 lakhs with competitive interest rates and flexible repayment plans.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/LoanTypeSelection")}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  backgroundColor: colors.secondary,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#C53030',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Apply Now
              </Button>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Box
                component="img"
                src={sudentimage}
                alt="Student with laptop"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Grid */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div whileHover={{ y: -8 }}>
                  <Card sx={{ 
                    borderRadius: 4,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s',
                    border: `2px solid ${colors.primary}20`,
                    '&:hover': {
                      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Avatar sx={{ 
                        bgcolor: colors.primary, 
                        color: 'white', 
                        width: 64, 
                        height: 64,
                        mb: 3,
                        mx: 'auto'
                      }}>
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ 
                        mb: 1, 
                        fontWeight: 700,
                        color: colors.textPrimary
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 800,
                        color: colors.primary
                      }}>
                        {feature.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 2,
            color: colors.primary
          }}>
            Simple 3-Step Process
          </Typography>
          <Typography variant="h6" sx={{ color: colors.textSecondary }}>
            Get your loan approved in just 24 hours
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3].map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card sx={{ 
                  backgroundColor: colors.primary,
                  color: 'white',
                  borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                  position: 'relative',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px rgba(42, 75, 140, 0.2)'
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'white', 
                    color: colors.primary, 
                    width: 56, 
                    height: 56,
                    mb: 3,
                    mx: 'auto',
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}>
                    {step}
                  </Avatar>
                  <Typography variant="h5" sx={{ 
                    mb: 2, 
                    fontWeight: 700,
                    color: 'white'
                  }}>
                    Step {step}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1.1rem'
                  }}>
                    {index === 0 && "Complete our simple online application"}
                    {index === 1 && "Upload required documents securely"}
                    {index === 2 && "Get instant approval decision"}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={Benifites}
                alt="Benefits"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ 
                fontWeight: 800, 
                mb: 4,
                color: colors.primary
              }}>
                Why Choose Us?
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircle sx={{ color: colors.secondary, fontSize: '2rem' }} />
                    </ListItemIcon>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.textPrimary,
                      fontSize: '1.1rem'
                    }}>
                      {benefit}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;