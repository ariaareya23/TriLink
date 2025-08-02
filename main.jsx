import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App'; // Use this if App.jsx has: `export function $
// import App from './App'; // Use this if App.jsx has: `export default Ap$
  
import './index.css'; // or your CSS file
  
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


