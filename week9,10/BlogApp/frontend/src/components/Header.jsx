import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

function Header() {

  const logout = useAuth((state) => state.logout);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author";
      case "ADMIN":
        return "/admin";
      default:
        return "/user";
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#E6E6FA] shadow">

      {/* LOGO */}
      <h1
        className="text-xl font-bold text-purple-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        BlogApp
      </h1>

      <div className="flex gap-6 items-center">

        {/* HOME */}
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "text-purple-700 font-semibold" : ""
        }>
          Home
        </NavLink>

        {/* NOT LOGGED IN */}
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {/* LOGGED IN */}
        {isAuthenticated && (
          <>
            {/* PROFILE BASED ON ROLE */}
            <NavLink to={getProfilePath()}>
              Profile
            </NavLink>

            {/* AUTHOR ONLY */}
            {user?.role === "AUTHOR" && (
              <NavLink to="/author/write-article">
                Write
              </NavLink>
            )}

            {/* LOGOUT */}
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