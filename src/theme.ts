// theme.ts or theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff", 
    },
    secondary: {
      main: "#ffa9d0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export default theme;
