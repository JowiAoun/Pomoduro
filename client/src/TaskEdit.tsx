import React from "react";
import { TaskType } from "./types";
import {
  Button,
  Container,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconLock,
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";

interface TaskEditProps {
  task: TaskType;
  handleDelete: () => void;
  handleCancel: () => void;
  handleSave: (newTask: TaskType) => void;
}

const TaskEdit: React.FC<TaskEditProps> = ({
  task,
  handleDelete,
  handleCancel,
  handleSave,
}) => {
  let newTask: TaskType = task;

  const handleInputChange = (value: number | string, field: keyof TaskType) => {
    newTask = { ...newTask, [field]: value };
  };

  return (
    <Stack gap={0}>
      <Container variant="task-edit">
        <TextInput
          defaultValue={task.title}
          placeholder={"What are you working on?"}
          onChange={(event) => handleInputChange(event.target.value, "title")}
        ></TextInput>
        <Text size={"sm"} variant={"task-amount"}>
          Act / Est Pomodoros
        </Text>

        <Group>
          <NumberInput
            defaultValue={task.numCompleted}
            onChange={(value) => handleInputChange(value, "numCompleted")}
          ></NumberInput>
          <Text>/</Text>
          <NumberInput
            defaultValue={task.numToComplete}
            onChange={(value) => handleInputChange(value, "numToComplete")}
          ></NumberInput>
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
      </Container>

      <Container variant="task-edit-bottom">
        <Group>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSave(newTask)}>Save</Button>
        </Group>
      </Container>
    </Stack>
  );
};

export default TaskEdit;
