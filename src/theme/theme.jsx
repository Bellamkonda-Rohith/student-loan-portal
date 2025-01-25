// src/Theme.js
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Modern purple color
    },
    secondary: {
      main: '#03dac6', // Complementary turquoise color
    },
    background: {
      default: '#E0F7FA', // Light background color
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    body1: {
      color: '#555',
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
        },
      },
    },
  },
});



export default theme;
