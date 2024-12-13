import { LoginDto } from "../models/login.dto";
import { Endpoints } from "../utils/endpoints";

export class AuthenticationService {

    async login(loginDto: LoginDto): Promise<any> {
        const url: string | undefined = Endpoints.LOGIN;

        if (url === undefined)
            throw new Error("The endpoint provided must not be null")

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginDto)
        });

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        return await response.json();
    }
}