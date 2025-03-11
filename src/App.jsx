import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import "./index.css";
import "./App.css";

function App() {
  const lang = useSelector((state) => state.lang.lang);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  // Set the direction based on the language (RTL for Arabic and Urdu, LTR for others)
  const direction = lang === "ar" || lang === "urd" ? "rtl" : "ltr";

  const PrivateRoute = ({ element, redirectTo }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

  return (
    <div dir={direction}>
      {" "}
      {/* This dynamically sets the text direction */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home/*"
          element={<PrivateRoute element={<Home />} redirectTo="/login" />}
        />
        <Route path="*" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
