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
        <Container variant="header-logo">
          <IconCircleCheckFilled
            style={{ marginLeft: "0px", marginRight: "0.5rem" }}
          ></IconCircleCheckFilled>
          <Text variant="header-logo">Pomoduro</Text>
        </Container>
        <Button variant="header">
          <IconGraph
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          ></IconGraph>
          <Text variant="header-button">Report</Text>
        </Button>
        <Button variant="header">
          <IconSettings
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          ></IconSettings>
          <Text variant="header-button">Settings</Text>
        </Button>
        <Button variant="header">
          <IconLogin2
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          ></IconLogin2>
          <Text variant="header-button">Login</Text>
        </Button>
      </Group>
    </Container>
  );
};

export default Header;
