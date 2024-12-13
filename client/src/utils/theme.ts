import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ff4081", 
      },
      error: {
        main: "#d32f2f", 
      },
      warning: {
        main: "#e65100", 
      },
      info: {
        main: "#0288d1", 
      },
      success: {
        main: "#2e7d32",
      },
    },
  });

export default theme;