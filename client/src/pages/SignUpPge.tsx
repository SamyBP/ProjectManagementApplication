import { ThemeProvider } from "@mui/material/styles"
import theme from "../utils/theme"
import PageContainer from "../components/PageContainer"
import { Card, Stack, Typography } from "@mui/material"
import RoundedTextField from "../components/RoundedTextField";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterDto } from "../models/register.dto";
import { AuthenticationService } from "../services/authentication.service";

const SignUpPge: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password: string, confirmedPassword: string) => {
        if (password !== confirmedPassword) {
            throw new Error("Passwords do not match, please try again!");
        }
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email must be a valid email address!");
        }
    }

    const onSingUp = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            validatePassword(password, confirmPassword);
            validateEmail(email);
            const dto: RegisterDto = {firstName, lastName, email, username, password}
            const authenticationService = new AuthenticationService();
            const response = await authenticationService.register(dto);
            
            if (!response.ok) {
                console.log(response);
                throw new Error(`${response.statusText}`)
            }
            navigate('/sign-in');
        } catch (error: any) {
            setErrorMessage(error.message);
            return;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <Card sx={{ padding: 4, width: 400, boxShadow: 3 }}>
                    <Stack spacing={3}>
                        <Typography variant="h5" align="left" fontWeight="bold">
                            Sign up
                        </Typography>
                        
                        <Stack direction={'row'} spacing={2}>
                            <RoundedTextField value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" type="text" fullWidth required />
                            <RoundedTextField value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" type="text" fullWidth required />
                        </Stack>

                        <RoundedTextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" type="text" fullWidth required />
                        <RoundedTextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" fullWidth required />
                        <RoundedTextField  value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" fullWidth required />
                        <RoundedTextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm your password" type="password" fullWidth required />
                        

                        <GradientButton onClick={onSingUp} variant="contained" fullWidth>
                            Sign up
                        </GradientButton>

                        <Typography variant="body2" align="center" color="error">
                            {errorMessage}
                        </Typography>

                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <Link to={'/sign-in'}>Sign in</Link>
                        </Typography>

                    </Stack>
                </Card>
            </PageContainer>
        </ThemeProvider>
  );
};

export default SignUpPge;