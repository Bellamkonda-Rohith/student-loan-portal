import { Button, Typography, Container, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/LoanTypeSelection");
  };

  return (
    <Container 
      component="main" 
      maxWidth="md" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: { xs: 2, sm: 3 }, // Add padding for smaller screens
      }}
    >
      <Box
        className="bg-white p-4 rounded-3 shadow-lg text-center w-100"
        sx={{
          maxWidth: '600px',
          width: '100%', // Ensure full width on smaller screens
          padding: { xs: 3, sm: 4 },
          borderRadius: '16px',
          boxShadow: 3,
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          className="text-primary mb-4" 
          sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#00B8D4' }}
        >
          Welcome to the Student Loan Application Portal
        </Typography>
        <Typography 
          component="p" 
          variant="body1" 
          className="mb-4" 
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, lineHeight: 1.6 }}
        >
          Start your journey towards educational funding. Our streamlined application process will guide you through each step to help you secure the financial support you need for your academic pursuits.
        </Typography>
        <Grid 
          container 
          justifyContent="center" 
          sx={{ marginTop: 2 }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            className="mt-3 mb-2" 
            onClick={handleButton}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              padding: { xs: '10px 20px', sm: '12px 24px' },
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#FF4081',
              },
            }}
          >
            Start Application
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
