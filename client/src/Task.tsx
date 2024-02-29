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

interface TaskProps {
  title: string;
  numCompleted: number;
  numToComplete: number;
  setSelectedTask: (index: number) => void;
  index: number;
}

const Task: React.FC<TaskProps> = ({
  title,
  numCompleted,
  numToComplete,
  setSelectedTask,
  index,
}) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <Stack style={{ background: "gray" }}>
      <Text size={"md"}>{title}</Text>
      <Text size={"sm"}>Act / Est Pomodoros</Text>

      <Group>
        <NumberInput value={numCompleted}></NumberInput>/
        <NumberInput value={numToComplete}></NumberInput>
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
        <Button onClick={() => setEdit(false)}>Delete</Button>
        <Button onClick={() => setEdit(false)}>Cancel</Button>
        <Button onClick={() => setEdit(false)}>Save</Button>
      </Group>
    </Stack>
  ) : (
    <NavLink
      onClick={() => setSelectedTask(index)}
      label={
        <div>
          <Group>
            <Text size={"md"}>{title}</Text>
          </Group>
        </div>
      }
      leftSection={<IconCircleCheckFilled></IconCircleCheckFilled>}
      rightSection={
        <>
          <Text>
            {numCompleted}/{numToComplete}
          </Text>
          <Button onClick={() => setEdit(true)}>
            <IconDotsVertical></IconDotsVertical>
          </Button>
        </>
      }
    />
  );
};

export default Task;
