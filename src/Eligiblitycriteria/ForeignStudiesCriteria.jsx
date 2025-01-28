import { Typography, Container, Box, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForeignStudiesCriteria = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/LoanTypeSelection');
  };

  const handleNext = () => {
    navigate('/PersonalProfile/foreign');
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
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: { xs: 3, sm: 4 },
          borderRadius: '16px',
          boxShadow: 5,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#00B8D4',
            fontSize: { xs: '1.8rem', sm: '2rem' },
          }}
        >
          Foreign Studies
        </Typography>
        <Typography
          component="p"
          variant="body1"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem' },
            color: '#333',
            lineHeight: 1.6,
          }}
        >
          Eligibility Criteria:
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {/* Education */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: '500',
                  color: '#555',
                }}
              >
                <strong>Education:</strong> Bachelor’s Degree
              </Typography>
            </Paper>
          </Grid>

          {/* Age */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: '500',
                  color: '#555',
                }}
              >
                <strong>Age:</strong> 18-35
              </Typography>
            </Paper>
          </Grid>

          {/* Household Income */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: { xs: 2, sm: 3 },
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: '500',
                  color: '#555',
                }}
              >
                <strong>Household Income:</strong> Up to $75,000
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{
              flexGrow: 1,
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '30px',
              borderColor: '#FF4081',
              '&:hover': { backgroundColor: '#FF4081', color: '#fff' },
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              flexGrow: 1,
              padding: { xs: '12px', sm: '10px 20px' },
              fontSize: { xs: '1rem', sm: '1.2rem' },
              borderRadius: '30px',
              backgroundColor: '#00B8D4',
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

export default ForeignStudiesCriteria;
