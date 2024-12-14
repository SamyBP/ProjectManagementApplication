import { Button, styled } from "@mui/material";

const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(${theme.palette.primary.light} 10%, ${theme.palette.primary.main} 50%)`,
    color: theme.palette.primary.contrastText,
    border: 0,
    borderRadius: theme.shape.borderRadius,
    padding: "8px 16px",
    boxShadow: `0 3px 5px 2px ${theme.palette.primary.light}33`, // Light shadow
    textTransform: "none",
    "&:hover": {
      background: `linear-gradient(${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
    },
}));

export default GradientButton;