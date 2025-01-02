import { Button, styled } from "@mui/material";

interface GradientButtonProps {
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color", // Ensure 'color' is not forwarded as a DOM attribute
})<GradientButtonProps>(({ theme, color = "primary" }) => {
  const selectedColor = theme.palette[color];

  return {
    background: `linear-gradient(${selectedColor.light} 10%, ${selectedColor.main} 50%)`,
    color: selectedColor.contrastText,
    border: 0,
    borderColor: `${selectedColor.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: "8px 16px",
    boxShadow: `0 3px 5px 2px ${selectedColor.light}33`, 
    textTransform: "none",
    "&:hover": {
      background: `linear-gradient(${selectedColor.light} 30%, ${selectedColor.main} 90%)`,
    },
  };
});

export default GradientButton;
