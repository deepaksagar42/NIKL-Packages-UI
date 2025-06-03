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
import { csrfToken, userDetails, type UserDetails } from "../state/Auth";
import { useSetAtom } from "jotai";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { getUserDetails, loginUser } from "../api/users";


export const Login: React.FC = () => {
  const setCsrfToken = useSetAtom(csrfToken);
  const setUserDetails = useSetAtom(userDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hcaptchaToken, setHcaptchaToken] = useState("cats");
  const hcaptchaRef = useRef<any>(null);

  const handleLogin = async () => {
    if (!username || !password || !hcaptchaToken) {
      alert("Please fill in all fields and complete the CAPTCHA.");
      return;
    }

    try {
      const response_headers = await loginUser({
        user_name: username,
        password,
        hcaptcha_token: hcaptchaToken,
      });
      
      console.log("Raw JSON response:", response_headers);
      setCsrfToken(response_headers["x-csrf-token"] || "");

      const user_details = await getUserDetails(response_headers["x-csrf-token"] || "");
      console.log("User details:", user_details);

      setUserDetails({
        email: user_details.email,
        username: user_details.user_name,
        profilePicture: `https://www.gravatar.com/avatar/${btoa(user_details.email)}?d=identicon&s=200`,
        details: {
          fullName: user_details.profile_data.full_name
        }
      } as UserDetails);

      alert("Login successful!");
      window.location.href = "/manage/dashboard";
    } catch (error: any) {
      console.error("Login failed:", error);
      
      hcaptchaRef.current.resetCaptcha();
      setHcaptchaToken(""); // Clear token state

      alert("Login failed: " + error.message);
      return;
    }
  };

  const handleVerificationSuccess = (token: string) => {
    setHcaptchaToken(token);
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
            placeholder="User Name"
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

          <Flex align="center" gap="2" style={{ width: "100%" }}>
            <Checkbox
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
            />
            <Text size="2" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>Show Password</Text>

            <Link href="/forgot-password" style={{ marginLeft: "auto" }}>
              <Text size="2" color="blue">Forgot Password?</Text>
            </Link>
          </Flex>

          <HCaptcha
            sitekey="49a8ab5c-072a-4228-bd0c-bdd4bd70c450"
            onVerify={(token,_) => handleVerificationSuccess(token)}
            ref={hcaptchaRef}
          />

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
