import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/assets/styles/global.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const CLERK_SECRET_KEY = import.meta.env.VITE_CLERK_SECRET_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

if (!CLERK_SECRET_KEY) {
  throw new Error("Missing Secret Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    secretKey={CLERK_SECRET_KEY}
    afterSignOutUrl="/login"
  >
    <App />
  </ClerkProvider>
);
