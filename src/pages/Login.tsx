import React from "react";
import { NavBar } from "../components/NavBar";
import { Box } from "@radix-ui/themes";


export const Login: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>Login Page</h1>

    </Box>
  )
};

export default Login;
