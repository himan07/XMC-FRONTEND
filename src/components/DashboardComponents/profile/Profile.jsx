import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Button,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileContainer = ({ progress, question, questionsRemaining }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate()
  
  let questionss = "How many patients do you see on average every day ? "

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted answer:", selectedOption);
  };

  const handleSkip = () => {
    console.log("Question skipped");
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        mb: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
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
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                color="textPrimary"
                fontWeight="bold"
              >
                {progress}%
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" fontWeight="bold">
            Profile completeness
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Answer more profile questions to increase your chances of being
            chosen for studies.
          </Typography>
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              color: "rgba(46, 104, 174, 1)",
              fontWeight: "bold",
            }}
            onClick={()=>navigate('/profile')}
          >
            Complete Profile
          </Button>
        </Grid>
      </Grid>
      <Box
  sx={{
    backgroundColor: "#f9f9f9 !important",
    p: 2,
    borderRadius: 3,
  }}
>
  <Typography
    variant="subtitle2"
    color="textSecondary"
    sx={{ mb: 3, ml:1 }}
  >
    {questionsRemaining} 12 questions remaining
  </Typography>
  <Typography variant="body1" fontWeight="bold" sx={{ ml:2,textAlign: "left" }}>
    {questionss}
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
      backgroundColor: "#f9f9f9 !important",
      p: 2,
      borderRadius: 2,

    }}
  >
    <Box
      sx={{
        flexGrow: 1,
        minWidth: 300,
      }}
    >
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          height: "45px",
        }}
      >
        <MenuItem value="" disabled>
          Select...
        </MenuItem>
        <MenuItem value="1-10">1-10</MenuItem>
        <MenuItem value="11-20">11-20</MenuItem>
        <MenuItem value="21-30">21-30</MenuItem>
        <MenuItem value="31+">31+</MenuItem>
      </Select>
    </Box>

    <Box
      sx={{
        width: "10%", 
        minWidth: "100px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "rgba(46, 104, 174, 1)",
          textTransform: "none",
          height: "45px",
          width: "100%",
        }}
      >
        Submit
      </Button>
    </Box>

    <Box
      sx={{
        width: "10%",
        minWidth: "100px",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleSkip}
        sx={{
          textTransform: "none",
          height: "45px",
          width: "100%",
        }}
      >
        Skip
      </Button>
    </Box>
  </Box>
</Box>

    </Card>
  );
};

export default ProfileContainer;
