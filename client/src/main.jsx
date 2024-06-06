import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

if (typeof global === 'undefined') {
  global = window;
}
global.Buffer = Buffer;



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <ThemeProvider>
            <App />
           <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick 
                   rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

