import React, { useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth, useClerk } from "@clerk/clerk-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeStep = localStorage.getItem("activeStep");

  const display =
    location.pathname === "/register/personal-details"
      ? "none"
      : location.pathname === "/register/verification"
        ? "none"
        : location.pathname === "/register/professional-details"
          ? "none"
          : "block";

  const login = location.pathname === "/login" ? "none" : "block";

  const { isLoaded, isSignedIn } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearBrowserData = useCallback(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};SameSite=Strict`;
      });
      console.log("Browser data cleared successfully.");
      return true;
    } catch (error) {
      console.error("Error clearing browser data:", error);
      return false;
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setIsLoggingOut(true);
      await signOut({
        sessionId: "*",
      });

      const isDataCleared = clearBrowserData();
      if (!isDataCleared) {
        throw new Error("Failed to clear browser data");
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoggingOut(false);
      handleClose();
    }
  };

  const handleRedirectToSignup = () => {
    navigate("/register/personal-details");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "rgba(42, 106, 157, 1)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            XCEL MED CONNECT
          </Typography>

          {isLoaded && !isSignedIn && (
            <IconButton
              color="primary"
              sx={{
                cursor: "pointer",
                color: "rgba(57, 96, 143, 1)",
                fontSize: "1rem",
                display: display,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "none !important",
                },
              }}
              onClick={handleRedirectToSignup}
            >
              SignUp
            </IconButton>
          )}

          <Box>
            {isLoaded && isSignedIn && !activeStep ? (
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickOpen}
              >
                <AccountCircleIcon
                  style={{ color: "rgba(42, 106, 157, 1)", fontSize: "2rem" }}
                />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                sx={{
                  cursor: "pointer",
                  color: "rgba(57, 96, 143, 1)",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  display: login,
                  "&:hover": {
                    backgroundColor: "none !important",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </IconButton>
            )}
          </Box>
        </Toolbar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            sx: {
              width: "180px",
              borderRadius: "8px",
              mt: 1.5,
            },
          }}
        >
          {/* <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            Profile
          </MenuItem> */}
          {/* <MenuItem
            onClick={() => {
              handleClose();
              navigate("/account-settings");
            }}
          >
            Account Settings
          </MenuItem> */}
          <MenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{
              display: "flex",
              gap: 1,
              "&.Mui-disabled": {
                opacity: 0.7,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              Logout
              {isLoggingOut && (
                <CircularProgress size={20} thickness={5} sx={{ ml: "auto" }} />
              )}
            </Box>
          </MenuItem>
        </Menu>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
