import React, { useState } from "react";
import {
  Button,
  Group,
  NavLink,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLock,
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { TaskType } from "./types.tsx";

interface TaskProps {
  task: TaskType;
  handleSelect: (id: string) => void;
  handleDelete: (id: string) => void;
  variant: string;
}

const Task: React.FC<TaskProps> = ({
  task,
  handleSelect,
  handleDelete,
  variant,
}) => {
  const [edit, setEdit] = useState(false);

  function deleteTask() {
    setEdit(false);
    handleDelete(task.id);
  }

  return edit ? (
    <Stack>
      <Text size={"md"}>{task.title}</Text>
      <Text size={"sm"}>Act / Est Pomodoros</Text>

      <Group>
        <NumberInput value={task.numCompleted}></NumberInput>/
        <NumberInput value={task.numToComplete}></NumberInput>
        <Button>
          <IconTriangleFilled></IconTriangleFilled>
        </Button>
        <Button>
          <IconTriangleInvertedFilled></IconTriangleInvertedFilled>
        </Button>
      </Group>

      <Group>
        <Button>
          <Text>+ Add Note</Text>
        </Button>
        <Button>
          <Text>+ Add Project</Text>
          <IconLock></IconLock>
        </Button>
      </Group>

      <Group>
        <Button onClick={() => deleteTask()}>Delete</Button>
        <Button onClick={() => setEdit(false)}>Cancel</Button>
        <Button onClick={() => setEdit(false)}>Save</Button>
      </Group>
    </Stack>
  ) : (
    <NavLink
      variant={variant}
      onClick={() => handleSelect(task.id)}
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
