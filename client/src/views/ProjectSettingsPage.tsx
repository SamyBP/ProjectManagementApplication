import { ProjectModel } from "../models/project.model";
import React from "react";
import { Card, Divider, FormControl, InputLabel, NativeSelect, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import theme from "../utils/theme";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer } from "react-toastify";


interface ProjectSettingsViewProps {
    project: ProjectModel | null;
    taskTitle: string;
    taskDescription: string;
    taskPriority: string;
    assigneeId: any;
    taskDeadline: any;
    newProjectName: string;
    newProjectDescription: string;
    onTaskTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTaskDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTaskPriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onAssigneeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onTaskDeadlineChange: (date: any) => void;
    onNewProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewProjectDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateTaskButtonClick: (e: React.FormEvent) => void;
    onEditProjectButtonClick: (e: React.FormEvent) => void;
    onDeleteProjectButtonClick: (e: React.FormEvent) => void;
}

const ProjectSettingsView: React.FC<ProjectSettingsViewProps> = ({
    project,
    taskTitle,
    taskDescription,
    taskPriority,
    assigneeId,
    taskDeadline,
    newProjectName,
    newProjectDescription,
    onTaskTitleChange,
    onTaskDescriptionChange,
    onTaskPriorityChange,
    onAssigneeChange,
    onTaskDeadlineChange,
    
    onNewProjectNameChange,
    onNewProjectDescriptionChange,
    
    onCreateTaskButtonClick,
    onEditProjectButtonClick,
    onDeleteProjectButtonClick
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
                            onChange={onTaskTitleChange}
                        />

                        <TextField
                            size="small"
                            label='Task description'
                            placeholder="enter the task's description"
                            value={taskDescription}
                            onChange={onTaskDescriptionChange}
                        />

                        
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel variant="standard">Priority</InputLabel>
                                    <NativeSelect
                                        value={taskPriority}
                                        onChange={onTaskPriorityChange}
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
                                        onChange={onAssigneeChange} //(e) => setAssigneeId(Number(e.target.value))
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
                                onChange={onTaskDeadlineChange} // (newValue) => setTaskDeadline(newValue)
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
                            onChange={onNewProjectNameChange}
                        />
                        <TextField
                            size="small" 
                            label='Project description'
                            placeholder="edit the proejct's description..."
                            value={newProjectDescription}
                            onChange={onNewProjectDescriptionChange}
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
            <ToastContainer aria-label={""}/>
        </ThemeProvider>
    );
}

export default ProjectSettingsView;