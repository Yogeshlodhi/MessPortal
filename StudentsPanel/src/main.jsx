import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from './App/Store.js';
import theme from './Components/theme.js'

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e57e7814a9310faac23f9e7247996572@o4508903909294080.ingest.us.sentry.io/4509654313664512",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
)
