import { ProjectModel } from "../models/project.model";
import { Endpoints } from "../utils/endpoints";

export class ProjectService {
    async getProjectsForLoggedUser(accessToken: string): Promise<ProjectModel[]> {
        const url: string = Endpoints.PROJECTS_API;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            
        });

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();

        return data.results;
    }
}