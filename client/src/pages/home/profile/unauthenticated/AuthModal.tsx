import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";
import React from "react";
import AuthForm from "./AuthForm.tsx";
import { IconLogin2 } from "@tabler/icons-react";

interface AuthModalProps {}

const AuthModal: React.FC<AuthModalProps> = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <AuthForm />
      </Modal>

      <Button onClick={open} variant="header">
        <IconLogin2
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        ></IconLogin2>
        <Text variant="header-button">Login</Text>
      </Button>
    </>
  );
};

export default AuthModal;
