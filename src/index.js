import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme } from '@mui/material';
import {ThemeProvider} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
typography:{
  fontFamily:"'Poppins', sans-serif"
}
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
