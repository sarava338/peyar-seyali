// theme.ts or theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#4e8bc4",
    },
    secondary: {
      main: "#ff99be",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
