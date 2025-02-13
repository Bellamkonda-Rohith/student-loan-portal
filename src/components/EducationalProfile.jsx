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
import { setEducationalProfile } from '../Redux/EducationalProfileSlice';
import { ArrowBack } from '@mui/icons-material';

const colors = {
  primary: '#2A4B8C',
  secondary: '#E53E3E',
  background: '#F7FAFC',
  textPrimary: '#2D3748',
  textSecondary: '#4A5568'
};

const EducationalProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const storedProfileData = useSelector((state) => state.Educationalform);
  const loanType = useSelector((state) => state.loan.loanType);

  const [formEducationalData, setFormEducationalData] = useState({
    qualification: storedProfileData.qualification || "",
    institution: storedProfileData.institution || "",
    graduationYear: storedProfileData.graduationYear || "",
    gpa: storedProfileData.gpa || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormEducationalData({
      qualification: storedProfileData.qualification || "",
      institution: storedProfileData.institution || "",
      graduationYear: storedProfileData.graduationYear || "",
      gpa: storedProfileData.gpa || "",
    });
  }, [storedProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEducationalData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let validationErrors = {};
    const institutionPattern = /^[A-Za-z\s]+$/;
    const gpaPattern = /^(?:\d+(?:\.\d{1,2})?)$/;

    if (!formEducationalData.qualification) {
      validationErrors.qualification = "Qualification is required";
    }
    if (!formEducationalData.institution || !institutionPattern.test(formEducationalData.institution)) {
      validationErrors.institution = "Institution Name should contain only alphabetic characters";
    }
    if (!formEducationalData.graduationYear) {
      validationErrors.graduationYear = "Year of Graduation is required";
    }
    if (!formEducationalData.gpa || !gpaPattern.test(formEducationalData.gpa) || formEducationalData.gpa < 0 || formEducationalData.gpa > 100) {
      validationErrors.gpa = "GPA/Percentage must be a valid number between 0 and 100";
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

  const handleBackClick = () => {
    navigate(`/PersonalProfile/${loanType}`);
  };

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 50 }, (_, i) => currentYear - i);

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
            Educational Background
          </Typography>

          <Grid container spacing={3}>
            {/* Qualification */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.qualification}>
                <InputLabel sx={{ color: colors.textSecondary }}>Highest Qualification</InputLabel>
                <Select
                  name="qualification"
                  value={formEducationalData.qualification}
                  onChange={handleChange}
                  label="Highest Qualification"
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
                  <MenuItem value="Bachelors">Bachelor's Degree</MenuItem>
                  <MenuItem value="Masters">Master's Degree</MenuItem>
                  <MenuItem value="PhD">Doctorate (PhD)</MenuItem>
                </Select>
                {errors.qualification && 
                  <FormHelperText sx={{ color: colors.secondary }}>
                    {errors.qualification}
                  </FormHelperText>}
              </FormControl>
            </Grid>

            {/* Institution Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Institution Name"
                variant="outlined"
                name="institution"
                value={formEducationalData.institution}
                onChange={handleChange}
                error={!!errors.institution}
                helperText={errors.institution}
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

            {/* Graduation Year */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.graduationYear}>
                <InputLabel sx={{ color: colors.textSecondary }}>Year of Graduation</InputLabel>
                <Select
                  name="graduationYear"
                  value={formEducationalData.graduationYear}
                  onChange={handleChange}
                  label="Year of Graduation"
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
                  {graduationYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                {errors.graduationYear && 
                  <FormHelperText sx={{ color: colors.secondary }}>
                    {errors.graduationYear}
                  </FormHelperText>}
              </FormControl>
            </Grid>

            {/* GPA/Percentage */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GPA/Percentage"
                variant="outlined"
                name="gpa"
                value={formEducationalData.gpa}
                onChange={handleChange}
                error={!!errors.gpa}
                helperText={errors.gpa}
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

export default EducationalProfile;