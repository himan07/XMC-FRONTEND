// import { useAuth } from "@clerk/clerk-react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isLoaded, isSignedIn } = useAuth();
//   const activeStep = localStorage.getItem("activeStep");
//   const profession = localStorage.getItem("profession");

//   if (activeStep === "2") {
//     return <Navigate to="/register/professional-details" replace />;
//   }

//   if (!isLoaded) {
//     return null;
//   }

//   if (!isSignedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   if (location.pathname === "/dashboard/thank-you") {
//     return children;
//   }

//   if (profession && profession !== "Doctor/HCP") {
//     return <Navigate to="/dashboard/thank-you" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;

import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [activeStep, setActiveStep] = useState(localStorage.getItem("activeStep"));
  const [profession, setProfession] = useState(localStorage.getItem("profession"));

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveStep(localStorage.getItem("activeStep"));
      setProfession(localStorage.getItem("profession"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (activeStep === "2") {
    return <Navigate to="/register/professional-details" replace />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === "/dashboard/thank-you") {
    return children;
  }

  if (profession && profession !== "Doctor/HCP") {
    return <Navigate to="/dashboard/thank-you" replace />;
  }

  return children;
};

export default ProtectedRoute;
