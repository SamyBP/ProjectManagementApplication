import React, { useState } from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import RoundedTextField from "../components/RoundedTextField";
import PageContainer from "../components/PageContainer";
import { LoginDto } from "../models/login.dto";
import { AuthenticationService } from "../services/authentication.service";
import GradientButton from "../components/GradientButton";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        const dto: LoginDto = {username, password};
        const authenticationService = new AuthenticationService();
        try {
            const jwt = await authenticationService.login(dto);
            localStorage.clear();
            localStorage.setItem('access', jwt.access);
            localStorage.setItem('refresh', jwt.refresh);
            window.location.href = '/dashboard'
        } catch (error: any) {
            setErrorMessage(error.message);
            console.log(error);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <Card sx={{ padding: 4, width: 400, boxShadow: 3 , height: 'calc(100vh - 350px)'}}>
                    <Stack spacing={3}>
                        <Typography variant="h5" align="left" fontWeight="bold">
                            Sign in
                        </Typography>
                        
                        <RoundedTextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" type="text" fullWidth required />
                        <RoundedTextField  value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" fullWidth required />

                        <GradientButton onClick={onSignIn} variant="contained" fullWidth>
                            Sign in
                        </GradientButton>

                        <Typography variant="body2" align="center" color="error">
                            {errorMessage}
                        </Typography>

                        <div/>

                        <Typography variant="body2" align="center">
                            Forgot your password?
                        </Typography>

                        <Divider>or</Divider>

                        <Typography variant="body2" align="center">
                            Don’t have an account?{' '}
                            <Link to={'/sign-up'}>Sign up</Link>
                        </Typography>
                    </Stack>
                </Card>
            </PageContainer>
        </ThemeProvider>
  );
};

export default LoginPage;