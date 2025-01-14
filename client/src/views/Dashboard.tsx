import React from "react";
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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface DashboardViewProps {
    newProjectName: string;
    newProjectDescription: string;
    user: UserModel | null;
    projects: ProjectModel[];
    taskStats: TaskStatsDto[];
    upcomingTasks: TaskModel[];
    isLoading: boolean;
    onNewProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onNewProjectDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onCreateProjectButtonClick: (e: React.FormEvent) => void
}

const DashboardView: React.FC<DashboardViewProps> = ({
    newProjectName,
    newProjectDescription,
    user,
    projects,
    taskStats,
    upcomingTasks,
    isLoading,
    onNewProjectNameChange,
    onNewProjectDescriptionChange,
    onCreateProjectButtonClick
}) => {
    if (isLoading) {
        return (
            <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex' }}>
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
                                    name="newProjectName"
                                    value={newProjectName}
                                    onChange={onNewProjectNameChange}
                                    label="Project name" 
                                    placeholder="name your new project..." 
                                    fullWidth 
                                    required
                                />
                                <RoundedTextField
                                    name="newProjectDescription"
                                    value={newProjectDescription}
                                    onChange={onNewProjectDescriptionChange}
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
            <ToastContainer aria-label={""}/>
        </ThemeProvider>
    )
}

export default DashboardView;