import { Box } from "@radix-ui/themes";
import React from "react";
import { NavBar } from "../components/NavBar";


export const Profile: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>Profile</h1>

    </Box>
  );
};

export default Profile;
