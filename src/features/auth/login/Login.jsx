import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import logo from "../../../assets/images/XcelMed1.png";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const jwtToken = Cookies.get("__session");
  const navigate = useNavigate();

  const { signIn, isLoaded, setActive } = useSignIn();
  const { signOut } = useAuth();

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

  const handleResendOtpSend = async () => {
    setResetLoading(true);

    setTimeout(async () => {
      try {
        await signIn?.create({
          strategy: "reset_password_email_code",
          identifier: resetEmail,
        });
        showSnackbar(
          "OTP sent successfully. Please check your email.",
          "success"
        );
        setStep(2);
      } catch (err) {
        console.error("error", err.errors[0].longMessage);
        showSnackbar("Error sending OTP. Please try again.", "error");
      } finally {
        setResetLoading(false);
      }
    }, 500);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email.trim() || !password.trim()) {
        showSnackbar("Email and password are required", "error");
        return;
      }
      setLoading(true);

      try {
        const result = await signIn?.create({
          identifier: email,
          password,
        });

        showSnackbar("Successfully logged in!", "success");
        if (result?.status === "complete" && result.createdSessionId) {
          await setActive?.({ session: result.createdSessionId });
          await axios
            .get("https://xmc-backend-1.onrender.com/getUsers", {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                Email: email,
              },
            })
            .then((res) => {
              localStorage.setItem("profession", res.data.data.profession);
              if (res.status === 200) {
                navigate("/dashboard");
              }
            });
        }
      } catch (error) {
        console.error("Error signing in:", error);
        showSnackbar(
          error.errors?.[0]?.message || "An error occurred during sign in",
          "error"
        );
      } finally {
        setLoading(false);
        sessionStorage.setItem("userEmail", email);
      }
    },
    [email, password, navigate, setActive, signIn, showSnackbar]
  );

  const handleVerifyOtp = async () => {
    setResetLoading(true);

    try {
      await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: otp,
        password: newPassword,
      });

      await signOut();
      showSnackbar("Password reset successfully.", "success");
      setOpenDialog(false);
    } catch (err) {
      console.error("error", err);
      showSnackbar("Error verifying OTP. Please try again.", "error");
    } finally {
      setResetLoading(false);
    }
  };

  if (!isLoaded) {
    return <CircularProgress style={{ display: "block", margin: "auto" }} />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      minHeight="85vh"
      width="80%"
      margin="auto"
    >
      <Box display="flex" width="100%" height="80%" boxShadow={3}>
        <Box
          width="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#02003d"
        >
          <img
            src={logo}
            alt="XcelMed Logo"
            style={{
              height: "70%",
              width: "80%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Card sx={{ boxShadow: 0, padding: 2, width: "50%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Log Into Your Account
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              mt={2}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Email"
                size="large"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 2,
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#02003d",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#02003d",
                  },
                }}
              />

              <TextField
                label="Password"
                size="large"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#02003d",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#02003d",
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 6, p: 1.5 }}
                style={{ backgroundColor: "#02003d" }}
                size="large"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>

              <Typography
                variant="body1"
                sx={{
                  color: "blue",
                  p: 3,
                  mt: 2,
                  textAlign: "center",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
                onClick={() => setOpenDialog(true)}
              >
                <span
                  style={{ textDecoration: "underline", textAlign: "center" }}
                >
                  Reset your password.
                </span>
              </Typography>

              <NavLink
                to="/register/personal-details"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "blue",
                    p: 3,
                    mt: -5,
                    textAlign: "center",
                    fontSize: "17px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ color: "black" }}>Don't have an account?</span>{" "}
                  <span style={{ textDecoration: "underline" }}>
                    Click here to create your account.
                  </span>
                </Typography>
              </NavLink>
            </Box>
          </CardContent>
        </Card>
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
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            "& .MuiAlert-action": {
              alignItems: "center",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            {step === 1 && (
              <>
                <TextField
                  label="Email"
                  size="large"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2, p: 1.5 }}
                  style={{ backgroundColor: "#02003d" }}
                  size="large"
                  onClick={handleResendOtpSend}
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <CircularProgress size={24} style={{ color: "#fff" }} />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  label="Enter OTP"
                  size="large"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <TextField
                  label="New Password"
                  size="large"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2, p: 1.5 }}
                  style={{ backgroundColor: "#02003d" }}
                  size="large"
                  onClick={handleVerifyOtp}
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <CircularProgress size={24} style={{ color: "#fff" }} />
                  ) : (
                    "Verify OTP and Reset Password"
                  )}
                </Button>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(false)}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Login;
