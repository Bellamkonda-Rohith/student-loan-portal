import { Typography, Container, Box, Grid, Paper, Button, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RDLoanCriteria = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleBack = () => {
    navigate("/LoanTypeSelection");
  };

  const handleNext = () => {
    navigate("/PersonalProfile/rd");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 80%)`,
          opacity: 0.05,
          animation: "pulse 20s ease infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
          },
        }}
      />

      {/* Floating gradient circles */}
      <Box
        component={motion.div}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <Box
        component={motion.div}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: { xs: 3, sm: 4 },
          borderRadius: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 32px 64px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Typography
          component="h1"
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontWeight: 800,
            mb: 3,
            background: "linear-gradient(45deg, #38bdf8 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          R & D Loans
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: isMobile ? "1rem" : "1.1rem",
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Eligibility Criteria:
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {[
            { label: "Education", value: "Master’s Degree" },
            { label: "Age", value: "21-40" },
            { label: "Household Income", value: "Up to $100,000" },
          ].map((item, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                component={motion.div}
                variants={itemVariants}
                sx={{
                  padding: { xs: 2, sm: 3 },
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                  textAlign: "left",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <strong>{item.label}:</strong> {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              py: 2,
              px: 4,
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              py: 2,
              px: 4,
              borderRadius: "50px",
              background: "linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)",
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(79, 70, 229, 0.4)",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RDLoanCriteria;