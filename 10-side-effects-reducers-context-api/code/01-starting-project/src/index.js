import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './contexts/aurh-context';
import { ThemeContextProvider } from './contexts/theme-context';

import './index.css';
import App from './App';

ReactDOM.render(
    <AuthContextProvider>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </AuthContextProvider>,
    document.getElementById('root'));
