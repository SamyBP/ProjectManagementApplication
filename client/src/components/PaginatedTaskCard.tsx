import React, { useState } from "react";
import { Card, Stack, Typography, Pagination } from "@mui/material";
import { TaskModel } from "../models/task.model";
import { Link } from "react-router-dom";


interface PaginatedTaskCardProps {
  title?: string;
  tasks: TaskModel[];
  tasksPerPage?: number;
  padding?: number | string;
  detailed?: boolean
}

const PaginatedTaskCard: React.FC<PaginatedTaskCardProps> = ({ title = '', tasks, tasksPerPage = 5, padding = 4, detailed = false }) => {
  const [page, setPage] = useState<number>(1);

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Card sx={{ padding: padding, width: 1/1, boxShadow: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
        {title}
      </Typography>
      <Stack spacing={2}>
        {currentTasks.map((task) => (
          <Link
            key={task.id}
            to={`/tasks/${task.id}`}
            state={{ task }}
            style={{ textDecoration: 'none' }}
          >
            <Card 
              key={task.id}
              sx={{ 
                padding: 2,
                boxShadow: 1,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4
                }
              }}
            >
              <Stack>
              <Typography variant="body1">{task.title}</Typography>

              {detailed && (
                <>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    <b>Assignee:</b> {task.assignee.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    <b>Description:</b> {task.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    <b>Status:</b> {task.status}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  <b> Priority:</b> {task.priority}
                  </Typography> 
                </>
              )}

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                <b>Due in:</b> {task.dueIn} days
              </Typography>
              </Stack>
            </Card>
          </Link>
        ))}
      </Stack>
      <Pagination
        count={Math.ceil(tasks.length / tasksPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: 2 }}
      />
    </Card>
  );
};

export default PaginatedTaskCard;
