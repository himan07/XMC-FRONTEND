import React, { useRef } from "react";
import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import Clock from "../../assets/images/Clock.svg";
import { useNavigate } from "react-router-dom";

const TopicCard = ({ topic, userData, updateSurvey }) => {
  const { project_name, cpi, project_loi, live_url } = topic;
  const windowRef = useRef(null);
  const navigate = useNavigate();

  const mobileNumber = userData.data?.mobileNumber;
  const countryCode = mobileNumber
    ? `+${String(mobileNumber).slice(0, -10)}`
    : "";

  const surveyUrl = live_url.includes("[identifier]")
    ? live_url.replace("[identifier]", userData.data.uuid)
    : `${live_url}&uid=${userData.data.uuid}`;

  const handleOpenSurvey = (event) => {
    event.preventDefault();
    windowRef.current = window.open(surveyUrl, "__blank");

    const surveyStatusChecker = setInterval(() => {
      try {
        if (windowRef.current.closed) {
          clearInterval(surveyStatusChecker);
          return;
        }
        const pathSegments = windowRef.current?.location?.pathname.split("/");
        const surveyStatus = pathSegments[2];

        if (surveyStatus) {
          localStorage.setItem("surveyStatus", surveyStatus);
          updateSurvey(topic.project_code);
          clearInterval(surveyStatusChecker);
          if (surveyStatus === "quality-redirect") {
            navigate("/dashboard/quality-redirect");
          } else if (surveyStatus === "complete-redirect") {
            let clickedTopics =
              JSON.parse(localStorage.getItem("clickedTopics")) || [];
            clickedTopics.push(topic);
            localStorage.setItem(
              "clickedTopics",
              JSON.stringify(clickedTopics)
            );
            console.log("Updated clickedTopics:", clickedTopics);
            navigate("/dashboard/complete-redirect");
          } else if (surveyStatus === "term-redirect") {
            navigate("/dashboard/term-redirect");
          } else if (surveyStatus === "oq-redirect") {
            navigate("/dashboard/oq-redirect");
          } else if (surveyStatus === "close-redirect") {
            navigate("/dashboard/close-redirect");
          }

          setTimeout(() => {
            handleCloseSurveyWindow();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    window.onfocus = () => {
      if (!windowRef.current || windowRef.current.closed) {
        navigate("/dashboard");
        window.onfocus = null;
      }
    };
  };

  const handleCloseSurveyWindow = () => {
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.close();
    }
  };

  const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const isSurveyRemoved = () => {
    const removedSurveys =
      JSON.parse(localStorage.getItem("removedSurveys")) || [];
    return removedSurveys.includes(topic.project_code);
  };

  if (isSurveyRemoved()) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "2fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(auto-fit, minmax(350px, 1fr))",
        },
        gap: 1,
        padding: 2,
      }}
    >
      <Card
        component="a"
        href={surveyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleOpenSurvey}
        sx={{
          border: "1px solid #ddd",
          borderRadius: 3,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease-in-out",
          textDecoration: "none",
          "&:hover": {
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent sx={{ padding: 3 }}>
          <Tooltip title={project_name || "No Project Name"} arrow>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 1.5,
                fontWeight: 600,
                color: "#333",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {truncateWords(project_name || "No Project Name", 3)}
            </Typography>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#ECF7FF",
                padding: "8px 12px",
                borderRadius: 2,
                color: "#39608F",
                minWidth: "45%",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {countryCode === "+1"
                ? `$${cpi}`
                : countryCode === "+91"
                ? `₹${(85.94 * cpi).toFixed(2)}`
                : "N/A"}{" "}
              <span style={{ fontSize: "14px", fontWeight: 400 }}>Reward</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={Clock} alt="Time Icon" height="22px" />
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", color: "#555" }}
              >
                {project_loi || "N/A"} mins
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopicCard;
