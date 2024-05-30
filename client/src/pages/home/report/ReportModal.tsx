import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { IconGraph } from "@tabler/icons-react";

interface ReportModalProps {}

const ReportModal: React.FC<ReportModalProps> = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
      ></Modal>

      <Button onClick={open} variant="header">
        <IconGraph
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        ></IconGraph>
        <Text variant="header-button">Report</Text>
      </Button>
    </>
  );
};

export default ReportModal;
