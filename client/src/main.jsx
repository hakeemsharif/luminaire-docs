import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContextProvider.jsx';
import { SearchProvider } from './context/SearchContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <SearchProvider>
       <App />
      </SearchProvider>
    </AuthContextProvider>
  </StrictMode>
);