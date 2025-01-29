import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestData } from '../Redux/DashboardSlice'; // Ensure this import is correct
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { motion } from 'framer-motion';
import { resetProfile } from '../Redux/PersonalProfileSlice';
import { resetEducationalProfile } from '../Redux/EducationalProfileSlice';
import { resetFinancialProfile } from '../Redux/FinancialProfileSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const totalApplication = useSelector((state) => state.DashboardDetails.TotalApplications);
  const totalQualified = useSelector((state) => state.DashboardDetails.QualifiedApplications);
  const totalRejected = useSelector((state) => state.DashboardDetails.NotQualifiedApplications);
  const reasonsForRejected = useSelector((state) => state.DashboardDetails.disqualificationReasons);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleExport = () => {
    // Prepare data for export
    const data = [
      ['Metric', 'Value'],
      ['Total Applications', totalApplication || 0],
      ['Qualified Applications', totalQualified || 0],
      ['Not Qualified Applications', totalRejected || 0],
      [''],
      ['Reasons for Disqualification'],
      ...reasonsForRejected.map((reason, index) => [`${index + 1}. ${reason}`]),
    ];

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Application Statistics');

    // Export file
    XLSX.writeFile(workbook, 'Application_Statistics.xlsx');
  };

  const handleFetchLatestData = () => {
    const latestData = {
      applications: totalApplication,
      Qapplications: totalQualified,
      notQualifiedApplications: totalRejected,
      disqualificationReasons: reasonsForRejected,
    };

    dispatch(fetchLatestData(latestData));
  };

  const handleBackClick = () => {
    navigate('/DecisionScreen'); // Navigate to the Dashboard page
  };

  const handleHomeClick = () => {
    dispatch(resetProfile())
    dispatch(resetEducationalProfile())
    dispatch(resetFinancialProfile())
    navigate('/'); // Navigate to the Home page
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant={isMobile ? 'h4' : 'h2'}
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Overview of application statistics.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <motion.div variants={cardVariants}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Total Applications
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    {totalApplication || 0}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={cardVariants}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Qualified Applications
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    {totalQualified || 0}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={cardVariants}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Not Qualified Applications
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    {totalRejected || 0}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Reasons for Failures
          </Typography>
          <motion.div variants={cardVariants}>
            <Card
              sx={{
                background: 'linear-gradient(45deg,rgb(156, 206, 228) 0%, #818cf8 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  {reasonsForRejected && reasonsForRejected.length > 0 ? (
                    reasonsForRejected.map((reason, index) => (
                      <ListItem key={index} sx={{ display: 'list-item' }}>
                        <ListItemText primary={`${index + 1}. ${reason}`} sx={{ color: 'rgba(216, 204, 204, 0.85)' }} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No reasons for disqualification available." sx={{ color: 'rgba(255, 255, 255, 0.85)' }} />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box 
  sx={{ 
    display: 'flex', 
    flexDirection: { xs: 'column', sm: 'row' }, 
    gap: 2, 
    mt: 4, 
    justifyContent: { xs: 'center', sm: 'space-between' } 
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
    onClick={handleHomeClick}
    sx={{
      py: 2,
      px: 4,
      borderRadius: '50px',
      background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
      },
    }}
  >
    Home
  </Button>
  <Button
    variant="contained"
    onClick={handleFetchLatestData}
    sx={{
      py: 2,
      px: 4,
      borderRadius: '50px',
      background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
      },
    }}
  >
    Refresh
  </Button>
  <Button
    variant="contained"
    onClick={handleExport}
    sx={{
      py: 2,
      px: 4,
      borderRadius: '50px',
      background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
      },
    }}
  >
    Export Data
  </Button>
</Box>

      </motion.div>
    </Container>
  );
};

export default AdminDashboard;