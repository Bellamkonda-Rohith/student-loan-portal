import { useState } from 'react';
import { Button, Typography, Container, Box, TextField, Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEducationalProfile } from '../Redux/EducationalProfileSlice';

const EducationalProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formEducationalData, setFormEducationalData] = useState({
    qualification: "",
    institution: "",
    graduationYear: "",
    gpa: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEducationalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let validationErrors = {};

    if (!formEducationalData.qualification) {
      validationErrors.qualification = "Qualification is required";
    }
    if (!formEducationalData.institution) {
      validationErrors.institution = "Institution Name is required";
    }
    if (!formEducationalData.graduationYear) {
      validationErrors.graduationYear = "Year of Graduation is required";
    } else if (isNaN(formEducationalData.graduationYear) || formEducationalData.graduationYear.length !== 4) {
      validationErrors.graduationYear = "Year of Graduation must be a 4-digit number";
    }
    if (!formEducationalData.gpa) {
      validationErrors.gpa = "GPA/Percentage is required";
    } else if (isNaN(formEducationalData.gpa) || formEducationalData.gpa < 0 || formEducationalData.gpa > 100) {
      validationErrors.gpa = "GPA/Percentage must be a number between 0 and 100";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      dispatch(setEducationalProfile(formEducationalData));
      navigate('/FinancialProfile');
    }
  };

  const loanType = useSelector((state) => state.loan.loanType);
  const handleBackClick = () => {
    navigate(`/PersonalProfile/${loanType}`);
  };

  return (
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
      // Subtle background color
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          textAlign: 'center',
          width: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 20,
          },
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom color="primary">
          Educational Profile
        </Typography>
        
        <Grid container spacing={3}>
          {/* Qualification */}
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.qualification}>
              <InputLabel>Highest Qualification</InputLabel>
              <Select
                name="qualification"
                value={formEducationalData.qualification}
                onChange={handleChange}
                label="Highest Qualification"
                sx={{
                  textAlign: 'left',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        textAlign: 'left',
                      },
                    },
                  },
                }}
              >
                <MenuItem value="Bachelors">Bachelors</MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </Select>
              {errors.qualification && <FormHelperText>{errors.qualification}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Institution Name */}
          <Grid item xs={12}>
            <TextField
              name="institution"
              label="Institution Name"
              placeholder="Enter the name of your institution"
              variant="outlined"
              fullWidth
              value={formEducationalData.institution}
              onChange={handleChange}
              error={!!errors.institution}
              helperText={errors.institution}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>

          {/* Graduation Year */}
          <Grid item xs={12}>
            <TextField
              name="graduationYear"
              label="Year of Graduation"
              type="number"
              placeholder="Enter the 4-digit graduation year"
              variant="outlined"
              fullWidth
              value={formEducationalData.graduationYear}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.graduationYear}
              helperText={errors.graduationYear}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>

          {/* GPA/Percentage */}
          <Grid item xs={12}>
            <TextField
              name="gpa"
              label="GPA/Percentage"
              placeholder="Enter your GPA or percentage (0-100)"
              variant="outlined"
              fullWidth
              value={formEducationalData.gpa}
              onChange={handleChange}
              error={!!errors.gpa}
              helperText={errors.gpa}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
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
  );
};

export default EducationalProfile;
