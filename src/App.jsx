import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterRoutes, AuthRoutes } from "./routes/routes";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "@clerk/clerk-react";

const AppContent = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const activeStep = localStorage.getItem("activeStep");
  const [backgroundColor, setBackgroundColor] = useState(
    "radial-gradient(circle at 50% 50%, #a4c8ee 0%, #d9eaef 100%)"
  );

  useEffect(() => {
    if (isLoaded) {
      const newBackgroundColor =
        isSignedIn && !activeStep
          ? "rgba(226, 226, 226, 1)"
          : "radial-gradient(circle at 50% 50%, #a4c8ee 0%, #d9eaef 100%)";

      setBackgroundColor(newBackgroundColor);
      document.body.style.backgroundColor = newBackgroundColor;
    }
  }, [isSignedIn, isLoaded]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: backgroundColor,
      }}
    >
      <Navbar />
      <Routes>
        {RegisterRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {AuthRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
