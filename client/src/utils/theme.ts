import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        light: "#363333"
      },
      secondary: {
        main: "#A9A9A9",
        light: "#D3D3D3" 
      },
      error: {
        main: "#d1242f",
        light: "#d1242f" 
      },
      warning: {
        main: "#e65100",
        light: "#ed6c02" 
      },
      info: {
        main: "#0288d1", 
        light: "#03a9f4"
      },
      success: {
        main: "#2e7d32",
        light: "#4caf50"
      },
    },
  });

export default theme;