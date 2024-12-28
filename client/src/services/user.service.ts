import { UserModel } from "../models/user.model";
import { Endpoints } from "../utils/endpoints";

export class UserService {
    async getLoggedUserDetails(accessToken: string): Promise<UserModel> {
        const url: string = Endpoints.USER_API;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        return await response.json();
    }
}