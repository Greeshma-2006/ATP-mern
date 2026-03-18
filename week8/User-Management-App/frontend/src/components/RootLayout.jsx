import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header Section */}
      <Header />

      {/* Main Content Area */}
      <main className="flex container mx-auto p-6">
        {/* Outlet renders child routes */}
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}

export default RootLayout;