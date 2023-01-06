import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
  // StrictMode chỉ sử dụng trong quá trình phát triển ứng dụng, không sử dụng trên production
);