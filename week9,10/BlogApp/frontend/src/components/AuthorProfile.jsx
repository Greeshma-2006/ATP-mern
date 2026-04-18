import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider
} from "../styles/common";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <div className={pageWrapper}>

      {/* ===== AUTHOR INFO ===== */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {currentUser?.firstName} {currentUser?.lastName}
          </h2>

          <p className="text-gray-500">
            Author Dashboard
          </p>
        </div>

        <div>
          <img
          src={
          currentUser?.profileImageUrl?.startsWith("http")
          ? currentUser.profileImageUrl
          :   `http://localhost:5000/${currentUser?.profileImageUrl}`
        }
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border shadow"
        />
        </div>

      </div>

      {/* ===== AUTHOR NAVIGATION ===== */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

      </div>

      {/* ===== DIVIDER ===== */}
      <div className={divider}></div>

      {/* ===== CHILD ROUTES ===== */}
      <Outlet />

    </div>
  );
}

export default AuthorProfile;