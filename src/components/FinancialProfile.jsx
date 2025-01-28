import { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFinancialProfile } from '../Redux/FinancialProfileSlice';
import { motion } from 'framer-motion';

const FinancialProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedProfileData = useSelector((state) => state.FinancialProfileform);

  const [formFinancialData, setFormFinancialData] = useState({
    income: storedProfileData.income || '',
    employment: storedProfileData.employment || '',
    financialInfo: storedProfileData.financialInfo || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Prepopulate form with stored data if available
    setFormFinancialData({
      income: storedProfileData.income || '',
      employment: storedProfileData.employment || '',
      financialInfo: storedProfileData.financialInfo || '',
    });
  }, [storedProfileData]);

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
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, rgba(79, 70, 229, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)`,
          opacity: 0.05,
          animation: 'pulse 20s ease infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' }
          }
        }}
      />

      {/* Floating gradient circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />

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
            padding: { xs: 3, sm: 4 },
            borderRadius: 4,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '600px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Typography
            component="h1"
            variant={window.innerWidth < 600 ? 'h4' : 'h3'}
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(45deg, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
          >
            Financial Profile
          </Typography>

          <Grid container spacing={4}>
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
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
            </Grid>

            {/* Employment Status Field */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.employment}>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Employment Status</InputLabel>
                <Select
                  name="employment"
                  value={formFinancialData.employment}
                  onChange={handleChange}
                  label="Employment Status"
                  sx={{
                    textAlign: 'left',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    '& .MuiSelect-icon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1e293b',
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    },
                  }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                </Select>
                {errors.employment && <FormHelperText sx={{ color: '#ff4081' }}>{errors.employment}</FormHelperText>}
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
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: 4,
            }}
          >
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
              onClick={handleNextClick}
              sx={{
                py: 2,
                px: 4,
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.3s ease',
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
  );
};

export default FinancialProfile;