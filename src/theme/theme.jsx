import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E', // Deep navy blue
      light: '#534bae',
      dark: '#000051',
      contrastText: '#E3F2FD',
    },
    secondary: {
      main: '#0D47A1', // Royal blue
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#00B8D4', // Cyan accent
      contrastText: '#0A1A2F',
    },
    background: {
      default: '#0A1A2F', // Dark blue background
      paper: '#1A237E', // Navy blue for components
    },
    text: {
      primary: '#E3F2FD', // Light blue text
      secondary: '#90CAF9', // Secondary light blue
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      fontWeight: 300,
    },
    button: {
      fontWeight: 600,
      fontSize: '1.1rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 32px',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(145deg, #00B8D4, #0D47A1)',
          boxShadow: '0 4px 16px rgba(0, 184, 212, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 24px rgba(0, 184, 212, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 16px 32px rgba(0, 184, 212, 0.2)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
        maxWidthLg: {
          maxWidth: '1600px',
          '@media (min-width:1200px)': {
            maxWidth: '1600px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          background: 'linear-gradient(145deg, #00B8D4 30%, #E3F2FD 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: { xs: 2, sm: 3, md: 4 },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;