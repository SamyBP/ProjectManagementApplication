export interface CreateTaskDto {
    title: string
    description: string,
    priority: string,
    status: string,
    assignee?: Number,
    deadline?: string 
}