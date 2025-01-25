import { Button, Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoanType } from '../Redux/loanSlice';

const LoanTypeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loanType = useSelector((state) => state.loan.loanType);

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
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Box
        className="bg-white p-4 rounded-3 shadow-lg text-center w-100"
        sx={{
          maxWidth: '900px',
          width: '100%',
          padding: { xs: 3, sm: 4 },
          borderRadius: '16px',
          boxShadow: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#00B8D4' }}
          className="mb-4"
        >
          Select Loan Type
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            marginBottom: 4,
            lineHeight: 1.6,
            color: '#333',
          }}
        >
          Choose from the available loan types.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {loanTypes.map((loan) => (
            <Grid item xs={12} sm={6} md={4} key={loan.value}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  cursor: 'pointer',
                  border: loanType === loan.value ? '2px solid #00B8D4' : '2px solid #ccc',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
                onClick={() => handleCardClick(loan.value)}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00B8D4' }}>
                    {loan.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {loan.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackClick}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              padding: { xs: '10px 20px', sm: '12px 24px' },
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#FF4081',
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            disabled={!loanType}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              padding: { xs: '10px 20px', sm: '12px 24px' },
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#FF4081',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoanTypeSelection;
