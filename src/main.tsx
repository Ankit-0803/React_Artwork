import * as React from 'react'; // Use named import for React
import { createRoot } from 'react-dom/client'; // Use named import for ReactDOM
import App from './App';
import './index.css';

// PrimeReact styles
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Rendering the App to the DOM
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
