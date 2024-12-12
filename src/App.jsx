import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import "./index.css";
import "./App.css";
const isAuthenticated = true;
const PrivateRoute = ({ element, redirectTo }) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

function App() {
  // Access the language state from Redux (or other context)
  const lang = useSelector((state) => state.lang.lang); // Replace with your state structure

  return (
    <div dir={lang === "urd" ? "rtl" : "ltr"}>
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
