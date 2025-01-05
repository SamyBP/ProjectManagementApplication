import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { ProjectModel } from "../models/project.model";
import { UserModel } from "../models/user.model";
import { Card, CircularProgress, Stack, ThemeProvider, Typography } from "@mui/material";
import RoundedTextField from "../components/RoundedTextField";
import theme from "../utils/theme";
import GradientButton from "../components/GradientButton";
import { PieChart } from "@mui/x-charts/PieChart"
import { TaskStatsDto } from "../models/task-stats.dto";
import { TaskModel } from "../models/task.model";
import PaginatedTaskCard from "../components/PaginatedTaskCard";
import { ProjectService } from "../services/project.service";
import { UserService } from "../services/user.service";
import { TaskService } from "../services/task.service";
import { AuthenticationService } from "../services/authentication.service";
import { CreateProjectDto } from "../models/create.project.dto";


export default function Dashboard() {
    const [newProjectName, setNewProjectName] = useState<string>('');
    const [newProjectDescription, setNewProjectDescription] = useState<string>('');
    const [taskStats, setTaskStats] = useState<TaskStatsDto[]>([]);
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [upcomingTasks, setUpcomingTasks] = useState<TaskModel[]>([]);

    
    const onCreateProjectButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();
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

    if (isLoading) {
        return (
            <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
                <CircularProgress />
            </div>
        );
    }

    return (

        <ThemeProvider theme={theme}>
            <div style={{display: 'flex'}}>
                {user && 
                    (<SideMenu projects={projects} user={user} />)
                }
                <Stack spacing={5} margin={4} width={4/5}>
                    <Stack direction={"row"} spacing={2} alignItems={"stretch"} alignContent={"center"}>
                        <Card sx={{ padding: 4, width: 1/2, boxShadow: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
                                Start a new project for {user?.username}
                            </Typography>
                            
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                A project contains a collection of tasks that you can assign to any of the contributors. 
                                Start by filling in the project name and the project description
                            </Typography>

                            <Stack spacing={2} marginTop={3}>
                                <RoundedTextField 
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    label="Project name" 
                                    placeholder="name your new project..." 
                                    fullWidth 
                                    required
                                />
                                <RoundedTextField
                                    value={newProjectDescription}
                                    onChange={(e) => setNewProjectDescription(e.target.value)} 
                                    label="Project description"
                                    placeholder="add a description to your project..."
                                    fullWidth 
                                    required
                                />
                                <GradientButton variant="contained" sx={{width: 1/3}} color="success" onClick={onCreateProjectButtonClick}>
                                    <Typography variant="caption">
                                    Create a new project
                                    </Typography>
                                </GradientButton>
                            </Stack>

                        </Card>

                        <Card sx={{ padding: 4, width: 1/2, boxShadow: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
                                Priority ratio of {user?.username}'s tasks
                            </Typography>
                            
                            <PieChart
                                series={[{ data: taskStats }]}
                                width={500}
                                height={200}
                            />
                        </Card>
                    </Stack>

                    <Stack direction={"row"} spacing={2} alignItems={"stretch"} alignContent={"center"}>
                        {upcomingTasks.length !== 0 && (
                            <PaginatedTaskCard title="Upcoming Tasks" tasks={upcomingTasks} tasksPerPage={3} />
                        )}
                    </Stack>
                </Stack>
            </div>
        </ThemeProvider>
    );
}
