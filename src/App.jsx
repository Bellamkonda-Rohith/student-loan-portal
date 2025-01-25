
import './App.css'

import {  ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

import Routing from './Routes/Routing';
function App() {
 

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routing/>
       </ThemeProvider>

     </>
  )
}

export default App
