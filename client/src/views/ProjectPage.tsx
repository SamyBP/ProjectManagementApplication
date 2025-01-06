import { ProjectModel } from "../models/project.model";
import { Avatar, Card, Divider, IconButton, ThemeProvider, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import theme from "../utils/theme";
import { TaskModel } from "../models/task.model";
import PaginatedTaskCard from "../components/PaginatedTaskCard";
import AddIcon from '@mui/icons-material/Add';
import { UserModel } from "../models/user.model";

interface ProjectViewProps {
    user: UserModel;
    project: ProjectModel | null;
    tasksUnderProject: TaskModel[];
    onProjectSettingsButtonClick: (e: React.FormEvent) => void;
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, tasksUnderProject, user, onProjectSettingsButtonClick }) => {
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
                                {user.id == project.owner && (
                                    <IconButton aria-label="settings" onClick={onProjectSettingsButtonClick}>
                                        <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                                    </IconButton> 
                                )}
                                
                            </Stack>
                        </Stack> 
                        <Divider />
                        <Stack direction={"row"} spacing={2} alignItems={"stretch"} alignContent={"center"}>
                            {tasksUnderProject.length !== 0 && (
                                <PaginatedTaskCard tasks={tasksUnderProject} tasksPerPage={5} padding={0} detailed={true}/>
                            )}
                        </Stack>
                    </Card>
                )}
                <Divider orientation="vertical" flexItem sx={{ marginLeft: "8px", marginRight: "8px" }} />
                
                {project && (
                    <Stack sx={{ margin: 2, width: '300px'}} spacing={2}>
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
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 2 , gap: 5}}>
                                <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '1.5em' }}>
                                    Contributors
                                </Typography>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {project.contributors.map((contributor) => (
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
                        
                    </Stack>
                )}
                

            </div>
        </ThemeProvider>
    );
}

export default ProjectView;