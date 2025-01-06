import { useEffect, useState } from "react";
import { TaskStatsDto } from "../models/task-stats.dto";
import { ProjectModel } from "../models/project.model";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";
import DashboardView from "../views/Dashboard";
import { CreateProjectDto } from "../models/create.project.dto";
import { AuthenticationService } from "../services/authentication.service";
import { ProjectService } from "../services/project.service";
import { TaskService } from "../services/task.service";
import { UserService } from "../services/user.service";

const DashboardController: React.FC = () => {
    const [newProjectName, setNewProjectName] = useState<string>('');
    const [newProjectDescription, setNewProjectDescription] = useState<string>('');
    const [taskStats, setTaskStats] = useState<TaskStatsDto[]>([]);
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [upcomingTasks, setUpcomingTasks] = useState<TaskModel[]>([]); 

    const onNewProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewProjectName(e.target.value);
    };

    const onNewProjectDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewProjectDescription(e.target.value);
    };

    const onCreateProjectButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();
        const projectService = new ProjectService();
        const authService = new AuthenticationService();

        try {
            const accessToken = await authService.getAccessTokenOrSignOut();
            const dto: CreateProjectDto = { name: newProjectName, description: newProjectDescription }
            const createdProject = await projectService.createNewProject(accessToken, dto);
            console.log(createdProject);
        } catch(error) {
            console.log(error); 
        }
    }

    useEffect(() => {
    const authService: AuthenticationService = new AuthenticationService();
    const taskService: TaskService = new TaskService();
    const userService: UserService = new UserService();
    const projectService: ProjectService = new ProjectService();

    const loadData = async () => {
        try {
            const accessToken =  await authService.getAccessTokenOrSignOut();
            const userProjects = await projectService.getProjectsForLoggedUser(accessToken);
            const statistics = await taskService.getTaskStatisticsForLoggedUser(accessToken);
            const loggedUser = await userService.getLoggedUserDetails(accessToken);
            const usersUpcomingTasks = await taskService.getUpcomingDueTasks(accessToken);

            setProjects(userProjects);
            setUser(loggedUser);
            setTaskStats(statistics);
            setUpcomingTasks(usersUpcomingTasks);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            authService.logout();
            window.location.href = '/sign-in';
        }
    }

    loadData();
}, []);


    return (
        <DashboardView
            newProjectName={newProjectName}
            newProjectDescription={newProjectDescription}
            taskStats={taskStats}
            projects={projects}
            user={user}
            isLoading={isLoading}
            upcomingTasks={upcomingTasks}
            onNewProjectNameChange={onNewProjectNameChange}
            onNewProjectDescriptionChange={onNewProjectDescriptionChange}
            onCreateProjectButtonClick={onCreateProjectButtonClick}
        />
    )
}

export default DashboardController;