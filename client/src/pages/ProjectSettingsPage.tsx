import { useLocation, useParams } from "react-router-dom";
import { ProjectModel } from "../models/project.model";
import { useEffect, useState } from "react";
import { Card, Divider, Stack, ThemeProvider, Typography } from "@mui/material";
import GradientButton from "../components/GradientButton";
import RoundedTextField from "../components/RoundedTextField";
import theme from "../utils/theme";

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
                                Edit this project
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Changes will take effect after submision
                            </Typography> 
                        </div>
                        <GradientButton
                            size="small"
                            variant='contained'
                            color="success"
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