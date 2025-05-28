import React from "react";
import { NavBar } from "../components/NavBar";
import { Box } from "@radix-ui/themes";
import NotFoundComp from "../components/NotFound";


export const NotFound: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <NotFoundComp />

    </Box>
  )
};

export default NotFound;
