import { NavLink, Outlet } from "react-router-dom";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider
} from "../styles/common";

function AuthorProfile() {
  return (
    <div className={pageWrapper}>

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

      {/* ===== CHILD ROUTES RENDER HERE ===== */}
      <Outlet />

    </div>
  );
}

export default AuthorProfile;