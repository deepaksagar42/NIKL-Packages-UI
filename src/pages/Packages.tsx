import { Box } from "@radix-ui/themes";
import React from "react";
import { NavBar } from "../components/NavBar";


export const Packages: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>Packages</h1>

    </Box>
  );
};

export default Packages;
