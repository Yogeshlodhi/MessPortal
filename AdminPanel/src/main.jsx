import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {store} from './App/Store.js'
import { Provider } from 'react-redux'
import theme from './Components/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
    </React.StrictMode>
  </Provider>
)

