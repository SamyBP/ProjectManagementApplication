import { UserModel } from "./user.model"

export interface ProjectModel {
    id: number
    name: string
    description: string
    owner?: number
    contributors: UserModel[]
}