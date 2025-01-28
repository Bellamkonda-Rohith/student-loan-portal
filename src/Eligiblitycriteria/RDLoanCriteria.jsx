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
      maxWidth="false"
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 4 },
        background: 'linear-gradient(135deg, #00B8D4, #FF4081)',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: { xs: 3, sm: 4 },
          borderRadius: '16px',
          boxShadow: 4,
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
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

        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Education:</strong> Master’s Degree
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Age:</strong> 21-40
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: '500' }}>
                <strong>Household Income:</strong> Up to $100,000
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '50px',
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
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '50px',
              '&:hover': { backgroundColor: '#FF4081' },
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
