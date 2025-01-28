import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Rich blue color
      contrastText: '#ffffff', // Ensuring text readability
    },
    secondary: {
      main: '#ff4081', // Vibrant pink color for accents
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', // Light gray background color
      paper: '#ffffff', // White background for content
    },
    text: {
      primary: '#2d2d2d', // Dark gray for primary text
      secondary: '#4d4d4d', // Medium gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Modern, clean font
    h4: {
      fontWeight: 700,
      color: '#1976d2',
    },
    body1: {
      color: '#4d4d4d',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#155a9f', // Darker shade for hover state
          },
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#155a9f', // Darker shade for hover state
          },
        },
        containedSecondary: {
          backgroundColor: '#ff4081',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c6335b', // Darker shade for hover state
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for a modern look
          padding: '20px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: 700,
          color: '#1976d2',
        },
        body1: {
          color: '#4d4d4d',
          lineHeight: 1.6,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
        },
      },
    },
  },
});

export default theme;
