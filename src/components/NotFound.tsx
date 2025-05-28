import { Button, Heading, Text } from "@radix-ui/themes";
import React from "react";


const NotFoundComp: React.FC = () => {

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Heading size="9">404</Heading>
      <Heading size="7" mt="4">
        Page Not Found
      </Heading>
      <Text as="p" size="3" mt="4">
        Sorry, the page you’re looking for does not exist in the Nik Lang package manager registry
      </Text>
      <Button
        variant="solid"
        size="2"
        style={{ marginTop: 20 }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </>
  );
};

export default NotFoundComp;
