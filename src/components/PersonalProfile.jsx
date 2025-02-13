import { useState, useEffect } from 'react';
import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Grid,
  Card,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoanType } from '../Redux/loanSlice';
import { setpersonalProfile } from '../Redux/PersonalProfileSlice';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';

const colors = {
  primary: '#2A4B8C',
  secondary: '#E53E3E',
  background: '#F7FAFC',
  textPrimary: '#2D3748',  // Dark text color
  textSecondary: '#4A5568'  // Secondary text
};

const PersonalProfile = () => {
  const navigate = useNavigate();
  const { loanType } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const selectedLoanType = useSelector((state) => state.loan.loanType);
  const storedProfileData = useSelector((state) => state.Personalformdata);

  const [formPersonalData, setFormPersonalData] = useState({
    Fullname: storedProfileData.Fullname || "",
    Dob: storedProfileData.Dob || null,
    Address: storedProfileData.Address || "",
    ContactInfo: storedProfileData.ContactInfo || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(setLoanType(loanType));
    setFormPersonalData({
      Fullname: storedProfileData.Fullname || "",
      Dob: storedProfileData.Dob || null,
      Address: storedProfileData.Address || "",
      ContactInfo: storedProfileData.ContactInfo || "",
    });
  }, [loanType, dispatch, storedProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPersonalData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (date) => {
    setFormPersonalData(prev => ({ ...prev, Dob: date }));
    setErrors(prev => ({ ...prev, Dob: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!formPersonalData.Fullname.trim()) {
      newErrors.Fullname = "Full Name is required";
    } else if (!namePattern.test(formPersonalData.Fullname)) {
      newErrors.Fullname = "Only alphabetic characters allowed";
    }
    if (!formPersonalData.Dob) newErrors.Dob = "Date of Birth is required";
    if (!formPersonalData.Address.trim()) newErrors.Address = "Address is required";
    if (!formPersonalData.ContactInfo.trim()) newErrors.ContactInfo = "Contact Information is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      dispatch(setpersonalProfile(formPersonalData));
      navigate('/EducationalProfile');
    }
  };

  const handleBackClick = () => {
    if (selectedLoanType === 'graduation') {
      navigate('/GraduationLoanCriteria');
    } else if (selectedLoanType === 'foreign') {
      navigate('/ForeignStudiesCriteria');
    } else if (selectedLoanType === 'rd') {
      navigate('/RDLoanCriteria');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8, px: isMobile ? 2 : 4 }}>
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
                fontSize: isMobile ? '1.8rem' : '2.2rem'
              }}>
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={formPersonalData.Fullname}
                    onChange={handleChange}
                    name="Fullname"
                    error={!!errors.Fullname}
                    helperText={errors.Fullname}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E2E8F0' },
                        '&:hover fieldset': { borderColor: colors.primary },
                        '&.Mui-focused fieldset': { borderColor: colors.primary },
                        '& input': {
                          color: colors.textPrimary,
                          '&::placeholder': { opacity: 0.6 }
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date of Birth"
                    value={formPersonalData.Dob}
                    onChange={handleDateChange}
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={!!errors.Dob}
                          helperText={errors.Dob}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              '& fieldset': { borderColor: '#E2E8F0' },
                              '&:hover fieldset': { borderColor: colors.primary },
                              '&.Mui-focused fieldset': { borderColor: colors.primary },
                              '& input': {
                                color: colors.textPrimary,
                                '&::placeholder': { opacity: 0.6 }
                              }
                            }
                          }}
                        />
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formPersonalData.Address}
                    onChange={handleChange}
                    name="Address"
                    error={!!errors.Address}
                    helperText={errors.Address}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E2E8F0' },
                        '&:hover fieldset': { borderColor: colors.primary },
                        '&.Mui-focused fieldset': { borderColor: colors.primary },
                        '& textarea': {
                          color: colors.textPrimary,
                          '&::placeholder': { opacity: 0.6 }
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    
                    fullWidth
                    label="Contact Information"
                    variant="outlined"
                    value={formPersonalData.ContactInfo}
                    onChange={handleChange}
                    name="ContactInfo"
                    error={!!errors.ContactInfo}
                    helperText={errors.ContactInfo}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E2E8F0' },
                        '&:hover fieldset': { borderColor: colors.primary },
                        '&.Mui-focused fieldset': { borderColor: colors.primary },
                        '& input': {
                          color: colors.textPrimary,
                          '&::placeholder': { opacity: 0.6 }
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{
                display: 'flex',
                gap: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                mt: 6
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
                  onClick={handleNextClick}
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
                  Continue Application
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default PersonalProfile;