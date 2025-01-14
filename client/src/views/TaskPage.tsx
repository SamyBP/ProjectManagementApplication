import React from "react";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";
import { ThemeProvider } from "@emotion/react";
import theme from "../utils/theme";
import { Card, Divider, FormControl, InputLabel, NativeSelect, Stack, TextField, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import { ProjectModel } from "../models/project.model";
import { ToastContainer } from "react-toastify";


interface TaskViewProps {
    user: UserModel | null;
    project: ProjectModel | undefined;
    task: TaskModel;
    hasPermission: number;
    hoursWorked: string;
    updatedAssigneeId: any;
    updatedStatus: string;
    onHoursWorkedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitWorkedHoursButtonClick: (e: React.FormEvent) => void;
    onUpdateTaskButtonClick: (e: React.FormEvent) => void;
    onDeleteTaskButtonClick: (e: React.FormEvent) => void;
    onUpdatedAssigneeIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onUpdatedStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ 
    user,
    project,
    task,
    hasPermission, 
    hoursWorked, 
    updatedAssigneeId, 
    updatedStatus,
    onHoursWorkedChange,
    onSubmitWorkedHoursButtonClick,
    onUpdateTaskButtonClick,
    onDeleteTaskButtonClick,
    onUpdatedAssigneeIdChange,
    onUpdatedStatusChange
}) => {
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
                                    {task.title}
                                </Typography>
                            </div>

                            <Divider />

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Assigned to: {task.assignee.firstName + ' ' + task.assignee.lastName}
                            </Typography>

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Description: {task.description}
                            </Typography>

                            
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Due in: {task.dueIn} Days
                            </Typography>

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Current status: {task.status}
                            </Typography>

                        </div>

                    </Card>
                    {(user !== null && user.id === task.assignee.id) && (
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
                                    onChange={onHoursWorkedChange}
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
                                                onChange={onUpdatedAssigneeIdChange}
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
                                                onChange={onUpdatedStatusChange}
                                            >
                                                <option value="" disabled></option>
                                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                <option value="FINISHED">FINISHED</option>
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
                <ToastContainer aria-label={""} />
            </ThemeProvider>
    );
}

export default TaskView;