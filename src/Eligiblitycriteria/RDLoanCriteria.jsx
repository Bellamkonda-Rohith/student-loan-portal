import { Typography, Container, Box, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RDLoanCriteria = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/LoanTypeSelection');
  };

  const handleNext = () => {
    navigate('/PersonalProfile/rd');
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom color="primary">
          R & D Loans
        </Typography>
        <Typography component="p" variant="body1" gutterBottom>
          Eligibility Criteria:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                textAlign: 'left',
                backgroundColor: '#f0f0f0',
              }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>Education:</strong> Masters`Degree
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> 21-40
              </Typography>
              <Typography variant="body1">
                <strong>Household Income:</strong> Up to $100,000
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack} // Added onClick for Back button
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext} // Added onClick for Next button
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RDLoanCriteria;
