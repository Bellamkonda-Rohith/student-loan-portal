import { useState, useEffect } from 'react';
import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Grid,
  Card,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFinancialProfile } from '../Redux/FinancialProfileSlice';
import { ArrowBack } from '@mui/icons-material';

const colors = {
  primary: '#2A4B8C',
  secondary: '#E53E3E',
  background: '#F7FAFC',
  textPrimary: '#2D3748',
  textSecondary: '#4A5568'
};

const FinancialProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const storedProfileData = useSelector((state) => state.FinancialProfileform);

  const [formFinancialData, setFormFinancialData] = useState({
    income: storedProfileData.income || '',
    employment: storedProfileData.employment || '',
    financialInfo: storedProfileData.financialInfo || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormFinancialData({
      income: storedProfileData.income || '',
      employment: storedProfileData.employment || '',
      financialInfo: storedProfileData.financialInfo || '',
    });
  }, [storedProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFinancialData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
            Financial Profile
          </Typography>

          <Grid container spacing={3}>
            {/* Household Income */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Household Income"
                variant="outlined"
                name="income"
                value={formFinancialData.income}
                onChange={handleChange}
                error={!!errors.income}
                helperText={errors.income}
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#E2E8F0' },
                    '&:hover fieldset': { borderColor: colors.primary },
                    '&.Mui-focused fieldset': { borderColor: colors.primary },
                  },
                  '& .MuiInputBase-input': {
                    color: colors.textPrimary,
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.textSecondary,
                  }
                }}
              />
            </Grid>

            {/* Employment Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.employment}>
                <InputLabel sx={{ color: colors.textSecondary }}>Employment Status</InputLabel>
                <Select
                  name="employment"
                  value={formFinancialData.employment}
                  onChange={handleChange}
                  label="Employment Status"
                  sx={{
                    textAlign: 'left',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': { borderColor: '#E2E8F0' },
                      '&:hover fieldset': { borderColor: colors.primary },
                      '&.Mui-focused fieldset': { borderColor: colors.primary },
                    },
                    '& .MuiSelect-select': {
                      color: colors.textPrimary,
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: colors.background,
                        '& .MuiMenuItem-root': {
                          color: colors.textPrimary,
                          '&:hover': {
                            backgroundColor: 'rgba(42, 75, 140, 0.1)'
                          }
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                </Select>
                {errors.employment && 
                  <FormHelperText sx={{ color: colors.secondary }}>
                    {errors.employment}
                  </FormHelperText>}
              </FormControl>
            </Grid>

            {/* Financial Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Other Financial Information"
                variant="outlined"
                name="financialInfo"
                value={formFinancialData.financialInfo}
                onChange={handleChange}
                error={!!errors.financialInfo}
                helperText={errors.financialInfo}
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#E2E8F0' },
                    '&:hover fieldset': { borderColor: colors.primary },
                    '&.Mui-focused fieldset': { borderColor: colors.primary },
                  },
                  '& .MuiInputBase-input': {
                    color: colors.textPrimary,
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.textSecondary,
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
      </Container>
    </Box>
  );
};

export default FinancialProfile;