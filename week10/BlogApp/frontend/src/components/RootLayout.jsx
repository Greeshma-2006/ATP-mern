import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FF]">
      <Header />

      <div className="grow p-5">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;