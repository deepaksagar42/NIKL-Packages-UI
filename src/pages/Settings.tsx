import { Box } from "@radix-ui/themes";
import React from "react";
import { NavBar } from "../components/NavBar";


export const Settings: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <h1>Settings</h1>
       import { Box, Button, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { NavBar } from "../components/NavBar";

export const Settings: React.FC = () => {
  const username = "your-username-here"; // Replace with actual username from props/context if available
  const [confirmationText, setConfirmationText] = useState("");

  const handleDeleteAccount = () => {
    alert("Account deletion request submitted! (Mocked for now)");
    // TODO: Call API here when backend is ready
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
        maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      <NavBar />

      <h1>Settings</h1>

      {/* Delete Account Section */}
      <Box
        style={{
          background: "#fce4e4",
          padding: "1rem",
          borderRadius: "8px",
          width: "100%"
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#b71c1c",
            marginBottom: "0.5rem",
            display: "block"
          }}
        >
          Warning: Deleting your account is permanent!
        </Text>

        <Text size="2" style={{ color: "#b71c1c", display: "block", marginBottom: "1rem" }}>
          All related packages will not be deleted but will be linked to a ghost user.
        </Text>

        <Text size="2" style={{ display: "block", marginBottom: "0.5rem" }}>
          To confirm, type <strong>{username} delete</strong> below:
        </Text>

        <TextField.Root
          placeholder={`${username} delete`}
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <Button
          color="red"
          onClick={handleDeleteAccount}
          disabled={confirmationText.trim() !== `${username} delete`}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;

    </Box>
  );
};

export default Settings;
