import React from "react";
import { Button, Container, Group } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconGraph,
  IconSettings,
  IconLogin2,
} from "@tabler/icons-react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Container size="sm" py="0.5rem">
      <Group gap="sm">
        <Container ml="0">
          <IconCircleCheckFilled></IconCircleCheckFilled> Pomoduro
        </Container>
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
    </Container>
  );
};

export default Header;
