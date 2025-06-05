import {
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  Heading,
  TextField,
  Button,
} from "@radix-ui/themes";
import React, {  useState } from "react";
import { NavBar } from "../components/NavBar";
import { useAtomValue, useSetAtom } from "jotai";
import { userDetails } from "../state/Auth";
import { updateUserDetails } from "../api/users";
import { csrfToken } from "../state/Auth";

export const Profile: React.FC = () => {

 
  const user = useAtomValue(userDetails);
  const setUser = useSetAtom(userDetails);
  const csrfTokenValue = useAtomValue(csrfToken); 

  // Local state for editing fields
  const [editing, setEditing] = useState(false);
  const [username, setUserName] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.details?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    await updateUserDetails({
      email,
      password,
      full_name: fullName,
      csrfTokenValue: csrfTokenValue ?? ""
    });
    if (user) {
      
      setUser({
        ...user,
        email,
        details: { ...user.details, fullName },
        username: user.username, // ensure username is always present
        profilePicture: user.profilePicture, // ensure profilePicture is always present
      });
    }
    setEditing(false);
    setPassword(""); // Clear password field after save
  };

  const handleCancel = () => {
    setEditing(false);
    setFullName(user?.details?.fullName || "");
    setEmail(user?.email || "");
    setPassword("");
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <NavBar />
      <Heading size="7" style={{ margin: "32px 0 24px" }}>
        Profile
      </Heading>
     
      <Card style={{ minWidth: 340, maxWidth: 400, padding: 32 }}>
        <Flex direction="column" align="center" gap="4">
          <Avatar
            size="6"
            src={user?.profilePicture}
            fallback={user?.username?.charAt(0) || "?"}
            alt={user?.username || "User"}
          />

          {editing ? (
            <>
              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Username
              </Text>
              <TextField.Root
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                style={{ width: 220, marginBottom: 8 }}
              />

              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Full Name
              </Text>
              <TextField.Root
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                style={{ width: 220, marginBottom: 8 }}
              />

              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Email
              </Text>
              <TextField.Root
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                style={{ width: 220, marginBottom: 8 }}
              />

              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                New Password
              </Text>
              <TextField.Root
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                type="password"
                style={{ width: 220, marginBottom: 8 }}
              />

              <Flex gap="2" align="center" mt="2">
                <Button size="1" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  size="1"
                  variant="soft"
                  color="gray"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Username
              </Text>
              <Text
                size="5"
                weight="bold"
                style={{ marginTop: 4, marginBottom: 8 }}
              >
                {user?.username || "Unknown User"}
              </Text>
              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Email
              </Text>
              <Text size="3" color="gray" style={{ marginBottom: 8 }}>
                {user?.email || "No email"}
              </Text>
              <Text size="2" weight="bold" align="left" style={{ width: 220 }}>
                Full Name
              </Text>
              <Text size="3" color="gray" style={{ marginBottom: 8 }}>
                {user?.details?.fullName ? user.details.fullName : ""}
              </Text>
              <Button
                size="1"
                onClick={() => setEditing(true)}
                style={{ marginTop: 8 }}
              >
                Edit
              </Button>
            </>
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export default Profile;


