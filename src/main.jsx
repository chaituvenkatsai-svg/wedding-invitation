import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './services/LanguageContext.jsx';
import './styles/global.css';

// HashRouter keeps links like  site.com/#/invitation  which work on GitHub Pages,
// even when someone opens or refreshes that exact link.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>
);
