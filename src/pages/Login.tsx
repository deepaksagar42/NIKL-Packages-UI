import React from "react";
import { NavBar } from "../components/NavBar";
import { Box, Button, Card, Checkbox, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { csrfToken } from '../state/Auth';
import { useSetAtom } from "jotai";


export const Login: React.FC = () => {
  const setCsrfToken = useSetAtom(csrfToken);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <Heading size="5" style={{ marginTop: '20px' }}>
        Login to Your Account
      </Heading>

      <Box style={{ marginTop: '20px' }}>
        <Card style={{ padding: '20px', width: '400px', textAlign: 'center' }}>
          <TextField.Root radius="full" placeholder="Username" style={{ width: '300px', marginBottom: '10px' }} />
          <TextField.Root radius="full" placeholder="Password" type="password" style={{ width: '300px' }} />

          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox defaultChecked />
              Show Password
            </Flex>
          </Text>

          <Button
            variant="solid"
            color="mint"
            onClick={() => {
              setCsrfToken('mock-csrf-token'); // Set a mock CSRF token
              window.location.href = '/manage/dashboard'; // Redirect to dashboard after login
            }}
            >Login
          </Button>

        </Card>
      </Box>

      <p>Click the button to simulate login and redirect to the dashboard.</p>
      <p>Note: This is a simulated login for demonstration purposes.</p>

    </Box>
  )
};

export default Login;
