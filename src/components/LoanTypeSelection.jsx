import { 
  Button, 
  Typography, 
  Container,
  Box, 
  Grid, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery,
  IconButton,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setLoanType } from '../Redux/loanSlice';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import CheckCircle from '@mui/icons-material/CheckCircle';
import School from '@mui/icons-material/School';
import Language from '@mui/icons-material/Language';
import Science from '@mui/icons-material/Science';

const LoanTypeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loanType = useSelector((state) => state.loan.loanType);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Color scheme matching Tata Capital's style
  const colors = {
    primary: '#2A4B8C',
    secondary: '#E53E3E',
    background: '#F7FAFC',
    textPrimary: '#2D3748',
    textSecondary: '#4A5568'
  };

  const handleCardClick = (value) => {
    dispatch(setLoanType(value));
  };

  const handleNextClick = () => {
    if (loanType === 'Graduation') navigate('/GraduationLoanCriteria');
    else if (loanType === 'Foreign') navigate('/ForeignStudiesCriteria');
    else if (loanType === 'R & D') navigate('/RDLoanCriteria');
  };

  const loanTypes = [
    { 
      value: 'Graduation', 
      title: 'Graduation Loan', 
      description: 'Finance your undergraduate or postgraduate studies',
      icon: <School fontSize="large" />
    },
    { 
      value: 'Foreign', 
      title: 'Foreign Education', 
      description: 'Fund your overseas education and living expenses',
      icon: <Language fontSize="large" />
    },
    { 
      value: 'R & D', 
      title: 'Research & Development', 
      description: 'Support for innovative research projects',
      icon: <Science fontSize="large" />
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: colors.background,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8, px: isMobile ? 2 : 4 }}>
        <IconButton 
          onClick={() => navigate("/WelcomeScreen")}
          sx={{ 
            mb: 4,
            color: colors.textPrimary,
            '&:hover': { backgroundColor: 'rgba(42, 75, 140, 0.04)' }
          }}
        >
          <ArrowBackIosNew />
        </IconButton>

        {/* Main Content */}
        <Box textAlign={isMobile ? 'center' : 'left'} mb={8}>
          <Typography variant="h1" sx={{ 
            fontWeight: 800,
            color: colors.primary,
            fontSize: isMobile ? '2rem' : '2.5rem',
            mb: 2
          }}>
            Select Your Education Loan Type
          </Typography>
          <Typography variant="h6" sx={{ 
            color: colors.textSecondary,
            fontSize: isMobile ? '1rem' : '1.25rem',
            maxWidth: '600px',
            mx: isMobile ? 'auto' : 'unset'
          }}>
            Choose the loan option that best matches your academic requirements
          </Typography>
        </Box>

        {/* Loan Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {loanTypes.map((loan) => (
            <Grid item xs={12} sm={6} lg={4} key={loan.value}>
              <motion.div whileHover={{ y: -8 }}>
                <Card
                  onClick={() => handleCardClick(loan.value)}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    border: `2px solid ${loanType === loan.value ? colors.primary : '#e2e8f0'}`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      borderColor: colors.primary
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: '#dbeafe', 
                        color: colors.primary, 
                        width: 56, 
                        height: 56 
                      }}>
                        {loan.icon}
                      </Avatar>
                      {loanType === loan.value && (
                        <CheckCircle sx={{ color: colors.primary, fontSize: '2rem' }} />
                      )}
                    </Box>
                    
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      color: colors.textPrimary,
                      mb: 1.5
                    }}>
                      {loan.title}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                      fontSize: '1rem'
                    }}>
                      {loan.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 8,
          gap: 2
        }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/WelcomeScreen")}
            sx={{
              px: 6,
              py: 2,
              borderRadius: '8px',
              borderColor: '#cbd5e1',
              color: colors.textSecondary,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#94a3b8'
              }
            }}
          >
            Back
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNextClick}
            disabled={!loanType}
            sx={{
              px: 6,
              py: 2,
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: colors.primary,
              color: 'white',
              '&:hover': {
                backgroundColor: '#1d4ed8',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              },
              '&.Mui-disabled': {
                backgroundColor: '#e2e8f0',
                color: '#94a3b8'
              }
            }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoanTypeSelection;