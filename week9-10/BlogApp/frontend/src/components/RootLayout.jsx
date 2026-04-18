import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../store/authStore";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;