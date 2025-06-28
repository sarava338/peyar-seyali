// theme.ts or theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Dodger Blue
    },
    secondary: {
      main: "#ffa9d0", // Light Pink
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // White
    },
  },
});

export default theme;
