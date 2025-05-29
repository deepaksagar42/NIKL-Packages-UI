import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { csrfToken } from "../state/Auth";
import { useSetAtom } from "jotai";

export const Login: React.FC = () => {
  const setCsrfToken = useSetAtom(csrfToken);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add validation here if needed
    setCsrfToken("mock-csrf-token");
    window.location.href = "/manage/dashboard";
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
        Login to Your Account
      </Heading>

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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />
          <TextField.Root
            radius="full"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />

          <Flex align="center" gap="2" style={{ width: "100%", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
            <Checkbox
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
            />
            <Text size="2">Show Password</Text>
          </Flex>

          <Button
            variant="solid"
            color="mint"
            onClick={handleLogin}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Login
          </Button>
        </Flex>
      </Card>

      <Text size="2" style={{ marginTop: "20px", textAlign: "center" }}>
        This is a simulated login for demonstration purposes.
      </Text>
    </Box>
  );
};

export default Login;
