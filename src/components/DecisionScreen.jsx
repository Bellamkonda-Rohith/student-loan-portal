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
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementTotalApplications,
  incrementQualifiedApplications,
  incrementNotQualifiedApplications,
  addDisqualificationReason,
} from '../Redux/DashboardSlice';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const DecisionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      decisionResult.reasons.forEach((reason) => {
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
    const birthDate = dayjs(dob);
    const today = dayjs();
    let age = today.year() - birthDate.year();
    if (
      today.month() < birthDate.month() ||
      (today.month() === birthDate.month() && today.date() < birthDate.date())
    ) {
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

    if (
      !income ||
      !employment ||
      !financialInfo ||
      !Fullname ||
      !Dob ||
      !Address ||
      !ContactInfo ||
      !qualification ||
      !institution ||
      !graduationYear ||
      !gpa
    ) {
      reasons.push('All fields are required.');
    }

    if (loanType === 'graduation' && !['Bachelors', 'Masters', 'PhD'].includes(qualification)) {
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
    if (loanType === 'foreign' && !['Bachelors', 'Masters', 'PhD'].includes(qualification)) {
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
    if (loanType === 'rd' && !['Masters', 'PhD'].includes(qualification)) {
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
  const formattedDob = dayjs(Dob).format('MM/DD/YYYY');

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
          Loan Application Decision
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
          Please review your profile details below.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
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
                    Personal Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Full Name:</strong> {Fullname}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Date of Birth:</strong> {formattedDob}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Address:</strong> {Address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Contact Information:</strong> {ContactInfo}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
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
                    Educational Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Qualification:</strong> {qualification}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Institution:</strong> {institution}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Graduation Year:</strong> {graduationYear}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>GPA:</strong> {gpa}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
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
                    Financial Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Income:</strong> {income}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Employment:</strong> {employment}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong>Financial Info:</strong> {financialInfo}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
              p: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                background:
                  decision.status === 'Approved'
                    ? 'linear-gradient(45deg, #4ade80 0%, #22c55e 100%)'
                    : 'linear-gradient(45deg, #f87171 0%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Decision: {decision.status}
            </Typography>
          </Card>
        </Box>
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
            onClick={handleSubmitClick}
            sx={{
              py: 2,
              px: 4,
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DecisionScreen;