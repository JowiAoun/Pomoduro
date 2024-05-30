import React from "react";
import { Container, Group, Text } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import AuthModal from "../profile/unauthenticated/AuthModal.tsx";
import SettingsModal from "../settings/SettingsModal.tsx";
import ReportModal from "../report/ReportModal.tsx";

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

        <ReportModal />
        <SettingsModal />
        <AuthModal />
      </Group>
    </Container>
  );
};

export default Header;
