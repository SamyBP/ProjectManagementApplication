import { ThemeProvider } from "@mui/material/styles"
import theme from "../utils/theme"
import PageContainer from "../components/PageContainer"
import { Card, Stack, Typography } from "@mui/material"
import RoundedTextField from "../components/RoundedTextField";
import GradientButton from "../components/GradientButton";
import { useEffect, useState } from "react";

const SignUpPge: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSingUp = (event: React.FormEvent) => {

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


                        <Typography variant="body2" align="center">
                            Already have an account?{' '}Sign in
                        </Typography>
                    </Stack>
                </Card>
            </PageContainer>
        </ThemeProvider>
  );
};

export default SignUpPge;