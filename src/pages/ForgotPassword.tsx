import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";


export const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleForgotPassword = () => {
    // Add validation here if needed
    alert(`Password reset link sent to ${username}`);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <NavBar />

      <Heading size="6" style={{ marginTop: "40px", marginBottom: "20px" }}>
        Password Reset
      </Heading>

      <Text size="3" style={{ marginBottom: "20px", textAlign: "center" }}>
        To reset your password, enter your user name or email
      </Text>

      <Card
        style={{
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Flex direction="column" gap="3" align="center">
          <TextField.Root
            radius="full"
            placeholder="User Name or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />

          <Button
            variant="solid"
            color="mint"
            onClick={handleForgotPassword}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Send Reset Link
          </Button>
        </Flex>
      </Card>

      <Text size="2" style={{ marginTop: "20px", textAlign: "center" }}>
        This is a simulated password reset page. In a real application, you would
        <br />
        receive an email with a link to reset your password
      </Text>
    </Box>
  );
};

export default ForgotPassword;
