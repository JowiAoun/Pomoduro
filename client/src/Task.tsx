import React, { useState } from "react";
import { Button, Group, NavLink, Text } from "@mantine/core";
import { IconCircleCheckFilled, IconDotsVertical } from "@tabler/icons-react";
import { TaskType } from "./types.tsx";
import TaskEdit from "./TaskEdit.tsx";

interface TaskProps {
  task: TaskType;
  handleSelect: (id: string) => void;
  handleDelete: (id: string) => void;
  handleSave: (id: string, newTask: TaskType) => void;
  variant: string;
}

const Task: React.FC<TaskProps> = ({
  task,
  handleSelect,
  handleDelete,
  handleSave,
  variant,
}) => {
  const [edit, setEdit] = useState(false);

  const deleteTask = () => {
    setEdit(false);
    handleDelete(task._id);
  };

  const cancelTask = () => {
    setEdit(false);
  };

  const saveTask = (newTask: TaskType) => {
    setEdit(false);
    handleSave(task._id, newTask);
  };

  return edit ? (
    <TaskEdit
      task={task}
      handleDelete={deleteTask}
      handleCancel={cancelTask}
      handleSave={saveTask}
    ></TaskEdit>
  ) : (
    <NavLink
      variant={variant}
      onClick={() => handleSelect(task._id)}
      label={
        <div>
          <Group>
            <Text variant="task" size={"md"}>
              {task.title}
            </Text>
          </Group>
        </div>
      }
      leftSection={<IconCircleCheckFilled></IconCircleCheckFilled>}
      rightSection={
        <>
          <Text variant="task-amount">
            {task.numCompleted}/{task.numToComplete}
          </Text>
          <Button variant="task" onClick={() => setEdit(true)}>
            <IconDotsVertical></IconDotsVertical>
          </Button>
        </>
      }
    />
  );
};

export default Task;
