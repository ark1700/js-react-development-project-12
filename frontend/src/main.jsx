import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import store from './app/store';
import './assets/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
);
