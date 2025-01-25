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

  const loanTypes = [
    { value: 'Graduation', title: 'Graduation Loans', description: 'Click to view the eligibility criteria' },
    { value: 'Foreign', title: 'Foreign Studies', description: 'Click to view the eligibility criteria' },
    { value: 'R & D', title: 'R & D', description: 'Click to view the eligibility criteria' },
  ];

  return (
    <Container component="main" maxWidth="md" className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Box className="bg-white p-4 rounded-3 shadow-lg text-center w-100" style={{ maxWidth: '900px' }}>
        <Typography component="h1" variant="h4" className="text-primary mb-4">
          Select Loan Type
        </Typography>
        <Typography component="p" variant="body1" className="mb-4">
          Choose from the available loan types.
        </Typography>
        <Grid container spacing={2} justifyContent="center" className="row">
          {loanTypes.map((loan) => (
            <Grid item xs={12} sm={6} md={4} key={loan.value} className="col-12 col-sm-6 col-md-4 mb-3">
              <Card
                className={`h-100 d-flex flex-column justify-content-between cursor-pointer border ${
                  loanType === loan.value ? 'border-primary border-2' : 'border-secondary'
                } transition-ease`}
                onClick={() => handleCardClick(loan.value)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom className="text-primary">
                    {loan.title}
                  </Typography>
                  <Typography variant="body2" className="text-secondary">
                    {loan.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box className="d-flex justify-content-end w-100 mt-3">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            disabled={!loanType}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoanTypeSelection;
