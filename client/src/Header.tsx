import React from "react";
import { Button, Divider, Group } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconGraph,
  IconSettings,
  IconLogin2,
} from "@tabler/icons-react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <Group>
        <IconCircleCheckFilled></IconCircleCheckFilled> Pomoduro
        <Button>
          <IconGraph></IconGraph> Report
        </Button>
        <Button>
          <IconSettings></IconSettings> Settings
        </Button>
        <Button>
          <IconLogin2></IconLogin2> Login
        </Button>
      </Group>

      <Divider></Divider>
    </>
  );
};

export default Header;
