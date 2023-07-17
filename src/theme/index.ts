import { createTheme } from '@mui/material/styles';

const font = "Inter";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3840d8',
    },
    secondary: {
      light: '#edb363',
      main: '#edb363',
      dark: '#edb363',
      contrastText: '#fff',
    },
    shooting_star: {
      main: 'rgba(0, 0, 255, 0)',
      light: '#3840d8',
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: font,
          fontSize: 20,
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    shooting_star: Palette['primary'];
  }
  interface PaletteOptions {
    shooting_star?: PaletteOptions['primary'];
  }
}

export default theme;
