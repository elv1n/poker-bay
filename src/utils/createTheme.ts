import { createMuiTheme, darken, lighten } from '@material-ui/core';

const altMain = '#BEC0DC';
const main = '#908ae4';
const textPrimary = '#57618a';

export const theme = createMuiTheme({
  palette: {
    text: {
      primary: textPrimary,
    },
    background: {
      default: '#f2f2fa',
      paper: altMain,
    },
    primary: {
      main,
      light: lighten(main, 0.5),
      dark: darken(main, 0.2),
    },
  },
  typography: {
    fontFamily: "'Baloo Paaji 2', cursive",
    h4: {
      lineHeight: 1,
    },
    h5: {
      color: textPrimary,
      fontWeight: 700,
      fontSize: '0.9375rem',
    },
  },
});
