import { UserModel } from "./user.model"

export interface TaskModel {
    id: number,
    assignee: UserModel
    title: string,
    description: string,
    status: string,
    priority: string,
    dueIn: number
}