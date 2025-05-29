import React from "react";
import { NavBar } from "../components/NavBar";
import { Box, Button } from "@radix-ui/themes";
import { csrfToken } from '../state/Auth';
import { useSetAtom } from "jotai";


export const Login: React.FC = () => {
  const setCsrfToken = useSetAtom(csrfToken);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>Login Page</h1>

      <Button
        variant="solid"
        color="mint"
        onClick={() => {
          setCsrfToken('mock-csrf-token'); // Set a mock CSRF token
          window.location.href = '/manage/dashboard'; // Redirect to dashboard after login
        }}
      >
        Login
      </Button>
      <p>Click the button to simulate login and redirect to the dashboard.</p>
      <p>Note: This is a simulated login for demonstration purposes.</p>

    </Box>
  )
};

export default Login;
