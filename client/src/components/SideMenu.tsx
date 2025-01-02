import { Avatar, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { ProjectModel } from "../models/project.model";
import { UserModel } from "../models/user.model";


interface SideMenuProps {
  projects: ProjectModel[]
  user: UserModel
}

export default function SideMenu({projects, user}: SideMenuProps) {


    return (
        <Drawer variant='permanent' width={300}>
            <Stack direction='row' spacing={2} margin={2}>
              <Avatar sx={{bgcolor: '#363333'}}>
                {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
              </Avatar>
              <Stack>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '24px' }}> 
                    {user.username}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {user.email}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
                <List dense>
                    {projects.map((project, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton>
                                <Link 
                                    to={`/projects/${project.id}`}
                                    style={{ textDecoration: "none", color: "black" }}
                                    state={{ project, user }}
                                >
                                    <ListItemText primary={project.name} /> 
                                </Link> 
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ Stack>
        </Drawer>
    );
}