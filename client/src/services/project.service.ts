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

    async updateProject(accessToken: string, projectId: Number, dto: CreateProjectDto): Promise<any> {
        const url: string = Endpoints.PROJECTS_API.concat(`/${projectId}/`);

        const response = await fetch(url, {
            method: 'PUT',
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

    async deleteProject(accessToken: string, projectId: Number): Promise<boolean> {
        const url: string = Endpoints.PROJECTS_API.concat(`/${projectId}/`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })

        if (!response.ok)
            throw new Error(`Error: ${response.statusText}`);

        return response.status === 204;
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

    async addContributor(accessToken: string, projectId: number | undefined, username: string): Promise<any> {
        const url: string = `${Endpoints.PROJECTS_API}/${projectId}/contributors`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({contributor: username})
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
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
        const now = new Date(); 

        return data.results.map((task: any) => {
            const deadline = new Date(task.deadline)
            const dueIn = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return {
                id: task.id,
                assignee: task.assignee,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueIn: dueIn,
                projectId: task.project
            }
        })
    }
}