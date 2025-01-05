import { useLocation, useParams } from "react-router-dom";
import { ProjectModel } from "../models/project.model";
import React, { useEffect, useState } from "react";
import { Card, Divider, FormControl, InputLabel, NativeSelect, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import theme from "../utils/theme";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CreateTaskDto } from "../models/create.task.dto";
import { CreateProjectDto } from "../models/create.project.dto";
import { ProjectService } from "../services/project.service";
import { AuthenticationService } from "../services/authentication.service";
import { TaskService } from "../services/task.service";

export default function ProjectSettingsPage() {
    const location = useLocation();
    const {projectId} = useParams();
    const [project, setProject] = useState<ProjectModel| null>(null);

    // CreateTaskForm
    const [taskTitle, setTaskTitile] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [assigneeId, setAssigneeId] = useState<any>(null);
    const [taskDeadline, setTaskDeadline] = useState<any>(null);

    // Edit Project Form

    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');


    const onCreateTaskButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!assigneeId) {
            console.log("assignee is null");
            return
        }

        const dto: CreateTaskDto = {
            title: taskTitle,
            description: taskDescription,
            priority: taskPriority,
            status: "ASSIGNED",
            assignee: assigneeId,
            deadline: taskDeadline ? taskDeadline.format("YYYY-MM-DD") : ""
        }

        const taskService: TaskService = new TaskService();
        const authService: AuthenticationService = new AuthenticationService();
        try {
            const accessToken = await authService.getAccessTokenOrSignOut();
            const createdTask = await taskService.createNewTask(accessToken, Number(projectId), dto);
            console.log(`Created task: ${createdTask}`);
        } catch (error: any)  {
            console.log(error.message);
        }

    }

    const onEditProjectButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const dto: CreateProjectDto =  {name: newProjectName, description: newProjectDescription}
        const projectService: ProjectService = new ProjectService();
        const authService: AuthenticationService = new AuthenticationService();
        try {
            const accessToken = await authService.getAccessTokenOrSignOut();
            const updatedProject = await projectService.updateProject(accessToken, Number(projectId), dto);
    
            console.log(`Updated project ${updatedProject}`);
        } catch (error: any) {
            console.log(error.message);
        }

    }

    const onDeleteProjectButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();
        const projectService: ProjectService = new ProjectService();
        const authService: AuthenticationService = new AuthenticationService();
        try {
            const accessToken = await authService.getAccessTokenOrSignOut();
            const isDeleted = await projectService.deleteProject(accessToken, Number(projectId));
    
            console.log(`Deleted project: ${isDeleted}`);
        } catch(error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (location.state.project.owner !== location.state.user.id) {
            window.location.href = '/sign-in';
            return;
        }

        setProject(location.state.project);
    }, [location])

    return (
        <ThemeProvider theme={theme}>    
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >

                <Card variant="outlined" sx={{ width: 1/2, marginTop: 5}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    >
                        <div
                            style={{
                                margin: 10,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '24px' }}> 
                                Create a new task
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Enter the new tasks details and assign it to one of the contributors
                            </Typography> 
                        </div>
                        <GradientButton
                            size="small"
                            variant='contained'
                            color="success"
                            sx={{margin: 1, height: 30}}
                            onClick={onCreateTaskButtonClick}
                        >
                            Create task
                        </GradientButton>
                    </div>

                    <Stack spacing={2} padding={2}>
                        <TextField
                            size="small" 
                            label='Task title'
                            placeholder="enter the task's title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitile(e.target.value)}
                        />

                        <TextField
                            size="small"
                            label='Task description'
                            placeholder="enter the task's description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />

                        
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel variant="standard">Priority</InputLabel>
                                    <NativeSelect
                                        value={taskPriority}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                    >
                                        <option value="" disabled></option>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                    </NativeSelect>
                                
                            </FormControl>

                            <FormControl fullWidth size="small">
                                <InputLabel variant="standard">Assignee</InputLabel>
                                    <NativeSelect
                                        value={assigneeId ?? ""}
                                        onChange={(e) => setAssigneeId(Number(e.target.value))}
                                    >   
                                        <option value="" disabled></option>
                                        {project?.contributors.map(contributor => (
                                            <option key={contributor.id} value={contributor.id}>
                                                {contributor.firstName + ' ' + contributor.lastName}
                                            </option>
                                        ))}                               
                                    </NativeSelect>
                            </FormControl>

                        </Stack>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose task deadline"
                                value={taskDeadline}
                                onChange={(newValue) => setTaskDeadline(newValue)}
                            />
                        </LocalizationProvider>

                    </Stack>

                </Card>

                <Card variant="outlined" sx={{ width: 1/2, marginTop: 5}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    >
                        <div
                            style={{
                                margin: 10,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '24px' }}> 
                                Edit this project
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Changes will take effect after submision
                            </Typography> 
                        </div>
                        <GradientButton
                            size="small"
                            variant='contained'
                            color="warning"
                            sx={{margin: 1, height: 30}}
                            onClick={onEditProjectButtonClick}
                        >
                            Submit changes
                        </GradientButton>
                    </div>

                    <Divider />
                    
                    <Stack 
                        margin={2}
                        spacing={2}
                    >
                        <TextField
                            size="small" 
                            label='Project name'
                            placeholder="edit the project's name..."
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                        />
                        <TextField
                            size="small" 
                            label='Project description'
                            placeholder="edit the proejct's description..."
                            value={newProjectDescription}
                            onChange={(e) => setNewProjectDescription(e.target.value)}
                        />
                    </Stack>

                </Card>

                <Card variant="outlined" sx={{ width: 1/2, marginTop: 5 }}>
                    <div style={{
                        display: 'flex',
                        alignItems:'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            margin: 10,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography 
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    lineHeight: '1.5em'
                                }}
                            >
                                Delete this project
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary'}}>
                                Once you delete this project there is no going back, all archives, tasks and related data will be deleted
                            </Typography>
                        </div>
                        <GradientButton
                            variant="outlined"
                            size="small"
                            color="error"
                            sx={{
                                height: 30,
                                margin: 1
                            }}
                            onClick={onDeleteProjectButtonClick}
                        >
                            Delete this project
                        </GradientButton>
                    </div> 

            </Card>
            </div>
        </ThemeProvider>
    );
} 