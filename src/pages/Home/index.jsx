import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { SideBar, Header } from "../../components";
import ProductListPage from "../Product";

import {
  StoreOverViewPage,
  ProductUploadPage,
  AttributePage,
  ClassificationPage,
  SalesAnalyticsPage,
  AddUserPage,
  UserRolesPage,
  UserListPage,
} from "../../pages";

const Home = () => {
  const { isSidebarCollapsed } = useContext(SidebarContext);
  return (
    <div className="min-h-screen flex flex-col Home-Wrapper">
      <header className="z-50">
        <Header />
      </header>

      <div className="flex">
        <div
          className={`sideBar-wrapper overflow-y-auto bg-white fixed top-0 left-0 bottom-0 ${
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          } sm:translate-x-0 sm:relative`} // Fixed position for mobile, relative for larger screens
          style={{
            height: "100vh", // Full height on mobile
            paddingTop: "4.5rem",
            overflowX: "hidden",
            zIndex: 40, // Ensure it slides over content
            transition: "transform 0.3s ease", // Smooth sliding transition
          }}
        >
          <SideBar />
        </div>

        <div
          style={{
            padding: "1.5rem",
            height: "40rem",
            paddingTop: "6rem",
            paddingBottom: "3rem",
            overflowX: "hidden",
          }}
          className=" content-page w-full overflow-y-auto"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/home/dashboard" />} />
            <Route path="/dashboard" element={<StoreOverViewPage />} />
            <Route path="/sales-analytics" element={<SalesAnalyticsPage />} />
            <Route path="/product-upload" element={<ProductUploadPage />} />
            <Route path="/attributes" element={<AttributePage />} />
            <Route path="/classification" element={<ClassificationPage />} />
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
