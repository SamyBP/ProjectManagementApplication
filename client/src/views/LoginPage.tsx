import React from "react";
import { Card, Divider, Stack, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import PageContainer from "../components/PageContainer";
import GradientButton from "../components/GradientButton";
import { Link } from "react-router-dom";

interface LoginViewProps {
    username: string;
    password: string;
    errorMessage: string;
    onSignIn: (e: React.FormEvent) => void;
    onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginView: React.FC<LoginViewProps> = ({username, password, errorMessage, onSignIn, onUsernameChange, onPasswordChange}) => {
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <Card sx={{ padding: 4, width: 400, boxShadow: 3 , height: 'calc(100vh - 350px)'}}>
                    <Stack spacing={3}>
                        <Typography variant="h5" align="left" fontWeight="bold">
                            Sign in
                        </Typography>
                        
                        <TextField size="small" value={username} onChange={onUsernameChange} label="Username" type="text" fullWidth required />
                        <TextField size="small" value={password} onChange={onPasswordChange} label="Password" type="password" fullWidth required />

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
}

export default LoginView;