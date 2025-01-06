import { useEffect, useState } from "react";
import { ProjectModel } from "../models/project.model";
import { TaskModel } from "../models/task.model";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectView from "../views/ProjectPage";
import { AuthenticationService } from "../services/authentication.service";
import { ProjectService } from "../services/project.service";

const ProjectController: React.FC = () => {
    const [project, setProject] = useState<ProjectModel | null>(null);
    const [tasksUnderProject, setTasksUnderProejct] = useState<TaskModel[]>([]);
    const {projectId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const onProjectSettingsButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/projects/${projectId}/settings`, {state: {project, user: location.state.user}});
    }

    useEffect(() => {
    const authService = new AuthenticationService();
    const projectService = new ProjectService();

    const fetchProjectData = async () => {
        try {
            const accessToken = await authService.getAccessTokenOrSignOut()

            if (location.state?.project) {
                setProject(location.state.project);
            } else {
                const projectData = await projectService.getProjectById(accessToken, Number(projectId));
                setProject(projectData); 
            }

            const taskData = await projectService.getAllTasksUnderProject(accessToken, Number(projectId));
            setTasksUnderProejct(taskData);
        } catch(error) {
            console.log(error);
            authService.logout();
            navigate('/sign-in');
        }
    }

    fetchProjectData();

}, [projectId, location])

    return (
        <ProjectView
            user = {location.state.user}
            project={project}
            tasksUnderProject={tasksUnderProject}
            onProjectSettingsButtonClick={onProjectSettingsButtonClick}
        />
    );
}

export default ProjectController;