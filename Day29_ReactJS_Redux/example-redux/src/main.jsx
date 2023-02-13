import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import store from './app/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* Provider dùng để kết nối redux với ứng dụng react */}
    <Provider store={store}>
      
      {/* BrowserRouter dùng để điều hướng giữa các components */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </Provider>

  </React.StrictMode>
)