import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from './App/Store.js';
import theme from './Components/theme.js'
import ThemeToggle from './Components/ThemeToggle.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <ChakraProvider>
        <App />
      </ChakraProvider> */}
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {/* <ThemeToggle /> */}
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  </Provider>
)
