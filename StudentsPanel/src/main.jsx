import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import Store from './Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  </Provider>
)
