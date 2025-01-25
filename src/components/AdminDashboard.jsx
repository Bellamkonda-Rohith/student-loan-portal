import { Typography, Container, Box, Grid, Card, CardContent, Divider, Button, List, ListItem, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestData } from '../Redux/DashboardSlice'; // Ensure this import is correct
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const totalApplication = useSelector((state) => state.DashboardDetails.TotalApplications);
  const totalQualified = useSelector((state) => state.DashboardDetails.QualifiedApplications);
  const totalRejected = useSelector((state) => state.DashboardDetails.NotQualifiedApplications);
  const reasonsForRejected = useSelector((state) => state.DashboardDetails.disqualificationReasons);

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
      applications:totalApplication,
      Qapplications: totalQualified,
      notQualifiedApplications:totalRejected ,
      disqualificationReasons:reasonsForRejected
    };

    dispatch(fetchLatestData(latestData));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
          Overview of application statistics.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Applications
                </Typography>
                <Typography variant="h5" color="secondary">
                  {totalApplication || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Qualified Applications
                </Typography>
                <Typography variant="h5" color="secondary">
                  {totalQualified || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Not Qualified Applications
                </Typography>
                <Typography variant="h5" color="secondary">
                  {totalRejected || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            Reasons for Failures
          </Typography>
          <Card>
            <CardContent>
              <List sx={{ listStyleType: 'disc', pl: 2 }}>
                {reasonsForRejected && reasonsForRejected.length > 0 ? (
                  reasonsForRejected.map((reason, index) => (
                    <ListItem key={index} sx={{ display: 'list-item' }}>
                      <ListItemText primary={`${index + 1}. ${reason}`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No reasons for disqualification available." />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" sx={{ px: 4 }} onClick={handleFetchLatestData}>
            Refresh
          </Button>
          <Button variant="outlined" color="secondary" sx={{ px: 4 }} onClick={handleExport}>
            Export Data
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;