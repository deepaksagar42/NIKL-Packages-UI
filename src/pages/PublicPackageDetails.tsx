import { Box, Tabs, Text } from "@radix-ui/themes";
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

      {/* Need UI exactly lilke : https://crates.io/crates/syn/2.0.101 */}

      <Tabs.Root defaultValue="readme">
        <Tabs.List>
          <Tabs.Trigger value="readme">Readme</Tabs.Trigger>
          <Tabs.Trigger value="versions">Versions</Tabs.Trigger>
          <Tabs.Trigger value="dependencies">Dependencies</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="readme">
            <Text size="2">Readme content goes here</Text>
          </Tabs.Content>

          <Tabs.Content value="versions">
            <Text size="2">List of versions for this package</Text>
          </Tabs.Content>

          <Tabs.Content value="dependencies">
            <Text size="2">Dependencies for this package will be listed here</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>


    </Box>
  );
};

export default PublicPackageDetails;
