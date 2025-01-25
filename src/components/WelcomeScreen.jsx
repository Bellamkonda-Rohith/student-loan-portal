import { Button, Typography, Container, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/LoanTypeSelection");
  };

  return (
    <Container component="main" maxWidth="md" className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Box className="bg-white p-4 rounded-3 shadow-lg text-center w-100" style={{ maxWidth: '600px' }}>
        <Typography component="h1" variant="h4" className="text-primary mb-4">
          Welcome to the Student Loan Application Portal
        </Typography>
        <Typography component="p" variant="body1" className="mb-4">
        Start your journey towards educational funding. Our streamlined application process will guide you through each step to help you secure the financial support you need for your academic pursuits.
        </Typography>
        <Grid container justifyContent="center">
          <Button variant="contained" color="primary" className="mt-3 mb-2" onClick={handleButton}>
            Start Application
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
