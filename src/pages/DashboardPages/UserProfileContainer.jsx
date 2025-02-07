import React from "react";
import USerProfileDetails from "./USerProfile/USerProfileDetails";
import UserProfileProgress from "./USerProfile/UserProfileProgress";
import { Box, Container } from "@mui/material";

const UserProfileContainer = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "90vh",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <UserProfileProgress />
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <USerProfileDetails />
      </Box>
    </Container>
  );
};

export default UserProfileContainer;
