import React from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";
import warningIcon from "../../../assets/images/ShieldWarning.svg";

const UserVerificationCard = ({ userData }) => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        boxShadow: 1,
        display:
          userData?.data?.userVerificationStatus.approve === true ||
          userData?.data?.userVerificationStatus.reject === true
            ? "none"
            : "block",
      }}
    >
      <Alert
        severity="warning"
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255, 246, 213, 1)",
          color: "#ffa726",
          marginBottom: "16px",
          padding: "0px 16px",
          width: "200px",
        }}
        icon={<img src={warningIcon} alt="imsge is not found" />}
      >
        <AlertTitle
          sx={{
            color: "rgba(16, 16, 16, 1)",
            mt: 0.7,
          }}
        >
          Verification Pending
        </AlertTitle>
      </Alert>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "8px",
          color: "rgba(0, 0, 0, 1)",
        }}
      >
        Your credentials are being verified
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(0, 0, 0, 1)",
        }}
      >
        We're reviewing your credentials to ensure a secure and trusted platform
        for all doctors. This usually takes 48 hours. Once verified, you'll
        unlock surveys tailored to your expertise and start earning rewards.
      </Typography>
    </Box>
  );
};

export default UserVerificationCard;
