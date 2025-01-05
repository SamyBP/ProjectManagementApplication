import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationService } from "../services/authentication.service";
import { ProjectService } from "../services/project.service";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";
import { ThemeProvider } from "@emotion/react";
import theme from "../utils/theme";
import { Card, Divider, FormControl, InputLabel, NativeSelect, Stack, TextField, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import { ProjectModel } from "../models/project.model";
import { LoggedHoursDto } from "../models/logged.hours.dto";
import { TaskService } from "../services/task.service";
import { UpdateTaskDto } from "../models/update.task.dto";



export default function TaskPage() {
    const [hoursWorked, setHoursWorked] = useState('');
    const [updatedAssigneeId, setUpdatedAssigneeId] = useState<any>(null);
    const [updatedStatus, setUpdatedStatus] = useState('');


    const [user, setUser] = useState<UserModel | null>(null);
    const [project, setProject] = useState<ProjectModel>();
    const [hasPermission, setHasPermission] = useState<number>(0);

    const location = useLocation();
    const navigate = useNavigate();

    const onSubmitWorkedHoursButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const dto: LoggedHoursDto = {
            projectId: project?.id,
            taskId: location.state.task.id,
            count: Number(hoursWorked)
        }

        const authService = new AuthenticationService();
        const taskService = new TaskService();

        try {
            const token = await authService.getAccessTokenOrSignOut();
            const isSuccesfullyLogged = await taskService.loggWorkedHours(token, dto);
            console.log(`Log is success: ${isSuccesfullyLogged}`);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const onUpdateTaskButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const dto: UpdateTaskDto = {
            projectId: project?.id,
            taskId: location.state.task.id,
            assignee: updatedAssigneeId,
            status: updatedStatus
        }

        const authService = new AuthenticationService();
        const taskService = new TaskService();

        try {
            const token = await authService.getAccessTokenOrSignOut();
            const isUpdateSuccesfull = await taskService.updateTask(token, dto);
            console.log(`Update is success: ${isUpdateSuccesfull}`);
        } catch (error: any) {
            console.log(error.message);
        }

    }

    const onDeleteTaskButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const authService = new AuthenticationService();
        const taskService = new TaskService();

        try {
            const token = await authService.getAccessTokenOrSignOut();
            const isDeleteSuccesfull = await taskService.deleteTask(token, project?.id, location.state.task.id);
            console.log(`Delete is success: ${isDeleteSuccesfull}`);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const setPermissionType = async () => {
            const authService = new AuthenticationService();
            const userService = new UserService();
            const projectService = new ProjectService();

            try {
                const token = await authService.getAccessTokenOrSignOut();
                const loggedUser = await userService.getLoggedUserDetails(token);
                setUser(loggedUser);

                const task: TaskModel | undefined = location.state?.task;

                if (task) {
                    const project = await projectService.getProjectById(token, task.projectId);
                    setProject(project)
                    if (loggedUser.id === project.owner) {
                        setHasPermission(2);
                    } else if (loggedUser.id === task.assignee.id) {
                        setHasPermission(1);
                    } else {
                        setHasPermission(0);
                    }
                } else {
                    setHasPermission(0);
                }
            } catch (error: any) {
                console.error(error.message);
                authService.logout();
                navigate('/sign-in');
            }
        };

        setPermissionType();
    }, [location, navigate]);

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

                <Card variant="outlined" sx={{ width: 1/2, marginTop: 5 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 10,
                            gap: 5
                        }}
                    >

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: '30px' }}>
                                {location.state.task.title}
                            </Typography>
                        </div>

                        <Divider />

                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Assigned to: {location.state.task.assignee.firstName + ' ' + location.state.task.assignee.lastName}
                        </Typography>

                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Description: {location.state.task.description}
                        </Typography>

                        
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Due in: {location.state.task.dueIn} Days
                        </Typography>

                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Current status: {location.state.task.status}
                        </Typography>

                    </div>

                </Card>
                {(user !== null && user.id === location.state.task.assignee.id) && (
                    <Card variant="outlined" sx={{ width: 1/2, marginTop: 5 }}>
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
                                    Logg your time
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Enter the numbers of hours spent on this task
                                </Typography> 
                            </div>
                            <GradientButton
                                size="small"
                                variant='contained'
                                color="info"
                                sx={{margin: 1, height: 30}}
                                onClick={onSubmitWorkedHoursButtonClick}
                            >
                                Submit
                            </GradientButton>
                        </div>
                        
                        <Stack spacing={2} padding={2}>
                            <TextField 
                                size="small"
                                label="Hours"
                                placeholder="type in your worked hours..."
                                value={hoursWorked}
                                onChange={(e) => setHoursWorked(e.target.value)}
                                fullWidth
                            />
                        </Stack>

                    </Card>
                )}

                
                {(hasPermission === 1 || hasPermission === 2) && (
                     <Card variant="outlined" sx={{ width: 1/2, marginTop: 5 }}>
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
                                    Update this task
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    You can select a new task status, or choose to assign it to someone else
                                </Typography> 
                            </div>
                            <GradientButton
                                size="small"
                                variant='contained'
                                color="success"
                                sx={{margin: 1, height: 30}}
                                onClick={onUpdateTaskButtonClick}
                            >
                                Update task
                            </GradientButton>
                        </div>
                            <Stack spacing={2} padding={2}>
                                <FormControl fullWidth size="small">
                                    <InputLabel variant="standard">Assignee</InputLabel>
                                        <NativeSelect
                                            value={updatedAssigneeId ?? ""}
                                            onChange={(e) => setUpdatedAssigneeId(Number(e.target.value))}
                                        >
                                            <option value="" disabled></option>
                                            {project?.contributors.map(contributor => (
                                                <option key={contributor.id} value={contributor.id}>
                                                    {contributor.firstName + ' ' + contributor.lastName}
                                                </option>
                                            ))}                               
                                        </NativeSelect>
                                </FormControl>

                                <FormControl fullWidth size="small">
                                    <InputLabel variant="standard">Update the task status</InputLabel>
                                        <NativeSelect
                                            value={updatedStatus}
                                            onChange={(e) => setUpdatedStatus(e.target.value)}
                                        >
                                            <option value="" disabled></option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="CLOSED">CLOSED</option>
                                        </NativeSelect>
                                </FormControl>
                            </Stack>
                    </Card>
                )}

                {hasPermission === 2 && (
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
                                 Delete this task
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary'}}>
                                    Once you delete this task there is no going back
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
                                onClick={onDeleteTaskButtonClick}
                            >
                                Delete this task
                            </GradientButton>
                        </div> 
                    </Card>
                )}
            </div>
        </ThemeProvider>
    );
}
