import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth as useAuth } from "../store/authStore";

function Header() {

  const logout = useAuth((state) => state.logout);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#E6E6FA] shadow">

      <h1 className="text-xl font-bold text-purple-800">
        BlogApp
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/add-article">Add Article</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Header;