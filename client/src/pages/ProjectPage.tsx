import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { ProjectModel } from "../models/project.model";
import { ProjectService } from "../services/project.service";
import { Avatar, Card, Divider, IconButton, ThemeProvider, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import theme from "../utils/theme";
import { TaskModel } from "../models/task.model";
import PaginatedTaskCard from "../components/PaginatedTaskCard";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const archives = [
    { id: 1,  name: 'Project_SNAPSHOT_01' },
    { id: 2, name: 'Project_SNAPSHOT_02' },
    { id: 3, name: 'Project_SNAPSHOT_03' },
    { id: 4, name: 'Project_SNAPSHOT_04' },
    { id: 5, name: 'Project_SNAPSHOT_05' },
]

export default function ProjectPage() {
    const [project, setProject] = useState<ProjectModel | null>(null);
    const [tasksUnderProject, setTasksUnderProejct] = useState<TaskModel[]>([]);
    const {projectId} = useParams();
    const location = useLocation();
    
    useEffect(() => {
        const projectService = new ProjectService();
        if (location.state?.project) {
            setProject(location.state.project);
        } else {
            projectService.getProjectById("", Number(projectId))
                .then(response => {
                    setProject(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        projectService.getAllTasksUnderProject("", Number(projectId))
            .then(response => {
                setTasksUnderProejct(response);
            })
    }, [projectId])


    return (
        <ThemeProvider theme={theme}>
            <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    width: "95%",
                    marginTop: "16px",
                }}
            >
                {project && (
                    <Card sx={{ width: 4/5, marginLeft: 10,marginTop: 2, marginRight: 2, border: 'none', boxShadow: 'none' }}>
                        <Stack sx={{ margin: 1 }} spacing={1.5}>
                            <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ flexGrow: 1 }}>
                                <h3>{project.name}</h3>
                                <IconButton aria-label="settings">
                                <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton> 
                            </Stack>
                        </Stack> 
                        <Divider />
                        <Stack direction={"row"} spacing={2} alignItems={"stretch"} alignContent={"center"}>
                            {tasksUnderProject.length !== 0 && (
                                <PaginatedTaskCard tasks={tasksUnderProject} tasksPerPage={5} padding={0} />
                            )}
                        </Stack>
                    </Card>
                )}
                <Divider orientation="vertical" flexItem sx={{ marginLeft: "8px", marginRight: "8px" }} />
                
                {project && (
                    <Stack sx={{ margin: 2, width: '300px'}} spacing={5}>
                        <div>
                            <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
                                Description
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {project.description || "No description available."}
                            </Typography>
                        </div>

                        <Divider />

                        <div>
                            <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
                                Contributors
                            </Typography>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {project.constributors.map((contributor) => (
                                    <div key={contributor.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                                    <Avatar sx={{ bgcolor: '#363333', width: 30, height: 30 }}>
                                        {contributor.firstName.charAt(0).toUpperCase() + contributor.lastName.charAt(0).toUpperCase()}
                                    </Avatar>

                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 650, color: 'text.primary' }}>
                                            {contributor.username}
                                        </Typography>

                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {contributor.firstName + ' ' + contributor.lastName}
                                        </Typography>
                                    </div>
                                    </div>
                                ))}
                                </div>
                        </div>
                        
                        <Divider />

                        <div>
                            <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
                                Archives
                            </Typography>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {archives.map((archive) => (
                                <div key={archive.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <PictureAsPdfIcon sx={{ color: 'red', width: 24, height: 24 }} />

                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {archive.name}
                                    </Typography>
                                </div>
                                ))}
                            </div>
                        </div>

                    </Stack>
                )}
                

            </div>
        </ThemeProvider>
    );
}

