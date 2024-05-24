import { extendTheme } from "@chakra-ui/react";

const colors = {
    brand: {
      50: '#f5f7ff',
      100: '#ebefff',
      200: '#cfd8ff',
      300: '#b2c1ff',
      400: '#859bff',
      500: '#5a76ff',
      600: '#4b63cc',
      700: '#3c4e99',
      800: '#2d3975',
      900: '#1e2540',
    },
  };

  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    colors,
    styles: {
      global: (props) => ({
        body: {
          bg: props.colorMode === 'light' ? 'white' : 'gray.800',
          color: props.colorMode === 'light' ? 'gray.800' : 'white',
        },
      }),
    },
  });
  
  export default theme;
