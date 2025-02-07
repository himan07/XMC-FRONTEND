import React from "react";
import { Box, Typography, CircularProgress, Grid, Container, Card } from "@mui/material";

const UserProfileProgress = () => {
  const progress = 25;

  return (
    <Container sx={{mt:5}}>
      <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
        Your Profile
      </Typography>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: 1,
          mb:4, 
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            marginRight: 2,
          }}
        >
          <CircularProgress
              variant="determinate"
              value={progress}
              size={80}
              thickness={3}
              sx={{
                color: "rgba(46, 104, 174, 1)",
                backgroundColor: "#e0e0e0",
                borderRadius: "50%",
              }}
            />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
              {progress}%
            </Typography>
          </Box>
        </Box>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              Profile completeness
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" sx={{fontSize:"1rem"}}>
              Answer more profile questions to increase your chances of being chosen for studies.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default UserProfileProgress;
