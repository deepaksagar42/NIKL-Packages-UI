import { Box } from "@radix-ui/themes";
import React from "react";
import { NavBar } from "../components/NavBar";


export const PublicPackageDetails: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>PublicPackageDetails</h1>

    </Box>
  );
};

export default PublicPackageDetails;
