import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProvideAuth } from './hooks/useProvider';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>
);