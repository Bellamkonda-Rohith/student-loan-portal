import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Button, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import Language from '@mui/icons-material/Language';
import School from '@mui/icons-material/School';
import Public from '@mui/icons-material/Public';

const ForeignStudiesCriteria = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Color scheme
  const colors = {
    primary: '#2A4B8C',
    secondary: '#E53E3E',
    background: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#64748B'
  };

  const handleBack = () => navigate("/LoanTypeSelection");
  const handleNext = () => navigate("/PersonalProfile/foreign");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8, px: isMobile ? 2 : 4 }}>
        <IconButton 
          onClick={handleBack}
          sx={{
            mb: 4,
            color: colors.primary,
            '&:hover': { backgroundColor: 'rgba(42, 75, 140, 0.04)' }
          }}
        >
          <ArrowBackIosNew />
        </IconButton>

        {/* Main Content */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <Typography variant="h1" sx={{
                fontWeight: 800,
                color: colors.textPrimary,
                fontSize: isMobile ? '2rem' : '2.5rem',
                mb: 3
              }}>
                Foreign Studies Eligibility
              </Typography>
              
              <Typography variant="h6" sx={{
                color: colors.textSecondary,
                fontSize: isMobile ? '1rem' : '1.25rem',
                mb: 4
              }}>
                Requirements for overseas education funding
              </Typography>

              <Box component={motion.div} variants={itemVariants}>
                <Button
                  fullWidth={isMobile}
                  variant="contained"
                  onClick={handleNext}
                  size="large"
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    backgroundColor: colors.primary,
                    '&:hover': {
                      backgroundColor: '#1D4ED8',
                      boxShadow: '0 4px 6px rgba(42, 75, 140, 0.2)'
                    }
                  }}
                >
                  Start Application
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <Card sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h3" sx={{
                    fontWeight: 700,
                    color: colors.primary,
                    mb: 4,
                    fontSize: isMobile ? '1.5rem' : '1.75rem'
                  }}>
                    Key Requirements
                  </Typography>

                  <List>
                    {[
                      { icon: <Language />, text: 'Admission to accredited foreign university' },
                      { icon: <Public />, text: 'Valid passport and visa documentation' },
                      { icon: <School />, text: 'Minimum academic score of 75%' }
                    ].map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <ListItem sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar sx={{ 
                              bgcolor: '#DBEAFE', 
                              color: colors.primary,
                              width: 40,
                              height: 40
                            }}>
                              {item.icon}
                            </Avatar>
                          </ListItemIcon>
                          <Typography variant="body1" sx={{
                            color: colors.textPrimary,
                            fontSize: isMobile ? '1rem' : '1.1rem'
                          }}>
                            {item.text}
                          </Typography>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Documentation Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{
            fontWeight: 700,
            color: colors.textPrimary,
            mb: 4,
            fontSize: isMobile ? '1.25rem' : '1.5rem'
          }}>
            Required Documents
          </Typography>
          
          <Grid container spacing={4}>
            {[
              'University admission letter',
              'Passport copy (minimum 1 year validity)',
              'Financial sponsorship proof',
              'Academic transcripts & certificates'
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: '#F1F5F9'
                  }}>
                    <CheckCircle sx={{ 
                      color: colors.primary, 
                      mr: 2,
                      fontSize: '1.5rem' 
                    }}/>
                    <Typography variant="body1" sx={{ color: colors.textPrimary }}>
                      {item}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ForeignStudiesCriteria;