import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeContextProvider from "./context/ThemeProvider.jsx";
import AuthContextProvider from "./context/AuthProvider.jsx";
import UserInfoProvider from "./context/UserInfoProvider.jsx";
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <UserInfoProvider>
                    <ThemeContextProvider>
                        <App />
                    </ThemeContextProvider>
                </UserInfoProvider>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)