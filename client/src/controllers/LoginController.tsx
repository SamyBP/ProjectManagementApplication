import { useState } from "react";
import LoginView from "../views/LoginPage"
import { AuthenticationService } from "../services/authentication.service";
import { LoginDto } from "../models/login.dto";

const LoginController: React.FC = () => {
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

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    return (
        <LoginView 
            username={username}
            password={password}
            errorMessage={errorMessage}
            onSignIn={onSignIn}
            onUsernameChange={onUsernameChange}
            onPasswordChange={onPasswordChange}
        />
    );
}

export default LoginController;