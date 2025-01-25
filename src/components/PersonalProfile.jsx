import { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoanType } from '../Redux/loanSlice';
import { setpersonalProfile } from '../Redux/PersonalProfileSlice';

const PersonalProfile = () => {
  const navigate = useNavigate();
  const { loanType } = useParams();
  const dispatch = useDispatch();
  const selectedLoanType = useSelector((state) => state.loan.loanType);

  const [formPersonalData, setFormPersonalData] = useState({
    Fullname: "",
    Dob: null,
    Address: "",
    ContactInfo: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(setLoanType(loanType));
  }, [loanType, dispatch]);

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

    if (!formPersonalData.Fullname) {
      newErrors.Fullname = "Full Name is required";
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
            borderRadius: 3,
            boxShadow: 5,
            textAlign: 'center',
            width: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: 20,
            },
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom color="primary">
            Personal Profile
          </Typography>
          
          <Grid container spacing={3}>
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
                  '& .MuiFormLabel-root': {
                    fontSize: '1rem',
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
                  '& .MuiFormLabel-root': {
                    fontSize: '1rem',
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
                  '& .MuiFormLabel-root': {
                    fontSize: '1rem',
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackClick}
              sx={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
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
              onClick={handleNextClick}
              sx={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
                borderRadius: '30px',
                '&:hover': { backgroundColor: '#FF4081' },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default PersonalProfile;
