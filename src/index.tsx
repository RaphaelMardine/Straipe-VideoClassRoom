import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

