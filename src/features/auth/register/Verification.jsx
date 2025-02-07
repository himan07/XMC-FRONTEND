import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import InputField from "../../../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
import { verifyMobileOtp } from "../../../utils/verifyMobileOtp";
import { handleOtpSend } from "../../../utils/RegisterFn";

const Verification = ({ setActiveStep }) => {
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const userData = JSON.parse(localStorage.getItem("Data"));
  const countryCode = localStorage.getItem("countryCode");

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    navigate(-1);
  };
  const handleVerify = async (data) => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      // if (mobileVerification?.data !== 101) {
      //   showSnackbar(
      //     mobileVerification?.data?.message || "Invalid OTP",
      //     "error"
      //   );
      //   return;
      // }

      const personalInfo = {
        email: userData.email,
        mobileNumber: `+${countryCode.replace(
          /\D/g,
          ""
        )}${userData.mobile.replace(/\D/g, "")}`,
        name: `${userData.firstName} ${userData.lastName}`,
        gender: userData.gender,
        zipcode: Number(userData.zipcode),
        dateOfBirth: userData.dateOfBirth,
        profession: userData.professions,
        privacyPolicy: userData.termsAgreement,
        userVerificationStatus: {
          approve: false,
          reject: false,
          message: "",
        },
      };

      const response = await axios.post(
        "https://xmc-backend-1.onrender.com/create-personalInfo",
        personalInfo
      );

      if (response.status === 201) {
        await signUp.attemptEmailAddressVerification({
          code: data.emailOtp,
        });

        showSnackbar(
          "Your mobile number and email address have been successfully verified. Thank you!",
          "success"
        );
        setActiveStep((prevStep) => prevStep + 1);
        navigate("/register/professional-details");
      }
    } catch (err) {
      showSnackbar(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
      localStorage.setItem("isRegistration", false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    try {
      const userEmail = sessionStorage.getItem("userEmail");
      if (signUp.status === "missing_requirements") {
        const userData = JSON.parse(localStorage.getItem("Data"));
        await signUp.create({
          emailAddress: userEmail || userData.email,
          password: userData.password,
        });
      }

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      await handleOtpSend(userData.mobile);
      showSnackbar(
        "An OTP has been successfully sent to your registered mobile number and email address. Please check and proceed with verification.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error resending verification email:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: {
          xs: "20px 10px",
          sm: "25px 15px",
          md: "30px 20px",
        },
      }}
    >
      <form onSubmit={handleSubmit(handleVerify)} style={{ width: "100%" }}>
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5, md: 3 },
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            margin: "auto",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            We've sent an OTP to your email ({userData.email}) and phone (
            {userData.mobile}). please enter the OTP below to verify your
            account.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" sx={{ fontSize: "15px" }}>
              <a
                href=""
                className="terms-text"
                onClick={(e) => handleResendVerification(e)}
              >
                Didn't receive the code? Resend
              </a>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            <InputField
              placeholder="Email OTP"
              register={{
                ...register("emailOtp", {
                  required: "Email Otp is required",
                }),
              }}
              errors={errors.emailOtp}
            />
            <InputField
              placeholder="Phone OTP"
              register={{
                ...register("phoneOtp", {
                  required: "Phone Otp is required",
                }),
              }}
              errors={errors.phoneOtp}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000000",
                  textTransform: "capitalize",
                }}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "rgba(46, 104, 174, 1)",
                  textTransform: "capitalize",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Verify"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            marginTop: "40px",
            maxWidth: "500px",
            width: "400px",
            mr: -3,
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: "100%",
              "& .MuiAlert-action": {
                alignItems: "right",
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
    </Grid>
  );
};

export default Verification;
