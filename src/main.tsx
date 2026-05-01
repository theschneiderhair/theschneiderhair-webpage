import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {SiteCopyProvider} from './context/SiteCopyContext';
import {ThemeProvider} from './context/ThemeContext';
import {ComingSoonRootGate} from './features/coming-soon';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComingSoonRootGate>
      <ThemeProvider>
        <SiteCopyProvider>
          <App />
        </SiteCopyProvider>
      </ThemeProvider>
    </ComingSoonRootGate>
  </StrictMode>,
);
