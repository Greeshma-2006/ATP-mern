import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-purple-200 p-4 flex justify-center gap-8 text-purple-900 font-semibold shadow">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add-user">Add User</NavLink>
      <NavLink to="/users">Users List</NavLink>
    </nav>
  );
}

export default Header;