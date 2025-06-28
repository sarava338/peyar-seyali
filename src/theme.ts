// theme.ts or theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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

export default theme;
