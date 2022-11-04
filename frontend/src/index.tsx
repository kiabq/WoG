// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import App from './App';

// Styles
import './index.css';

// Hooks
import { AccountContext } from './hooks/useAccount';
import { AuthContext } from './hooks/useProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContext>
        <App />
    </AuthContext>
  </React.StrictMode>
);