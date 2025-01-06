import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import PageContainer from "../components/PageContainer";
import { Card, Stack, Typography } from "@mui/material";
import RoundedTextField from "../components/RoundedTextField";
import GradientButton from "../components/GradientButton";
import { Link } from "react-router-dom";

interface SignUpViewProps {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessage: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSignUp: (e: React.FormEvent) => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    errorMessage,
    onInputChange,
    onSignUp
}) => {
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <Card sx={{ padding: 4, width: 400, boxShadow: 3 }}>
                    <Stack spacing={3}>
                        <Typography variant="h5" align="left" fontWeight="bold">
                            Sign up
                        </Typography>
                        
                        <Stack direction={'row'} spacing={2}>
                            <RoundedTextField name="firstName" value={firstName} onChange={onInputChange} label="First Name" type="text" fullWidth required />
                            <RoundedTextField name="lastName" value={lastName} onChange={onInputChange} label="Last Name" type="text" fullWidth required />
                        </Stack>

                        <RoundedTextField name="username" value={username} onChange={onInputChange} label="Username" type="text" fullWidth required />
                        <RoundedTextField name="email" value={email} onChange={onInputChange} label="Email" type="email" fullWidth required />
                        <RoundedTextField name="password" value={password} onChange={onInputChange} label="Password" type="password" fullWidth required />
                        <RoundedTextField name="confirmPassword" value={confirmPassword} onChange={onInputChange} label="Confirm your password" type="password" fullWidth required />
                        
                        <GradientButton onClick={onSignUp} variant="contained" fullWidth>
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

export default SignUpView;