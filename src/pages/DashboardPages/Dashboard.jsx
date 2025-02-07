import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import DashboardCard from "../../components/DashboardComponents/Header/DashboardCard";
import UserVerificationCard from "../../components/DashboardComponents/UserVerificationCard/UserVerificationCard";
import TopicCard from "../../components/DashboardComponents/TopicCard";
import BalanceHistory from "./BalanceHistory/BalanceHistoryPage";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://xmc-backend-1.onrender.com",
  timeout: 10000,
});

const POLL_INTERVAL = 60000;
const EXCHANGE_RATE = 85.85;

const Dashboard = () => {
  const [state, setState] = useState({
    topics: [],
    userData: null,
    countryCode: "",
    completeSurveys: [],
    loading: true,
    error: null,
    showBalanceHistory: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const jwtToken = Cookies.get("__session");
  const email = sessionStorage.getItem("userEmail");

  const showNotification = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await api.get("/getUsers", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Email: email,
        },
      });

      const mobileNumber = data?.data?.mobileNumber;
      const countryCode = `+${String(mobileNumber).slice(0, -10)}`;

      setState((prev) => ({
        ...prev,
        userData: data,
        countryCode,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user data";
      showNotification(errorMessage, "error");
      throw new Error(errorMessage);
    }
  }, [jwtToken, email, showNotification]);

  const fetchSupplierData = useCallback(
    async (uuid, countryCode) => {
      try {
        const { data } = await axios.get(
          "/marketxcel/webservices/supplier/send_supplier_data",
          {
            headers: {
              SupplierId: "ff6a9e1fd6608945d4e4dca7ded50e85",
              Token: "Bearer 06c4e3995dafe6d7fd4afafa4ea2384d",
              uid: uuid,
            },
          }
        );

        const filteredData = data?.Data?.filter(
          (item) =>
            (countryCode === "+91" && item.country === "India") ||
            (countryCode === "+1" && item.country === "United States")
        );

        const formattedData = filteredData?.reduce(
          (acc, item) => ({
            ...acc,
            [item.project_code]: {
              project_name: item.project_name,
              country: item.country,
              cpi: item.cpi,
              project_loi: item.project_loi,
              live_url: item.live_url,
              project_code: item.project_code,
              uuid,
              survey_status: "",
              surveyApprovalStatus: {
                approve: false,
                reject: false,
                message: "",
              },
            },
          }),
          {}
        );

        await api.put(
          "/update/surveys",
          { surveys: formattedData },
          { headers: { uid: uuid } }
        );

        return formattedData;
      } catch (error) {
        showNotification("Failed to fetch or process surveys", "error");
        throw error;
      }
    },
    [showNotification]
  );

  const getSupplierData = useCallback(
    async (uuid) => {
      try {
        const { data } = await api.get("/supplier/getSupplier", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            uuid,
          },
        });

        const surveysData = data?.data?.surveys || {};

        const uniqueSurveys = [
          ...new Set(
            Object.values(surveysData)
              .filter((survey) => survey.survey_status === "")
              .map(JSON.stringify)
          ),
        ].map(JSON.parse);

        const uniqueCompleteSurveys = [
          ...new Set(
            Object.values(surveysData)
              .filter((survey) => survey.survey_status === "complete-redirect")
              .map(JSON.stringify)
          ),
        ].map(JSON.parse);

        setState((prev) => ({
          ...prev,
          topics: uniqueSurveys,
          completeSurveys: uniqueCompleteSurveys,
        }));

        return uniqueCompleteSurveys;
      } catch (error) {
        showNotification("Failed to fetch supplier data", "error");
        throw error;
      }
    },
    [jwtToken, showNotification]
  );

  const getRedemptionData = useCallback(
    async (uuid, currentBalanceHistory = []) => {
      try {
        const response = await api.get("/api/user/getRedemptionData", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            uuid,
          },
        });

        const redemptionData = response?.data?.data || [];

        const validCurrentHistory = Array.isArray(currentBalanceHistory)
          ? currentBalanceHistory
          : [];
        const validRedemptionData = Array.isArray(redemptionData)
          ? redemptionData
          : [];

        const combinedData = [...validCurrentHistory, ...validRedemptionData];

        setState((prev) => ({
          ...prev,
          completeSurveys: combinedData,
        }));

        return combinedData;
      } catch (error) {
        console.error("Redemption Data Error:", error);
        showNotification(
          "Failed to fetch redemption data: " +
            (error.response?.data?.message || error.message),
          "error"
        );
        return [];
      }
    },
    [jwtToken, showNotification]
  );

  useEffect(() => {
    const initializeDashboard = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const userData = await getUsers();
        const uuid = userData?.data?.uuid;
        const countryCode = `+${String(userData?.data?.mobileNumber).slice(0, -10)}`;

        if (!uuid) {
          throw new Error("User ID not found");
        }

        await fetchSupplierData(uuid, countryCode);
        const completeSurveys = await getSupplierData(uuid);
        await getRedemptionData(uuid, completeSurveys);
        setState((prev) => ({ ...prev, loading: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message || "Failed to initialize dashboard",
        }));
      }
    };

    initializeDashboard();
  }, [getUsers, fetchSupplierData, getSupplierData, getRedemptionData]);

  useEffect(() => {
    let pollInterval;

    const pollData = async () => {
      try {
        const uuid = state.userData?.data?.uuid;
        if (uuid) {
          await fetchSupplierData(uuid, state.countryCode);
          await getSupplierData(uuid);
          await getRedemptionData(uuid);
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    };

    if (!state.loading && state.userData) {
      pollInterval = setInterval(pollData, POLL_INTERVAL);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [
    state.userData,
    state.countryCode,
    fetchSupplierData,
    getSupplierData,
    getRedemptionData,
  ]);

  const dashboardBalance = useMemo(() => {
    return state.completeSurveys.reduce(
      (acc, data) => {
        if (data.surveyApprovalStatus?.approve) {
          const completedAmount = parseFloat(data.cpi) * EXCHANGE_RATE || 0;
          acc.completedSurvey += completedAmount;
        }
        if (data.redemptionStatus?.approve) {
          acc.approveRedemption += parseFloat(data.requestedAmount) || 0;
        }
        return acc;
      },
      { completedSurvey: 0, approveRedemption: 0 }
    );
  }, [state.completeSurveys]);

  if (state.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (state.error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{state.error}</Alert>
      </Box>
    );
  }

  if (state.showBalanceHistory) {
    return (
      <BalanceHistory
        completeSurveys={state.completeSurveys}
        finalBalance={
          dashboardBalance.completedSurvey - dashboardBalance.approveRedemption
        }
        getRedemptionData={getRedemptionData}
        userData={state.userData}
        getDashboardBalance={() => dashboardBalance}
      />
    );
  }

  const completedSurveyCount = state.completeSurveys.filter(
    (item) => item.surveyApprovalStatus?.approve
  ).length;

  const finalBalance =
    dashboardBalance.completedSurvey - dashboardBalance.approveRedemption;

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 5, md: 6 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography variant="h4">
          Hello, {state.userData?.data?.name || "Guest"}!
        </Typography>

        <UserVerificationCard userData={state.userData} />

        <Grid
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "flex-start", marginLeft: 0 }}
        >
          <DashboardCard
            balance={
              state.countryCode === "+91"
                ? `₹ ${finalBalance}`
                : `$ ${finalBalance}`
            }
            studiesCompleted={completedSurveyCount}
            handleClick={() =>
              setState((prev) => ({ ...prev, showBalanceHistory: true }))
            }
          />
        </Grid>

        <Typography
          variant="h5"
          sx={{ color: "rgba(0, 0, 0, 1)", fontWeight: 500, mt: 1 }}
        >
          Surveys for you
        </Typography>

        <Grid container spacing={2}>
          {state.topics.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                width: "100%",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No surveys available at the moment
              </Typography>
            </Box>
          ) : (
            state.topics.map((topic) => (
              <TopicCard
                key={topic.project_code}
                topic={topic}
                userData={state.userData}
                setTopics={(newTopics) =>
                  setState((prev) => ({ ...prev, topics: newTopics }))
                }
                project_code={topic.project_code}
                updateSurvey={async (project_code) => {
                  try {
                    const surveyStatus = localStorage.getItem("surveyStatus");
                    if (!surveyStatus)
                      throw new Error("Survey status is missing");

                    await api.put(
                      "/api/update-survey",
                      { survey_status: surveyStatus },
                      {
                        headers: {
                          project_code,
                          uuid: state.userData.data.uuid,
                        },
                      }
                    );

                    await getSupplierData(state.userData.data.uuid);
                    showNotification("Survey updated successfully", "success");
                  } catch (error) {
                    showNotification(error.message, "error");
                  }
                }}
              />
            ))
          )}
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%", mt: 5 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
