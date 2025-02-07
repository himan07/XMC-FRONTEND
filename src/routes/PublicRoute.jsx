// import { useAuth } from "@clerk/clerk-react";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const { isLoaded, isSignedIn } = useAuth();
//   const activeStep = localStorage.getItem("activeStep");

//   if (!isLoaded) {
//     return null;
//   }

//   if (activeStep === "2") {
//     return children;
//   }

//   if (isSignedIn) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (isSignedIn !== undefined) {
//     return children;
//   }
// };

// export default PublicRoute;

import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [activeStep, setActiveStep] = useState(localStorage.getItem("activeStep"));

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveStep(localStorage.getItem("activeStep"));
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
    return children;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;

