import { useState } from 'react';
import { Button, Typography, Container, Box, TextField, Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFinancialProfile } from '../Redux/FinancialProfileSlice';

const FinancialProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formFinancialData, setFormFinancialData] = useState({
    income: '',
    employment: '',
    financialInfo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFinancialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let validationErrors = {};

    if (!formFinancialData.income) {
      validationErrors.income = "Household Income is required";
    } else if (isNaN(formFinancialData.income) || formFinancialData.income <= 0) {
      validationErrors.income = "Household Income must be a positive number";
    }

    if (!formFinancialData.employment) {
      validationErrors.employment = "Employment Status is required";
    }

    if (!formFinancialData.financialInfo) {
      validationErrors.financialInfo = "Other Financial Information is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      dispatch(setFinancialProfile(formFinancialData));
      navigate('/DecisionScreen');
    }
  };

  const handleBackClick = () => {
    navigate('/EducationalProfile');
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
        
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 5,
          width: '100%',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          color="primary"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            marginBottom: 3,
          }}
        >
          Financial Profile
        </Typography>

        <Grid container spacing={3}>
          {/* Household Income Field */}
          <Grid item xs={12}>
            <TextField
              name="income"
              label="Household Income"
              placeholder="Enter your total household income (e.g., 50000)"
              variant="outlined"
              fullWidth
              value={formFinancialData.income}
              onChange={handleChange}
              error={!!errors.income}
              helperText={errors.income}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                },
              }}
            />
          </Grid>

          {/* Employment Status Field */}
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.employment} sx={{ backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <InputLabel id="employment-status-label" sx={{ fontWeight: 500 }}>Employment Status</InputLabel>
              <Select
                labelId="employment-status-label"
                name="employment"
                value={formFinancialData.employment}
                onChange={handleChange}
                label="Employment Status"
                sx={{
                  textAlign: 'left',
                  '& .MuiSelect-select': { textAlign: 'left' },
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
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
              </Select>
              {errors.employment && <FormHelperText>{errors.employment}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Financial Info Field */}
          <Grid item xs={12}>
            <TextField
              name="financialInfo"
              label="Other Financial Information"
              placeholder="Provide details such as savings, investments, or debts"
              variant="outlined"
              fullWidth
              value={formFinancialData.financialInfo}
              onChange={handleChange}
              error={!!errors.financialInfo}
              helperText={errors.financialInfo}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackClick}
            sx={{
              borderRadius: '20px',
              padding: '12px 24px',
              fontSize: '1rem',
              transition: '0.3s',
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
              borderRadius: '20px',
              padding: '12px 24px',
              fontSize: '1rem',
              transition: '0.3s',
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

export default FinancialProfile;
