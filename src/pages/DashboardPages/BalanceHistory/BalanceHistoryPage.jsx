import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import InputField from "../../../components/InputField/InputField";
import axios from "axios";

const BalanceHistory = ({
  completeSurveys = [],
  finalBalance,
  getRedemptionData,
  userData,
  getDashboardBalance,
}) => {
  const [rewardAmount, setRewardAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const countryCode = localStorage.getItem("countryCode");
  const [redeem, setRedeem] = useState(false);

  const commonCardStyles = {
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    margin: `${theme.spacing(2)} 0`,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
  };

  const handleRewardAmount = (e) => setRewardAmount(e.target.value);

  const handleUpiId = (e) => setUpiId(e.target.value);

  const redeemBody = {
    country:
      countryCode === "+91"
        ? "India"
        : countryCode === "+1"
        ? "United States"
        : "Other",
    requestedAmount: rewardAmount,
    upiId: upiId,
    userId: userData?.data?.uuid,
    redemptionStatus: {
      approve: false,
      reject: false,
    },
  };

  const RedeemAmount = async () => {
    try {
      const response = await axios.post(
        "https://xmc-backend-1.onrender.com/api/user/redemption",
        redeemBody,
        {
          headers: {
            uuid: userData?.data?.uuid,
          },
        }
      );
      if (response.status === 201) {
        getRedemptionData();
        setRedeem(false);
        if (typeof getDashboardBalance === "function") {
          getDashboardBalance();
        }
      }
    } catch (error) {
      console.error(
        "Error redeeming amount:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: theme.breakpoints.values.md,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            ...commonCardStyles,
            marginBottom: theme.spacing(4),
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {countryCode === "+91"
                ? `₹ ${finalBalance || 0}`
                : countryCode === "+1"
                ? `$ ${finalBalance || 0}`
                : "NA 0"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Balance
            </Typography>

            <Button
              variant="contained"
              style={{
                marginTop: 10,
                textTransform: "none",
                backgroundColor:
                  finalBalance <= 0 ? "#ddd" : "rgba(46, 104, 174, 1)",
                borderRadius: "8px",
              }}
              size="medium"
              disabled={finalBalance <= 0}
              onClick={() => setRedeem(true)}
            >
              Redeem now
            </Button>
          </Box>
        </Card>

        <Typography
          variant="h4"
          sx={{
            fontWeight: theme.typography.fontWeightBold,
            width: "100%",
            textAlign: "left",
            marginBottom: theme.spacing(2),
          }}
        >
          Transaction History
        </Typography>

        <Card sx={commonCardStyles}>
          {completeSurveys.length > 0 ? (
            completeSurveys.map((survey, index) => (
              <Box key={index}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: isSmallScreen ? "flex-start" : "center",
                    padding: theme.spacing(1),
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      {survey.requestedAmount
                        ? `You redeemed on ${survey.requestDate || "N/A"}`
                        : survey.project_name || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {survey.requestedAmount
                        ? ""
                        : `Completed on: ${survey.updated_at || "N/A"}`}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                      flexDirection: isSmallScreen ? "column" : "row",
                    }}
                  >
                    <Chip
                      label={
                        survey.surveyApprovalStatus?.approve
                          ? "Approved"
                          : survey.redemptionStatus?.reject
                          ? "Rejected"
                          : survey.redemptionStatus?.approve
                          ? "Processed"
                          : "Processing"
                      }
                      size="small"
                      color={
                        survey.surveyApprovalStatus?.approve
                          ? "success"
                          : survey.redemptionStatus?.reject
                          ? "error"
                          : survey.redemptionStatus?.approve
                          ? "error"
                          : "default"
                      }
                      sx={{
                        marginRight: isSmallScreen ? 0 : theme.spacing(1),
                        marginBottom: isSmallScreen ? theme.spacing(1) : 0,
                        p: 0.3,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color={
                        survey.surveyApprovalStatus?.approve
                          ? "rgba(0, 180, 3, 1)"
                          : survey.redemptionStatus?.reject
                          ? "error"
                          : survey.redemptionStatus?.approve
                          ? "error"
                          : "text.secondary"
                      }
                    >
                      {survey.requestedAmount && countryCode === "+91"
                        ? `-₹${survey.requestedAmount}`
                        : survey.requestedAmount && countryCode === "+1"
                        ? `-$${survey.requestedAmount}`
                        : survey.cpi
                        ? countryCode === "+1"
                          ? `+$${survey.cpi}`
                          : `+₹${(85.85 * survey.cpi).toFixed(2)}`
                        : "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
                {index !== completeSurveys.length - 1 && (
                  <Divider sx={{ marginY: theme.spacing(1) }} />
                )}
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              Dear User, we noticed that you haven't completed any surveys yet.
              To start earning rewards, we encourage you to complete some
              surveys. Your participation is valuable, and rewards will be
              granted upon completion. Thank you!
            </Typography>
          )}
        </Card>
      </Box>
      <Dialog
        open={redeem}
        onClose={() => setRedeem(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent sx={{ pt: 4 }}>
          <InputField
            placeholder="Amount to redeem"
            onChange={handleRewardAmount}
          />
          <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5 }}>
            Balance:{" "}
            {countryCode === "+91"
              ? `₹ ${finalBalance || 0}`
              : countryCode === "+1"
              ? `$ ${finalBalance || 0}`
              : "NA 0"}
          </Typography>
          <InputField placeholder="UPI ID/Paypal ID" onChange={handleUpiId} />
          <Button
            variant="contained"
            style={{
              marginTop: 30,
              textTransform: "none",
              backgroundColor: "rgba(46, 104, 174, 1)",
              borderRadius: "8px",
              padding: 8,
            }}
            fullWidth
            onClick={RedeemAmount}
          >
            Redeem
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BalanceHistory;
