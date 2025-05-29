import { Box } from "@radix-ui/themes";
import React from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from "react-router-dom";


export const PublicPackageDetails: React.FC = () => {
  // Get the Package ID and Version from the URL path /package/:id/:version
  const { id: packageId, version: packageVersion } = useParams<{ id: string; version: string }>();

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>PublicPackageDetails</h1>
      <p>Package ID: {packageId}</p>
      <p>Package Version: {packageVersion}</p>

    </Box>
  );
};

export default PublicPackageDetails;
