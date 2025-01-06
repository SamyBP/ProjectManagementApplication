import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterDto } from "../models/register.dto";
import { AuthenticationService } from "../services/authentication.service";
import SignUpView from "../views/SignUpPge";

const SignUpController: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterDto>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });
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

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const onSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            validatePassword(formData.password, confirmPassword);
            validateEmail(formData.email);
            const authenticationService = new AuthenticationService();
            const response = await authenticationService.register(formData);
            
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
        <SignUpView
            firstName={formData.firstName}
            lastName={formData.lastName}
            username={formData.username}
            email={formData.email}
            password={formData.password}
            confirmPassword={confirmPassword}
            errorMessage={errorMessage}
            onInputChange={onInputChange}
            onSignUp={onSignUp}
        />
    );
};

export default SignUpController;