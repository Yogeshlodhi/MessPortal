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
    primaryBg: '#1F1F1F',
    secondaryBg: '#FF416E',
    cardBg: '#232323',
    primaryTxt: '#ECEDEC',
    secondaryTxt: '#3B3C3B',
    boxShadow: '4px 2px 5px 0px #9F9FA6',
    cardBoxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    bg: '#272727',
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
    boxShadow: '4px 2px 5px 0px rgba(0,0,0,0.35)',
    cardBg: '#f3f3f3',
    cardBoxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    bg: 'white',
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
  components: {
    Table: {
      variants: {
        striped: (props) => ({
          tbody: {
            // tr: {
            //   '&:nth-of-type(odd)': {
            //     bg: '#005252',
            //     color: 'white',
            //   },
            // },
          },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : colors.darkMode.primaryBg,
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      },
      boxShadow: props.colorMode === 'light' ? colors.lightMode.boxShadow : colors.darkMode.boxShadow,
    }),
  },
});

export default theme;
