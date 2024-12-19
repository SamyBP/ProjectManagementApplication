export const Endpoints = {
    REGISTER: RegisterAPIUrl(),
    LOGIN: LoginAPIUrl(),
    TOKEN_REFRESH: RefreshTokenAPIUrl(),
    TOKEN_VERIFY: VerifyTokenAPIUrl()
}

function APIBaseUrl(): string {
    let base = process.env.REACT_APP_BACKEND_API_BASE_URL;
    return base != undefined ? base : "http://localhost:8000/api" ;
}

function RegisterAPIUrl(): string {
    return APIBaseUrl().concat('/users/register');
}

function LoginAPIUrl(): string {
    return APIBaseUrl().concat("/auth/token");
}

function RefreshTokenAPIUrl(): string {
    return LoginAPIUrl().concat("/refresh");
}

function VerifyTokenAPIUrl(): string {
    return LoginAPIUrl().concat("/verify");
}