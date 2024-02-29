import React, { useState } from "react";
import { Button, Group, NumberInput, Stack, Text } from "@mantine/core";
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
}

const Task: React.FC<TaskProps> = ({
  title: title,
  numCompleted,
  numToComplete,
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
    <div style={{ background: "gray" }}>
      {/* TODO: Turn back into button */}
      <Group>
        <IconCircleCheckFilled></IconCircleCheckFilled>
        <Text size={"md"}>{title}</Text>
        <Text>
          {numCompleted}/{numToComplete}
        </Text>
        <Button onClick={() => setEdit(true)}>
          <IconDotsVertical></IconDotsVertical>
        </Button>
      </Group>
    </div>
  );
};

export default Task;
