export const Endpoints = {
    LOGIN: LoginAPIUrl()
}

function APIBaseUrl(): string | undefined {
    return process.env.REACT_APP_BACKEND_API_BASE_URL;
}

function LoginAPIUrl(): string | undefined {
    return APIBaseUrl()?.concat("/auth/token");
}
