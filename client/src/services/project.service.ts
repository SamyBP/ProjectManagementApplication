import { ProjectModel } from "../models/project.model";
import { TaskModel } from "../models/task.model";
import { Endpoints } from "../utils/endpoints";

const mockProjects: ProjectModel[] = [
    {
        id: 1,
        name: "benipintea/task-manager-api",
        description: "A RESTful API for managing tasks and projects with user authentication and permissions.",
        constributors: [
            { id: 1, username: "benipintea", email: "beni.pintea@example.com", firstName: "Beni", lastName: "Pintea" },
            { id: 2, username: "janedoe", email: "jane.doe@example.com", firstName: "Jane", lastName: "Doe" },
        ],
    },
    {
        id: 2,
        name: "benipintea/chat-app-ui",
        description: "A responsive frontend for a real-time chat application built with React and Material-UI.",
        constributors: [
            { id: 1, username: "benipintea", email: "beni.pintea@example.com", firstName: "Beni", lastName: "Pintea" },
            { id: 3, username: "johnsmith", email: "john.smith@example.com", firstName: "John", lastName: "Smith" },
        ],
    },
    {
        id: 3,
        name: "benipintea/project-dashboard",
        description: "A collaborative project management dashboard with kanban boards, notifications, and analytics.",
        constributors: [
            { id: 1, username: "benipintea", email: "beni.pintea@example.com", firstName: "Beni", lastName: "Pintea" },
            { id: 4, username: "emilybrown", email: "emily.brown@example.com", firstName: "Emily", lastName: "Brown" },
        ],
    },
    {
        id: 4,
        name: "benipintea/real-time-analytics",
        description: "A real-time analytics platform for tracking user interactions and generating insights.",
        constributors: [
            { id: 1, username: "benipintea", email: "beni.pintea@example.com", firstName: "Beni", lastName: "Pintea" },
            { id: 5, username: "sarahjones", email: "sarah.jones@example.com", firstName: "Sarah", lastName: "Jones" },
        ],
    },
    {
        id: 5,
        name: "johnsmith/ecommerce-platform",
        description: "A full-stack e-commerce platform with product catalogs, shopping carts, and payment integration.",
        constributors: [
            { id: 3, username: "johnsmith", email: "john.smith@example.com", firstName: "John", lastName: "Smith" },
            { id: 6, username: "michaellee", email: "michael.lee@example.com", firstName: "Michael", lastName: "Lee" },
        ],
    },
    {
        id: 6,
        name: "benipintea/multi-tenant-crm",
        description: "A multi-tenant CRM system for managing customer relationships and tracking sales pipelines.",
        constributors: [
            { id: 1, username: "benipintea", email: "beni.pintea@example.com", firstName: "Beni", lastName: "Pintea" },
            { id: 7, username: "annawilson", email: "anna.wilson@example.com", firstName: "Anna", lastName: "Wilson" },
        ],
    },
    {
        id: 7,
        name: "janedoe/portfolio-website",
        description: "A personal portfolio website to showcase projects, skills, and contact information.",
        constributors: [
            { id: 2, username: "janedoe", email: "jane.doe@example.com", firstName: "Jane", lastName: "Doe" },
        ],
    },
];


const mockTasksForProject: { [projectId: number]: TaskModel[] } = {
    1: [
        { id: 101, title: "Setup API environment", dueIn: 3 },
        { id: 102, title: "Implement user authentication", dueIn: 7 },
        { id: 103, title: "Write unit tests", dueIn: 10 },
    ],
    2: [
        { id: 201, title: "Design chat UI", dueIn: 5 },
        { id: 202, title: "Integrate WebSocket support", dueIn: 8 },
        { id: 203, title: "Add emoji reactions", dueIn: 12 },
    ],
    3: [
        { id: 301, title: "Create project card components", dueIn: 4 },
        { id: 302, title: "Setup project API integration", dueIn: 9 },
    ],
    4: [
        { id: 401, title: "Build data visualization graphs", dueIn: 6 },
        { id: 402, title: "Optimize database queries", dueIn: 15 },
        { id: 501, title: "Develop product listing page", dueIn: 7 },
        { id: 502, title: "Add payment gateway integration", dueIn: 14 },
        { id: 503, title: "Setup order history feature", dueIn: 20 },
        { id: 301, title: "Create project card components", dueIn: 4 },
        { id: 302, title: "Setup project API integration", dueIn: 9 },
    ],
    5: [
        { id: 501, title: "Develop product listing page", dueIn: 7 },
        { id: 502, title: "Add payment gateway integration", dueIn: 14 },
        { id: 503, title: "Setup order history feature", dueIn: 20 },
    ],
    6: [
        { id: 601, title: "Create tenant management UI", dueIn: 5 },
        { id: 602, title: "Implement role-based permissions", dueIn: 8 },
    ],
    7: [
        { id: 701, title: "Add portfolio gallery", dueIn: 3 },
        { id: 702, title: "Setup contact form", dueIn: 6 },
        { id: 703, title: "Optimize for mobile devices", dueIn: 10 },
    ],
};

export class ProjectService {
    async getProjectsForLoggedUser(accessToken: string): Promise<ProjectModel[]> {
        return mockProjects;
    }

    async getProjectById(accessToken: string, projectId: number): Promise<ProjectModel> {
        const project =  mockProjects.find(project => project.id == projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        return project;
    }

    async getAllTasksUnderProject(accessToken: string, projectId: number): Promise<TaskModel[]> {
        return mockTasksForProject[projectId];
    }
}