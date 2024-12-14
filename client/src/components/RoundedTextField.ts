import { styled, TextField } from "@mui/material";

const RoundedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    position: 'absolute',
    top: '-5px',
    fontSize: '1rem', 
    color: theme.palette.text.primary,
  },
    borderRadius: '8px', 
    '& .MuiInputBase-root': {
      paddingTop: '15px',
      height: '36px', 
    },
    '& .MuiInputBase-input': {
      padding: '8px', 
      marginBottom: '8px'
    },

  }));

  export default RoundedTextField;