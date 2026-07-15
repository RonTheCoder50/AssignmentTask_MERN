import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import IntroPage from "../pages/intro";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import MainSection from "../pages/mainPage";

import ProtectedRoute from "../custom/protected";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainSection />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
