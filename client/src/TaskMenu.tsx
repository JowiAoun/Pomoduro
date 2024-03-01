import React from "react";
import { Button, Menu, rem, Text } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconCheck,
  IconDotsVertical,
  IconLock,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

interface TaskMenuProps {}

const TaskMenu: React.FC<TaskMenuProps> = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="task-menu-select">
          <IconDotsVertical></IconDotsVertical>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Clear finished tasks
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconCheck style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Clear act pomodoros
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
        >
          Add from Template
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              <IconLock style={{ width: rem(14), height: rem(14) }}></IconLock>
            </Text>
          }
        >
          Import from Todoist
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Clear all tasks
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskMenu;
