import React from "react";
import { Button, Container, Group, Text } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconGraph,
  IconLogin2,
  IconSettings,
} from "@tabler/icons-react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Container size="sm" py="0.5rem">
      <Group gap="sm">
        <Container ml="0" px="0">
          <IconCircleCheckFilled></IconCircleCheckFilled>{" "}
          <Text variant="bold">Pomoduro</Text>
        </Container>
        <Button variant="header">
          <IconGraph></IconGraph>
          <Text>Report</Text>
        </Button>
        <Button variant="header">
          <IconSettings></IconSettings>
          <Text>Settings</Text>
        </Button>
        <Button variant="header">
          <IconLogin2></IconLogin2>
          <Text>Login</Text>
        </Button>
      </Group>
    </Container>
  );
};

export default Header;
