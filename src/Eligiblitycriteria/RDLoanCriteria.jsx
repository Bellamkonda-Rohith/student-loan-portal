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
        padding: { xs: 3, sm: 4 },
        
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: { xs: 3, sm: 4 },
          borderRadius: '16px',
          boxShadow: 3,
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',  // Ensuring it doesn't get too wide on larger screens
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#00B8D4', fontSize: { xs: '1.75rem', sm: '2rem' } }}
        >
          R & D Loans
        </Typography>
        <Typography
          component="p"
          variant="body1"
          gutterBottom
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#333', lineHeight: 1.6 }}
        >
          Eligibility Criteria:
        </Typography>

        {/* Criteria displayed vertically */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {/* Education */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Education:</strong> Master's Degree
              </Typography>
            </Paper>
          </Grid>

          {/* Age */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Age:</strong> 21-40
              </Typography>
            </Paper>
          </Grid>

          {/* Household Income */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Household Income:</strong> Up to $100,000
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Buttons at the bottom */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{
              width: '100%',
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '30px',
              marginBottom: 2,
              '&:hover': { borderColor: '#FF4081', color: '#FF4081' },
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              width: '100%',
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '30px',
              '&:hover': { backgroundColor: '#FF4081' },
              disabled: { backgroundColor: '#ccc' },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RDLoanCriteria;
