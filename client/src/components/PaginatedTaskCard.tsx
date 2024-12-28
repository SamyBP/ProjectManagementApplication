import React, { useState } from "react";
import { Card, Stack, Typography, Pagination } from "@mui/material";
import { TaskModel } from "../models/task.model";


interface PaginatedTaskCardProps {
  title: string;
  tasks: TaskModel[];
  tasksPerPage?: number;
}

const PaginatedTaskCard: React.FC<PaginatedTaskCardProps> = ({ title, tasks, tasksPerPage = 5 }) => {
  const [page, setPage] = useState<number>(1);

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Card sx={{ padding: 4, width: 1/1, boxShadow: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 550, lineHeight: '24px', marginBottom: 2 }}>
        {title}
      </Typography>
      <Stack spacing={2}>
        {currentTasks.map((task) => (
          <Card key={task.id} sx={{ padding: 2, boxShadow: 1 }}>
            <Typography variant="body1">{task.title}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Due in {task.dueIn} days
            </Typography>
          </Card>
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
