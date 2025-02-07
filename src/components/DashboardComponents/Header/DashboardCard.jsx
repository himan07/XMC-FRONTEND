import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import currencyIcon from "../../../assets/images/CurrencyCircleDollar.svg";
import Sealcheck from "../../../assets/images/SealCheck.svg";

const DashboardCard = ({ balance, studiesCompleted, handleClick }) => {
  
  return (
    <Grid container spacing={2} sx={{ marginBottom: 1 }}>
      <Grid item xs={12} md={6} sx={{ cursor: "pointer" }}>
        <Card
          sx={{ border: "1px solid e0e0e0", borderRadius: 2, pt: 0.5 }}
          onClick={handleClick}
        >
          <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mt: 1 }}>
              <Typography variant="h4">{balance}</Typography>
              <Typography variant="body1">Current Balance</Typography>
            </Box>
            <img src={currencyIcon} alt="Currency Icon" />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card
          sx={{
            boxShadow: 0.5,
            border: "1px solid e0e0e0",
            borderRadius: 2,
            pt: 0.5,
          }}
        >
          <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {studiesCompleted}
              </Typography>
              <Typography variant="body1">Studies Completed</Typography>
            </Box>
            <img src={Sealcheck} alt="Seal Check Icon" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCard;
