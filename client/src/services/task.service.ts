import { TaskStatsDto } from "../models/task-stats.dto";
import { Endpoints } from "../utils/endpoints";

export class TaskService {
    async getTaskStatisticsForLoggedUser(accessToken: string): Promise<TaskStatsDto[]> {
        const url: string = Endpoints.USER_STATS_API
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

        return [
            { id: 0, value: data.low, label: "low", color: "#2e7d32"},
            { id: 1, value: data.medium, label: "medium", color: "#03a9f4" },
            { id: 2, value: data.high, label: "high", color: "#e65100"}
        ]
    }

    async getUpcomingDueTasks(accessToken: string, dueIn: number = 7): Promise<any> {
        const url: string = Endpoints.USER_TASKS_API.concat(`?due_in=${dueIn}`)

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json();
        const now = new Date(); 

        return data.results.map((task: any) => {
            const deadline = new Date(task.deadline)
            const dueIn = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return {id: task.id, title: task.title, dueIn: dueIn}
        })
    }
}