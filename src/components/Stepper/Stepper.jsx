import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

const Steps = ({ steps, activeStep }) => {
  return (
    <Box mt={2}>
      <Stepper activeStep={activeStep} alternativeLabel>

        {steps.map((label, index) => (
          
          <Step key={index}>
            <StepLabel
              style={{
                color: activeStep === index ? "#000000" : "grey", 
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steps;
