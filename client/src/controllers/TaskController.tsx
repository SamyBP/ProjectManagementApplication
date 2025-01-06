import { useEffect, useState } from "react";
import TaskView from "../views/TaskPage";
import { UserModel } from "../models/user.model";
import { ProjectModel } from "../models/project.model";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationService } from "../services/authentication.service";
import { TaskService } from "../services/task.service";
import { UpdateTaskDto } from "../models/update.task.dto";
import { LoggedHoursDto } from "../models/logged.hours.dto";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { TaskModel } from "../models/task.model";

const TaskController: React.FC = () => {
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
        <TaskView 
            user={user}
            project={project}
            hasPermission={hasPermission}
            task={location.state.task}
            hoursWorked={hoursWorked}
            updatedAssigneeId={updatedAssigneeId}
            updatedStatus={updatedStatus}
            onHoursWorkedChange={(e) => setHoursWorked(e.target.value)}
            onUpdatedStatusChange={(e) => setUpdatedStatus(e.target.value)}
            onUpdatedAssigneeIdChange={(e) => setUpdatedAssigneeId(Number(e.target.value))}
            onSubmitWorkedHoursButtonClick={onSubmitWorkedHoursButtonClick}
            onDeleteTaskButtonClick={onDeleteTaskButtonClick}
            onUpdateTaskButtonClick={onUpdateTaskButtonClick}
        />
    );
}

export default TaskController;