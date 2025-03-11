import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux se state lene ke liye
import { SidebarContext } from "../../context/SidebarContext";
import { SideBar, Header } from "../../components";
import ProductListPage from "../Product";

import {
  StoreOverViewPage,
  ProductUploadPage,
  ProductAttributePage,
  ProductClassificationPage,
  SalesAnalyticsPage,
  AddUserPage,
  UserRolesPage,
  UserListPage,
} from "../../pages";

const Home = () => {
  const { isSidebarCollapsed } = React.useContext(SidebarContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux state se login status lo

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Agar login nahi to redirect
  }

  return (
    <div className="min-h-screen flex flex-col Home-Wrapper">
      <header className="z-50">
        <Header />
      </header>

      <div className="flex">
        <div
          className={`sideBar-wrapper overflow-y-auto bg-white fixed top-0 left-0 bottom-0 ${
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          } sm:translate-x-0 sm:relative`}
          style={{
            height: "100vh",
            paddingTop: "4.5rem",
            overflowX: "hidden",
            zIndex: 40,
            transition: "transform 0.3s ease",
          }}
        >
          <SideBar />
        </div>

        <div
          style={{
            height: "calc(100vh - 0.5rem)",
            paddingTop: "6rem",
            paddingBottom: "2rem",
            overflowX: "hidden",
          }}
          className="content-page w-full overflow-y-auto px-[3px] sm:px-6"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/home/dashboard" />} />
            <Route path="/dashboard" element={<StoreOverViewPage />} />
            <Route path="/sales-analytics" element={<SalesAnalyticsPage />} />
            <Route path="/product-upload" element={<ProductUploadPage />} />
            <Route path="/attributes" element={<ProductAttributePage />} />
            <Route
              path="/classification"
              element={<ProductClassificationPage />}
            />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/user-roles" element={<UserRolesPage />} />
            <Route path="/user-list" element={<UserListPage />} />
            <Route path="/products" element={<ProductListPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
