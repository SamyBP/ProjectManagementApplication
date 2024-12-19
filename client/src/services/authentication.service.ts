import { JwtDto } from "../models/jwt.dto";
import { LoginDto } from "../models/login.dto";
import { RegisterDto } from "../models/register.dto";
import { Endpoints } from "../utils/endpoints";

export class AuthenticationService {

    register(registerDto: RegisterDto) {
        const url: string = Endpoints.REGISTER;

        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerDto)
        })
    }

    async login(loginDto: LoginDto): Promise<JwtDto> {
        const url: string = Endpoints.LOGIN;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginDto)
        });

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        return await response.json();
    }

    async isTokenValid(token: string): Promise<boolean> {
        const url: string = Endpoints.TOKEN_VERIFY;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'token': token})
        });

        return response.ok;
    }

    async getNewTokenPair(refreshToken: string): Promise<JwtDto> {
        const url: string = Endpoints.TOKEN_REFRESH;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'refresh': refreshToken})
        })

        if (response.status != 201)
            throw new Error(`Could not obtain a new toke pair ${response.statusText}`)

        return await response.json();
    }
}