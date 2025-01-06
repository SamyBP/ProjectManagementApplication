import { JwtDto } from "../models/jwt.dto";
import { LoginDto } from "../models/login.dto";
import { RegisterDto } from "../models/register.dto";
import { Endpoints } from "../utils/endpoints";

export class AuthenticationService {

    register(registerDto: RegisterDto) {
        const url: string = Endpoints.REGISTER + '/';

        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerDto)
        })
    }

    logout() {
        localStorage.clear();
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

    getAccessTokenOrSignOut(): Promise<string> {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');

        if (!accessToken || !refreshToken) {
            throw new Error('Missing tokens');
        }

        return this.isTokenValid(accessToken)
            .then(isAccessTokenValid => {
                if (isAccessTokenValid) {
                    return accessToken;
                }

                return this.isTokenValid(refreshToken)
                    .then(async (isRefreshTokenValid) => {
                        if (isRefreshTokenValid) {
                            const newTokenPair = await this.getNewTokenPair(refreshToken);
                            localStorage.setItem('accessToken', newTokenPair.access); 
                            localStorage.setItem('refreshToken', newTokenPair.refresh); 
                            return newTokenPair.access; 
                        }
        
                        throw new Error('Invalid tokens. Please sign in again.');
                    });
            }) 
    }

    private async isTokenValid(token: string): Promise<boolean> {
        const url: string = Endpoints.TOKEN_VERIFY;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'token': token})
        });

        return response.ok;
    }

    private async getNewTokenPair(refreshToken: string): Promise<JwtDto> {
        const url: string = Endpoints.TOKEN_REFRESH;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'refresh': refreshToken})
        })

        if (response.status !== 201)
            throw new Error(`Could not obtain a new toke pair ${response.statusText}`)

        return await response.json();
    }
}