import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { MantineProvider } from '@mantine/core';

import { persistor, reduxStore } from 'Redux/Store';
import { clearAuth } from 'Redux/Slices/Common/AuthSlice';
import { router } from 'Routes/routes';
import { muiTheme } from './muiTheme';
import { mantineTheme } from './mantineTheme';

const UnauthorizedListener = () => {
  useEffect(() => {
    const handleUnauthorized = () => {
      reduxStore.dispatch(clearAuth());
    };
    window.addEventListener('mp:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('mp:unauthorized', handleUnauthorized);
  }, []);

  return null;
};

const App = () => (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={muiTheme}>
        <MantineProvider theme={mantineTheme}>
          <CssBaseline />
          <UnauthorizedListener />
          <RouterProvider router={router} />
        </MantineProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
