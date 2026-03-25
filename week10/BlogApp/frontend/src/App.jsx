import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/author-dashboard"
        element={
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;