import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  incrementTotalApplications,
  incrementQualifiedApplications,
  incrementNotQualifiedApplications,
  addDisqualificationReason,
} from '../Redux/DashboardSlice';

const colors = {
  primary: '#2A4B8C',
  secondary: '#E53E3E',
  background: '#F7FAFC',
  textPrimary: '#2D3748',
  textSecondary: '#4A5568'
};

const DecisionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation handlers
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

  // Redux selectors
  const { income, employment, financialInfo } = useSelector((state) => state.FinancialProfileform);
  const { Fullname, Dob, Address, ContactInfo } = useSelector((state) => state.Personalformdata);
  const { qualification, institution, graduationYear, gpa } = useSelector((state) => state.Educationalform);
  const loanType = useSelector((state) => state.loan.loanType);

  // Helper functions
  const calculateAge = (dob) => {
    const birthDate = dayjs(dob);
    const today = dayjs();
    let age = today.year() - birthDate.year();
    if (today.month() < birthDate.month() || 
        (today.month() === birthDate.month() && today.date() < birthDate.date())) {
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

    if (!income || !employment || !financialInfo || !Fullname || !Dob || !Address || 
        !ContactInfo || !qualification || !institution || !graduationYear || !gpa) {
      reasons.push('All fields are required.');
    }

    // Loan type specific validations
    if (loanType === 'graduation') {
      if (!['Bachelors', 'Masters', 'PhD'].includes(qualification)) reasons.push('Qualification does not meet requirements');
      if (incomeValue < 50000) reasons.push('Household income below $50,000');
      if (age < 18 || age > 30) reasons.push('Age not between 18-30');
      if (gpaValue < 80) reasons.push('GPA below 80%');
    }
    else if (loanType === 'foreign') {
      if (!['Bachelors', 'Masters', 'PhD'].includes(qualification)) reasons.push('Qualification does not meet requirements');
      if (incomeValue < 75000) reasons.push('Household income below $75,000');
      if (age < 18 || age > 35) reasons.push('Age not between 18-35');
      if (gpaValue < 80) reasons.push('GPA below 80%');
    }
    else if (loanType === 'rd') {
      if (!['Masters', 'PhD'].includes(qualification)) reasons.push('Qualification does not meet requirements');
      if (incomeValue < 100000) reasons.push('Household income below $100,000');
      if (age < 21 || age > 40) reasons.push('Age not between 21-40');
      if (gpaValue < 80) reasons.push('GPA below 80%');
    }

    return reasons.length > 0 
      ? { status: 'Not Approved', reasons } 
      : { status: 'Approved', reasons: [] };
  };

  const decision = getDecision();
  const formattedDob = dayjs(Dob).format('MM/DD/YYYY');

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      position: 'relative',
      overflow: 'hidden',
      py: 4
    }}>
      <Container maxWidth="xl" sx={{ px: isMobile ? 2 : 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackClick}
          sx={{
            mb: 4,
            color: colors.primary,
            '&:hover': { backgroundColor: 'rgba(42, 75, 140, 0.04)' }
          }}
        >
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card sx={{
            borderRadius: 4,
            boxShadow: '0 16px 32px rgba(42, 75, 140, 0.1)',
            p: { xs: 3, sm: 4, md: 6 },
            position: 'relative',
            overflow: 'visible',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: '4px 4px 0 0'
            }
          }}>
            <Typography variant="h3" sx={{
              fontWeight: 700,
              color: colors.primary,
              mb: 4,
              fontSize: isMobile ? '1.8rem' : '2.2rem',
              textAlign: 'center'
            }}>
              Loan Application Decision
            </Typography>

            <Grid container spacing={3}>
              {/* Personal Profile Card */}
              <Grid item xs={12} md={4}>
                <Card sx={{
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(42, 75, 140, 0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.primary,
                      mb: 2
                    }}>
                      Personal Profile
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Name:</Box> {Fullname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>DOB:</Box> {formattedDob}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Address:</Box> {Address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Contact:</Box> {ContactInfo}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Educational Profile Card */}
              <Grid item xs={12} md={4}>
                <Card sx={{
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(42, 75, 140, 0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.primary,
                      mb: 2
                    }}>
                      Educational Profile
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Qualification:</Box> {qualification}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Institution:</Box> {institution}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Graduation:</Box> {graduationYear}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>GPA:</Box> {gpa}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Financial Profile Card */}
              <Grid item xs={12} md={4}>
                <Card sx={{
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(42, 75, 140, 0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.primary,
                      mb: 2
                    }}>
                      Financial Profile
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Income:</Box> ${income}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Employment:</Box> {employment}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                      <Box component="span" sx={{ color: colors.textPrimary }}>Financial Info:</Box> {financialInfo}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Decision Card */}
            <Card sx={{
              mt: 4,
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(42, 75, 140, 0.05)',
              backgroundColor: decision.status === 'Approved' ? '#F0FAF0' : '#FEF2F2'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  color: decision.status === 'Approved' ? colors.primary : colors.secondary,
                  textAlign: 'center'
                }}>
                  {decision.status === 'Approved' ? '🎉 Application Approved!' : '⚠️ Application Not Approved'}
                </Typography>
                {decision.reasons.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Reasons:
                    </Typography>
                    <ul style={{ color: colors.secondary, paddingLeft: '20px' }}>
                      {decision.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{
              display: 'flex',
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 4
            }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBackClick}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  borderColor: colors.primary,
                  color: colors.primary,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(42, 75, 140, 0.05)'
                  }
                }}
              >
                Previous Step
              </Button>
              
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmitClick}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px rgba(42, 75, 140, 0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(42, 75, 140, 0.2)'
                  }
                }}
              >
                Submit Application
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DecisionScreen;