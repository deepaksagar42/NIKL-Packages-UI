import React, { useRef, useState } from "react";
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
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { registerUser } from "../api/users";



export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [hcaptchaToken, setHcaptchaToken] = useState("");
  const hcaptchaRef = useRef<any>(null);

  const passwordScore = zxcvbn(password).score;

  const isPasswordStrong = passwordScore >= 3;
  const doPasswordsMatch = password === retypePassword;

  const handleRegister = async () => {
    setSubmitted(true);
    setButtonDisabled(true);
    if (
      username &&
      email &&
      password &&
      fullName &&
      isPasswordStrong &&
      doPasswordsMatch &&
      agreeTerms
    ) {
      try {
        const result = await registerUser({
          user_name: username,
          email,
          password,
          full_name: fullName,
          hcaptcha_token: hcaptchaToken,
        });

        console.log("Raw JSON response:", result);
        alert("Registration success: " + result.message);
        window.location.href = "/login";
        return;
      } catch (error: any) {
        console.error("Registration failed:", error);
        alert("Registration failed: " + error.message);
      }
    }
    setButtonDisabled(false);
    setSubmitted(false);
    hcaptchaRef.current.resetCaptcha(); // Reset the hCaptcha widget
    setHcaptchaToken(""); // Clear the hCaptcha token
  };

  const handleVerificationSuccess = (token: string) => {
    setHcaptchaToken(token);
    setButtonDisabled(false);
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
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: "100%" }}
          />

          <TextField.Root
            placeholder="User Name"
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

          <HCaptcha
            sitekey="49a8ab5c-072a-4228-bd0c-bdd4bd70c450"
            onVerify={(token,_) => handleVerificationSuccess(token)}
            ref={hcaptchaRef}
          />

          <Button
            variant="solid"
            color="mint"
            disabled={
              !username ||
              !fullName ||
              !email ||
              !isPasswordStrong ||
              !doPasswordsMatch ||
              !agreeTerms ||
              buttonDisabled
            }
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
