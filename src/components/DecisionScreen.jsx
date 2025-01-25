import { Button, Typography, Container, Box, Grid, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementTotalApplications,
  incrementQualifiedApplications,
  incrementNotQualifiedApplications,
  addDisqualificationReason
} from '../Redux/DashboardSlice';
import dayjs from 'dayjs';

const DecisionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    navigate('/FinancialProfile');
  };

  const handleSubmitClick = () => {
    dispatch(incrementTotalApplications());
    const decisionResult = getDecision();
    if (decisionResult.status === 'Approved') {
      dispatch(incrementQualifiedApplications());
    } else {
      dispatch(incrementNotQualifiedApplications());
      decisionResult.reasons.forEach(reason => {
        dispatch(addDisqualificationReason(reason));
      });
    }
    navigate('/AdminDashboard');
  };

  const { income, employment, financialInfo } = useSelector((state) => state.FinancialProfileform);
  const { Fullname, Dob, Address, ContactInfo } = useSelector((state) => state.Personalformdata);
  const { qualification, institution, graduationYear, gpa } = useSelector((state) => state.Educationalform);
  const loanType = useSelector((state) => state.loan.loanType);

  const calculateAge = (dob) => {
    const birthDate = dayjs(dob, 'YYYY-MM-DD');
    const today = dayjs();
    let age = today.year() - birthDate.year();
    if (today.month() < birthDate.month() || (today.month() === birthDate.month() && today.date() < birthDate.date())) {
      age--;
    }
    return age;
  };

  const convertGPA = (gpa) => {
    const gpaValue = parseFloat(gpa);
    return gpaValue <= 10 ? gpaValue * 10 : gpaValue;
  };

  const getDecision = () => {
    const incomeValue = parseInt(income, 10);
    const age = calculateAge(Dob);
    const gpaValue = convertGPA(gpa);

    let reasons = [];

    if (loanType === 'graduation' && !(['Bachelors', 'Masters', 'PhD'].includes(qualification))) {
      reasons.push('Qualification does not meet the requirements.');
    }
    if (loanType === 'graduation' && incomeValue < 50000) {
      reasons.push('Household income is below $50,000.');
    }
    if (loanType === 'graduation' && (age < 18 || age > 30)) {
      reasons.push('Age is not within the range of 18-30.');
    }
    if (loanType === 'graduation' && gpaValue < 80) {
      reasons.push('GPA is below 80%.');
    }
    if (loanType === 'foreign' && !(['Bachelors', 'Masters', 'PhD'].includes(qualification))) {
      reasons.push('Qualification does not meet the requirements.');
    }
    if (loanType === 'foreign' && incomeValue < 75000) {
      reasons.push('Household income is below $75,000.');
    }
    if (loanType === 'foreign' && (age < 18 || age > 35)) {
      reasons.push('Age is not within the range of 18-35.');
    }
    if (loanType === 'foreign' && gpaValue < 80) {
      reasons.push('GPA is below 80%.');
    }
    if (loanType === 'rd' && !(['Masters', 'PhD'].includes(qualification))) {
      reasons.push('Qualification does not meet the requirements.');
    }
    if (loanType === 'rd' && incomeValue < 100000) {
      reasons.push('Household income is below $100,000.');
    }
    if (loanType === 'rd' && (age < 21 || age > 40)) {
      reasons.push('Age is not within the range of 21-40.');
    }
    if (loanType === 'rd' && gpaValue < 80) {
      reasons.push('GPA is below 80%.');
    }

    if (reasons.length > 0) {
      return { status: 'Not Approved', reasons: reasons };
    } else {
      return { status: 'Approved', reasons: [] };
    }
  };

  const decision = getDecision();

  return (
    <Container component="main" maxWidth="lg" className="d-flex flex-column justify-content-center align-items-center vh-100 py-4">
      <Box className="bg-white p-4 rounded-3 shadow-lg text-center w-100" style={{ maxWidth: '1200px' }}>
        <Typography component="h1" variant="h4" className="text-primary mb-4">
          Loan Application Decision
        </Typography>
        <Divider variant="middle" />
        <Typography component="p" variant="h6" className="mb-4 mt-4">
          Please review your profile details below.
        </Typography>
        <Grid container spacing={2} className="row">
          <Grid item xs={12} md={4} className="col-12 col-md-4 mb-3">
            <Paper className="p-3 text-left bg-light h-100">
              <Typography variant="h6" gutterBottom>
                Personal Profile Summary
              </Typography>
              <Typography variant="body1"><strong>Full Name:</strong> {Fullname}</Typography>
              <Typography variant="body1"><strong>Date of Birth:</strong> {Dob}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {Address}</Typography>
              <Typography variant="body1"><strong>Contact Information:</strong> {ContactInfo}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className="col-12 col-md-4 mb-3">
            <Paper className="p-3 text-left bg-light h-100">
              <Typography variant="h6" gutterBottom>
                Educational Profile Summary
              </Typography>
              <Typography variant="body1"><strong>Highest Qualification:</strong> {qualification}</Typography>
              <Typography variant="body1"><strong>Institution Name:</strong> {institution}</Typography>
              <Typography variant="body1"><strong>Year of Graduation:</strong> {graduationYear}</Typography>
              <Typography variant="body1"><strong>GPA/Percentage:</strong> {gpa}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className="col-12 col-md-4 mb-3">
            <Paper className="p-3 text-left bg-light h-100">
              <Typography variant="h6" gutterBottom>
                Financial Profile Summary
              </Typography>
              <Typography variant="body1"><strong>Household Income:</strong> {income}</Typography>
              <Typography variant="body1"><strong>Employment Status:</strong> {employment}</Typography>
              <Typography variant="body1"><strong>Other Financial Information:</strong> {financialInfo}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Paper className="p-4 text-center mt-4 bg-light rounded-3 shadow-sm">
          <Typography variant="h5" gutterBottom>
            Decision: {decision.status}
          </Typography>
        </Paper>
        <Box className="d-flex justify-content-between w-100 mt-4">
          <Button variant="outlined" color="secondary" onClick={handleBackClick} sx={{ borderRadius: '20px', px: 4 }}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmitClick} sx={{ borderRadius: '20px', px: 4 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DecisionScreen;
