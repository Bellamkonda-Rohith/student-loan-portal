import { 
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestData } from '../Redux/DashboardSlice';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resetProfile } from '../Redux/PersonalProfileSlice';
import { resetEducationalProfile } from '../Redux/EducationalProfileSlice';
import { resetFinancialProfile } from '../Redux/FinancialProfileSlice';
import { ArrowBack, Home, Refresh, Description } from '@mui/icons-material';

const colors = {
  primary: '#2A4B8C',
  secondary: '#3A86FF',
  background: '#F8FAFF',
  textPrimary: '#1A237E',
  textSecondary: '#455A64',
  success: '#00BFA5',
  error: '#FF5252',
  accent: '#FF6B6B'
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors
  const totalApplication = useSelector((state) => state.DashboardDetails.TotalApplications);
  const totalQualified = useSelector((state) => state.DashboardDetails.QualifiedApplications);
  const totalRejected = useSelector((state) => state.DashboardDetails.NotQualifiedApplications);
  const reasonsForRejected = useSelector((state) => state.DashboardDetails.disqualificationReasons);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handler functions
  const handleBackClick = () => navigate('/DecisionScreen');
  
  const handleHomeClick = () => {
    dispatch(resetProfile());
    dispatch(resetEducationalProfile());
    dispatch(resetFinancialProfile());
    navigate('/');
  };

  const handleExport = () => {
    const data = [
      ['Metric', 'Value'],
      ['Total Applications', totalApplication || 0],
      ['Qualified Applications', totalQualified || 0],
      ['Not Qualified Applications', totalRejected || 0],
      [''],
      ['Reasons for Disqualification'],
      ...(reasonsForRejected?.map((reason, index) => [`${index + 1}. ${reason}`]) || [])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Application Statistics');
    XLSX.writeFile(workbook, 'Application_Statistics.xlsx');
  };

  const handleFetchLatestData = () => {
    dispatch(fetchLatestData({
      applications: totalApplication,
      Qapplications: totalQualified,
      notQualifiedApplications: totalRejected,
      disqualificationReasons: reasonsForRejected,
    }));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      position: 'relative',
      overflow: 'hidden',
      py: 4,
      backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(58, 134, 255, 0.1), transparent 40%)'
    }}>
      <Container maxWidth="xl" sx={{ px: isMobile ? 2 : 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header Section */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackClick}
              sx={{
                color: colors.primary,
                borderRadius: '8px',
                px: 3,
                py: 1,
                border: `2px solid ${colors.primary}`,
                '&:hover': {
                  backgroundColor: 'rgba(42, 75, 140, 0.05)'
                }
              }}
            >
              Back
            </Button>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isMobile ? '2rem' : '2.8rem',
              letterSpacing: '-0.05em'
            }}>
              Application Insights
            </Typography>
            <div /> {/* Spacer */}
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { 
                title: 'Total Applications', 
                value: totalApplication || 0, 
                color: colors.primary,
                icon: <Description sx={{ color: colors.primary, fontSize: 28 }} />
              },
              { 
                title: 'Qualified', 
                value: totalQualified || 0, 
                color: colors.success,
                icon: <Description sx={{ color: colors.success, fontSize: 28 }} />
              },
              { 
                title: 'Rejected', 
                value: totalRejected || 0, 
                color: colors.error,
                icon: <Description sx={{ color: colors.error, fontSize: 28 }} />
              }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(42, 75, 140, 0.1)',
                    background: `linear-gradient(145deg, ${stat.color}10, ${stat.color}08)`,
                    border: `1px solid ${stat.color}20`,
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: stat.color
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2
                      }}>
                        {stat.icon}
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700,
                          color: colors.textPrimary,
                          letterSpacing: '-0.02em'
                        }}>
                          {stat.title}
                        </Typography>
                      </Box>
                      <Typography variant="h2" sx={{
                        fontWeight: 800,
                        color: stat.color,
                        textAlign: 'center',
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        textShadow: `0 2px 8px ${stat.color}20`
                      }}>
                        {stat.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Disqualification Analysis Section */}
          <Box sx={{ 
            mb: 4,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(42, 75, 140, 0.1)',
            border: `1px solid ${colors.primary}20`,
            background: 'linear-gradient(145deg, #FFFFFF, #F8FAFF)'
          }}>
            <Box sx={{
              p: 3,
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
            }}>
              <Typography variant="h5" sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em'
              }}>
                Disqualification Analysis
              </Typography>
            </Box>
            
            <CardContent sx={{ p: 3 }}>
              {reasonsForRejected?.length > 0 ? (
                <List disablePadding>
                  {reasonsForRejected.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem sx={{
                        p: 2,
                        mb: 1,
                        borderRadius: '8px',
                        background: index % 2 === 0 ? '#fff' : '#f8f9ff',
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 12px rgba(42, 75, 140, 0.1)'
                        },
                        transition: 'all 0.3s ease'
                      }}>
                        <Box sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: colors.error,
                          mr: 2
                        }} />
                        <ListItemText 
                          primary={reason} 
                          primaryTypographyProps={{ 
                            variant: 'body1',
                            sx: {
                              fontWeight: 500,
                              color: colors.textPrimary,
                              letterSpacing: '-0.01em'
                            }
                          }} 
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  background: '#f8f9ff',
                  borderRadius: '8px'
                }}>
                  <Typography variant="body1" sx={{ 
                    color: colors.textSecondary,
                    fontStyle: 'italic'
                  }}>
                    No disqualification patterns detected
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Box>

          {/* Action Panel */}
          <Box sx={{
            mt: 6,
            p: 3,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #FFFFFF, #F8FAFF)',
            boxShadow: '0 8px 32px rgba(42, 75, 140, 0.1)',
            border: `1px solid ${colors.primary}20`
          }}>
            <Grid container spacing={3} justifyContent="center">
              {[
                { 
                  label: 'Home', 
                  icon: <Home sx={{ fontSize: 24 }} />,
                  action: handleHomeClick,
                  color: colors.primary
                },
                { 
                  label: 'Refresh Data', 
                  icon: <Refresh sx={{ fontSize: 24 }} />,
                  action: handleFetchLatestData,
                  color: colors.secondary
                },
                { 
                  label: 'Export Report', 
                  icon: <Description sx={{ fontSize: 24 }} />,
                  action: handleExport,
                  color: colors.accent
                }
              ].map((btn, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={btn.icon}
                      onClick={btn.action}
                      sx={{
                        py: 2,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${btn.color}, ${btn.color}CC)`,
                        color: 'white',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        textTransform: 'none',
                        boxShadow: `0 4px 16px ${btn.color}30`,
                        '&:hover': {
                          boxShadow: `0 6px 20px ${btn.color}50`
                        }
                      }}
                    >
                      {btn.label}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminDashboard;