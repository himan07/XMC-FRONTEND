import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import PersonalDetails from "../features/auth/register/PersonalDetailPage";
import Verification from "../features/auth/register/Verification";
import ProfessionalDetails from "../features/auth/register/ProfessionalDetails";
import Dashboard from "../pages/DashboardPages/Dashboard";
import Login from "../features/auth/login/Login";
import LandingPage from "../pages/landingPage/LandingPage";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import UserProfileContainer from "../pages/DashboardPages/UserProfileContainer";
import BalanceHistory from "../pages/DashboardPages/BalanceHistory/BalanceHistoryPage";
import SuccessPage from "../pages/RedirectionPages/CompleteRedirectPage";
import TerminationPage from "../pages/RedirectionPages/TermRedirectPage";
import OverQuotaPage from "../pages/RedirectionPages/OverQuotaRedirectPage";
import QualityRedirectPage from "../pages/RedirectionPages/QualityRedirectPage";
import SurvetCloseRedirectPage from "../pages/RedirectionPages/SurvetCloseRedirectPage";
import ThankYouPage from "../components/ThankYouPage/ThankYou";

export const RegisterRoutes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register/personal-details",
    element: (
      <PublicRoute>
        <AuthLayout>
          <PersonalDetails />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/register/verification",
    element: (
      <PublicRoute>
        <AuthLayout>
          <Verification />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/register/professional-details",
    element: (
      <PublicRoute>
        <AuthLayout>
          <ProfessionalDetails />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
];

export const AuthRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfileContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/balance",
    element: (
      <ProtectedRoute>
        <BalanceHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/complete-redirect",
    element: (
      <ProtectedRoute>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/term-redirect",
    element: (
      <ProtectedRoute>
        <TerminationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/oq-redirect",
    element: (
      <ProtectedRoute>
        <OverQuotaPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/quality-redirect",
    element: (
      <ProtectedRoute>
        <QualityRedirectPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/close-redirect",
    element: (
      <ProtectedRoute>
        <SurvetCloseRedirectPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/thank-you",
    element: (
      <ProtectedRoute>
        <ThankYouPage />
      </ProtectedRoute>
    ),
  },
];

export default { RegisterRoutes, AuthRoutes };
