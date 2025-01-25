import { useState } from 'react';
import { Button, Typography, Container, Box, TextField, Grid, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom color="primary">
          Financial Profile
        </Typography>
        <Grid container spacing={3}>
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
                borderRadius: '4px',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.employment} sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <InputLabel id="employment-status-label">Employment Status</InputLabel>
              <Select
                labelId="employment-status-label"
                name="employment"
                value={formFinancialData.employment}
                onChange={handleChange}
                label="Employment Status"
                sx={{ textAlign: 'left', '& .MuiSelect-select': { textAlign: 'left' } }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        textAlign: 'left',
                      }
                    }
                  }
                }}
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
              </Select>
              {errors.employment && <FormHelperText>{errors.employment}</FormHelperText>}
            </FormControl>
          </Grid>
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
                borderRadius: '4px',
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackClick}
            sx={{
              borderRadius: '20px',
              padding: '8px 24px',
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
              padding: '8px 24px',
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
