export const Endpoints = {
    REGISTER: RegisterAPIUrl(),
    LOGIN: LoginAPIUrl(),
    TOKEN_REFRESH: RefreshTokenAPIUrl(),
    TOKEN_VERIFY: VerifyTokenAPIUrl(),
    PROJECTS_API: ProjectAPIUrl(),
    USER_API: GetUserDetailsAPIUrl(),
    USER_STATS_API: GetUserStatsAPIUrl(),
    USER_TASKS_API: GetUserTasksAPIUrl()
}

function APIBaseUrl(): string {
    let base = process.env.REACT_APP_BACKEND_API_BASE_URL;
    return base !== undefined ? base : "http://localhost:8000/api" ;
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


function ProjectAPIUrl(): string {
    return APIBaseUrl().concat("/projects");
}

function GetUserDetailsAPIUrl(): string {
    return APIBaseUrl().concat("/users/me");
}

function GetUserStatsAPIUrl(): string {
    return APIBaseUrl().concat("/users/stats");
}

function GetUserTasksAPIUrl(): string {
    return APIBaseUrl().concat("/users/tasks");
}