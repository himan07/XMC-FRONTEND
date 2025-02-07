import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYouPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e0f2ff, #b3d9ff)",
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          maxWidth: 400,
          boxShadow: 4,
          p: 3,
          textAlign: "center",
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 60,
            color: "green",
            mb: 2,
          }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Thank you for your interest in joining XMC!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Right now, we're focusing on onboarding doctors. We're constantly
            growing and will let you know as soon as we begin onboarding
            professionals from your field. Stay tuned!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThankYouPage;
