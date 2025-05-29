import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import zxcvbn from "zxcvbn";


export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordScore = zxcvbn(password).score;

  const isPasswordStrong = passwordScore >= 3;
  const doPasswordsMatch = password === retypePassword;

  const handleRegister = () => {
    setSubmitted(true);
    if (
      username &&
      email &&
      isPasswordStrong &&
      doPasswordsMatch &&
      agreeTerms
    ) {
      // Simulate registration logic
      console.log("Registered!");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      // window.location.href = "/manage/dashboard";
    }
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
        Create Your Account
      </Heading>

      <Card
        style={{
          padding: "30px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Flex direction="column" gap="3" align="center" style={{ width: "100%" }}>
          <TextField.Root
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />

          <TextField.Root
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
          />

          <TextField.Root
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />

          <PasswordStrengthBar score={passwordScore} />

          <TextField.Root
            placeholder="Retype Password"
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            style={{ width: "100%" }}
          />

          {!doPasswordsMatch && submitted && (
            <Text size="1" color="red">
              Passwords do not match
            </Text>
          )}

          {!isPasswordStrong && submitted && (
            <Text size="1" color="orange">
              Password is too weak
            </Text>
          )}

          <Flex align="start" style={{ width: "100%", marginTop: "10px" }}>
            <Checkbox
              style={{ marginRight: "10px" }}
              size="2"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(!!checked)}
            />
            <Text size="2">
              I agree to the{" "}
              <Link href="#" color="blue">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" color="blue">
                Privacy Policy
              </Link>
              .
            </Text>
          </Flex>

          <Button
            variant="solid"
            color="mint"
            onClick={handleRegister}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Register
          </Button>
        </Flex>
      </Card>

      <Text size="2" style={{ marginTop: "20px", textAlign: "center" }}>
        {/* For more information, please read the full Acceptable Use Policy. */}
        For more information, please read the full{" "}
        <Link href="#" color="blue">
          Acceptable Use Policy
        </Link>
        .
      </Text>
    </Box>
  );
};

export default Register;

// Password Strength Bar Component
const PasswordStrengthBar: React.FC<{ score: number }> = ({ score }) => {
  const getColor = (score: number) => {
    switch (score) {
      case 0: return "#ccc";
      case 1: return "red";
      case 2: return "orange";
      case 3: return "#bada55";
      case 4: return "green";
      default: return "#ccc";
    }
  };

  return (
    <Box style={{ width: "100%", height: "6px", background: "#eee", borderRadius: "4px" }}>
      <Box
        style={{
          height: "100%",
          width: `${(score + 1) * 20}%`,
          background: getColor(score),
          transition: "width 0.3s ease",
          borderRadius: "4px",
        }}
      />
    </Box>
  );
};
