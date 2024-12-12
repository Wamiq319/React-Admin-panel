import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { SideBar, Header } from "../../components";

import {
  DashboardPage,
  ProductUploadPage,
  AttributePage,
  ClassificationPage,
} from "../../pages";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col Home-Wrapper">
      <header className="z-50">
        <Header />
      </header>

      <div className="flex">
        <div
          className="sideBar-wrapper overflow-y-auto bg-white"
          style={{
            height: "40rem",
            paddingTop: "4.5rem",
            overflowX: "hidden",
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/product-upload" element={<ProductUploadPage />} />
            <Route path="/attributes" element={<AttributePage />} />
            <Route path="/classification" element={<ClassificationPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
