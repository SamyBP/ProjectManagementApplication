import React from "react";
import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import RoundedTextField from "../components/RoundedTextField";
import PageContainer from "../components/PageContainer";

const LoginPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <Card sx={{ padding: 4, width: 400, boxShadow: 3 , height: 'calc(100vh - 300px)'}}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Sign in
            </Typography>
            <RoundedTextField label="Email" type="email" fullWidth required />
            <RoundedTextField label="Password" type="password" fullWidth required />

            <Button variant="contained" fullWidth sx={{ textTransform: 'none' }}>
              Sign in
            </Button>

            <div/><div/><div/>

            <Typography variant="body2" align="center">
                Forgot your password?

            <Divider>or</Divider>

            </Typography>
            <Typography variant="body2" align="center">
              Don’t have an account?{' '}
                Sign up
            </Typography>
          </Stack>
        </Card>
        </PageContainer>
    </ThemeProvider>
  );
};

export default LoginPage;