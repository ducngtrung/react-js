import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ShoppingCart from './ShoppingCart';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShoppingCart />
  </React.StrictMode>
);