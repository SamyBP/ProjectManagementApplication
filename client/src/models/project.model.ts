import { UserModel } from "./user.model"

export interface ProjectModel {
    id: number
    name: string
    description: string
    constributors: UserModel[]
}