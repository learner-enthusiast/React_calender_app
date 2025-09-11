import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'client/store/createStore';
import App from 'client/App';
import { baseURL } from 'config/appConfig';
import 'client/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastProvider } from './components/ToastContext';
const isProduction = process.env.NODE_ENV === 'production';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter basename={isProduction ? baseURL : '/'}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  </React.StrictMode>
);
