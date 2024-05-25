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
    darkMode: {
      bg: '#2D3250',
      text: '#E0E0E0',
      heading: '#FFFFFF',
      btnBg: '#1F6FEB',
      btnTxt: '#121212',
      tableBg: '#1E1E1E',
      tableText: '#E0E0E0',
      tableHeadingBg: '#2C2C2C',
      tableHeadingTxt: '#FFFFFF'
    },
    lightMode: {
      bg: '#607D8B',
      text: '#333333',
      heading: '#111111',
      btnBg: '#007BFF',
      btnTxt: '#FFFFFF',
      tableBg: '#F8F9FA',
      tableText: '#333333',
      tableHeadingBg: '#E9ECEF',
      tableHeadingTxt: '#111111'
    }
  };

  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true,
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
