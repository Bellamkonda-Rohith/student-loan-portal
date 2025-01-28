
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setLoanType } from '../Redux/loanSlice';

const LoanTypeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loanType = useSelector((state) => state.loan.loanType);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCardClick = (value) => {
    dispatch(setLoanType(value));
  };

  const handleNextClick = () => {
    if (loanType === 'Graduation') {
      navigate('/GraduationLoanCriteria');
    } else if (loanType === 'Foreign') {
      navigate('/ForeignStudiesCriteria');
    } else if (loanType === 'R & D') {
      navigate('/RDLoanCriteria');
    }
  };

  const handleBackClick = () => {
    navigate('/WelcomeScreen');
  };

  const loanTypes = [
    { value: 'Graduation', title: 'Graduation Loans', description: 'Click to view the eligibility criteria' },
    { value: 'Foreign', title: 'Foreign Studies', description: 'Click to view the eligibility criteria' },
    { value: 'R & D', title: 'R & D', description: 'Click to view the eligibility criteria' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
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
          Select Loan Type
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Choose from the available loan types that best suit your academic goals.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {loanTypes.map((loan, index) => (
            <Grid item xs={12} sm={6} md={4} key={loan.value}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(16px)',
                    border: loanType === loan.value ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                  onClick={() => handleCardClick(loan.value)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      {loan.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      {loan.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            sx={{
              py: 2,
              px: 4,
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNextClick}
            disabled={!loanType}
            sx={{
              py: 2,
              px: 4,
              borderRadius: '50px',
              background: loanType
                ? 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: loanType ? '0 8px 24px rgba(79, 70, 229, 0.4)' : 'none',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LoanTypeSelection;
