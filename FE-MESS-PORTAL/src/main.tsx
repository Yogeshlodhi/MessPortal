import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import '@mantine/core/styles.css';
import './assets/scss/reset.scss';
import './assets/scss/common/general.scss';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
