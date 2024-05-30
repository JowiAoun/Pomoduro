import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { IconSettings } from "@tabler/icons-react";

interface SettingsModalProps {}

const SettingsModal: React.FC<SettingsModalProps> = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Settings"
        scrollAreaComponent={ScrollArea.Autosize}
      ></Modal>

      <Button onClick={open} variant="header">
        <IconSettings
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        ></IconSettings>
        <Text variant="header-button">Settings</Text>
      </Button>
    </>
  );
};

export default SettingsModal;
