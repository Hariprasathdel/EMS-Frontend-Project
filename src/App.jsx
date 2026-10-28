import React from 'react';
import AppRoutes from './routes/AppRoutes';

// Import Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import Global CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* The AppRoutes component handles all routing, layouts, and protection */}
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
