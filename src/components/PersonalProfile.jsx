import { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoanType } from '../Redux/loanSlice';
import { setpersonalProfile } from '../Redux/PersonalProfileSlice';
import { motion } from 'framer-motion';

const PersonalProfile = () => {
  const navigate = useNavigate();
  const { loanType } = useParams();
  const dispatch = useDispatch();
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
    // Prepopulate form with stored data if available
    setFormPersonalData({
      Fullname: storedProfileData.Fullname || "",
      Dob: storedProfileData.Dob || null,
      Address: storedProfileData.Address || "",
      ContactInfo: storedProfileData.ContactInfo || "",
    });
  }, [loanType, dispatch, storedProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPersonalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormPersonalData((prevState) => ({
      ...prevState,
      Dob: date,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!formPersonalData.Fullname) {
      newErrors.Fullname = "Full Name is required";
    } else if (!namePattern.test(formPersonalData.Fullname)) {
      newErrors.Fullname = "Full Name should contain only alphabetic characters";
    }
    if (!formPersonalData.Dob) {
      newErrors.Dob = "Date of Birth is required";
    }
    if (!formPersonalData.Address) {
      newErrors.Address = "Address is required";
    }
    if (!formPersonalData.ContactInfo) {
      newErrors.ContactInfo = "Contact Information is required";
    }

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
      <Container
        component="main"
        maxWidth="false"
        disableGutters
        sx={{
          width: 'calc(100%)',
         
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          padding: { xs: 3, sm: 4 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: { xs: 4, sm: 6 },
              borderRadius: 4,
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              width: '100%',
              maxWidth: '600px',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              Personal Profile
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  name="Fullname"
                  label="Full Name"
                  placeholder="Enter your full name"
                  variant="outlined"
                  fullWidth
                  value={formPersonalData.Fullname}
                  onChange={handleChange}
                  error={!!errors.Fullname}
                  helperText={errors.Fullname}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <DatePicker
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                  label="Date of Birth"
                  inputFormat="MM/DD/YYYY"
                  value={formPersonalData.Dob}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Dob"
                      variant="outlined"
                      fullWidth
                      error={!!errors.Dob}
                      helperText={errors.Dob}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Address"
                  label="Address"
                  placeholder="Enter your complete address"
                  variant="outlined"
                  fullWidth
                  value={formPersonalData.Address}
                  onChange={handleChange}
                  error={!!errors.Address}
                  helperText={errors.Address}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="ContactInfo"
                  label="Contact Information"
                  placeholder="Enter your phone number or email"
                  variant="outlined"
                  fullWidth
                  value={formPersonalData.ContactInfo}
                  onChange={handleChange}
                  error={!!errors.ContactInfo}
                  helperText={errors.ContactInfo}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBackClick}
                sx={{
                  width: { xs: '100%', sm: '48%' },
                  padding: '12px',
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  marginBottom: { xs: 2, sm: 0 },
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.85)',
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
                onClick={handleNextClick}
                sx={{
                  width: { xs: '100%', sm: '48%' },
                  padding: '12px',
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
                  color: '#fff',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};

export default PersonalProfile;