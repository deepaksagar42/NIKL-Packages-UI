import { Box, Button, Heading, Text } from "@radix-ui/themes";
import React from "react";


const NotFound: React.FC = () => {

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <Box>
      <Heading size="9">404</Heading>
      <Heading size="7" style={{ marginTop: 10 }}>
        Page Not Found
      </Heading>
      <Text as="p" size="3">
        Sorry, the page you’re looking for does not exist in the Nik Lang package manager registry.
      </Text>
      <Button
        variant="solid"
        size="2"
        style={{ marginTop: 20 }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
