import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { SnackbarProvider } from 'notistack';
import { ContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ContextProvider>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={1} preventDuplicate>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </ContextProvider>
);
