export interface UpdateTaskDto {
    projectId?: number,
    taskId?: number,
    status: string,
    assignee: number
}