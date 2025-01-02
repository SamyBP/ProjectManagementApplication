import { CreateProjectDto } from "../models/create.project.dto";
import { ProjectModel } from "../models/project.model";
import { TaskModel } from "../models/task.model";
import { Endpoints } from "../utils/endpoints";


export class ProjectService {

    async createNewProject(accessToken: string, dto: CreateProjectDto): Promise<any> {
        const url: string = Endpoints.PROJECTS_API + '/';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(dto)
        })

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        return await response.json();
    }

    async getProjectsForLoggedUser(accessToken: string): Promise<ProjectModel[]> {
        const url: string = Endpoints.PROJECTS_API;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.results);

        return data.results;
    }

    async getProjectById(accessToken: string, projectId: number): Promise<ProjectModel> {
        const url: string = `${Endpoints.PROJECTS_API}/${projectId}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    }

    async getAllTasksUnderProject(accessToken: string, projectId: number): Promise<TaskModel[]> {
        const url: string = `${Endpoints.PROJECTS_API}/${projectId}/tasks`

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        return data.results;
    }
}