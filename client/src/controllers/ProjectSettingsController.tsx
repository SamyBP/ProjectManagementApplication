import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ProjectModel } from "../models/project.model";
import ProjectSettingsView from "../views/ProjectSettingsPage";
import { CreateTaskDto } from "../models/create.task.dto";
import { TaskService } from "../services/task.service";
import { AuthenticationService } from "../services/authentication.service";
import { CreateProjectDto } from "../models/create.project.dto";
import { ProjectService } from "../services/project.service";

const ProjectSettingsController : React.FC = () => {
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
        <ProjectSettingsView 
            project={project}
            taskTitle={taskTitle}
            taskDescription={taskDescription}
            taskPriority={taskPriority}
            assigneeId={assigneeId}
            taskDeadline={taskDeadline}
            newProjectName={newProjectName}
            newProjectDescription={newProjectDescription}
            onTaskTitleChange={(e) => setTaskTitile(e.target.value)}
            onTaskDescriptionChange={(e) => setTaskDescription(e.target.value)}
            onTaskPriorityChange={(e) => setTaskPriority(e.target.value)}
            onAssigneeChange={(e) => setAssigneeId(Number(e.target.value))}
            onTaskDeadlineChange={(newValue) => setTaskDeadline(newValue)}
            onNewProjectNameChange={(e) => setNewProjectName(e.target.value)}
            onNewProjectDescriptionChange={(e) => setNewProjectDescription(e.target.value)}
            onCreateTaskButtonClick={onCreateTaskButtonClick}
            onEditProjectButtonClick={onEditProjectButtonClick}
            onDeleteProjectButtonClick={onDeleteProjectButtonClick}
        />

    );
}

export default ProjectSettingsController;