import { useLocation, useParams } from "react-router-dom";
import { ProjectModel } from "../models/project.model";
import { useEffect, useState } from "react";
import { Card, Divider, FormControl, InputLabel, NativeSelect, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import RoundedTextField from "../components/RoundedTextField";
import theme from "../utils/theme";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



export default function ProjectSettingsPage() {
    const location = useLocation();
    const {projectId} = useParams();
    const [project, setProject] = useState<ProjectModel| null>(null);

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
                        >
                            Create task
                        </GradientButton>
                    </div>

                    <Stack spacing={2} padding={2}>
                        <TextField
                            size="small" 
                            label='Task title'
                            placeholder="enter the task's title"
                        />

                        <TextField
                            size="small"
                            label='Task description'
                            placeholder="enter the task's description"
                        />

                        
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel variant="standard">Priority</InputLabel>
                                    <NativeSelect>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                    </NativeSelect>
                            </FormControl>

                            <FormControl fullWidth variant="outlined" size="small">
                                <InputLabel variant="standard">Assignee</InputLabel>
                                    <NativeSelect>
                                        <option value={1}>Beni Pintea</option>
                                        <option value={2}>Truta Andrei</option>
                                        <option value={3}>Marc Pop</option>                                
                                    </NativeSelect>
                            </FormControl>

                        </Stack>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Choose task deadline"/>
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
                        >
                            Submit changes
                        </GradientButton>
                    </div>

                    <Divider />
                    
                    <Stack 
                        margin={2}
                        spacing={2}
                    >
                        <RoundedTextField 
                            label='Project name'
                            placeholder="edit the project's name..."
                        />
                        <RoundedTextField 
                            label='Project description'
                            placeholder="edit the proejct's description..."
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
                        >
                            Delete this project
                        </GradientButton>
                    </div> 

            </Card>
            </div>
        </ThemeProvider>
    );
} 