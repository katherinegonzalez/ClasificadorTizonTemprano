import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightGreen, lime } from '@mui/material/colors';

const root = ReactDOM.createRoot(document.getElementById('root'));

const primary = {
  main: '#4CAF50',
  light: '#C8E6C9',
  dark: '#388E3C',
  contrastText: '#fff'
};

const text = {
  primary: '#212121',
  secondary: '#757575',
  disabled: '#BDBDBD'
}

const secondary = {
  main: '#8BC34A',
  contrastText: '#fff'
};

const divider = '#BDBDBD';
const accent = '#8BC34A';

const theme = createTheme({
  palette: {
    primary,
    secondary,
    text,
    divider,
    accent
  },
});

/*'#DCEDC8'*/
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
