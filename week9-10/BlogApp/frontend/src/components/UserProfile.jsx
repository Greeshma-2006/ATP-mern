import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {

  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  const BASE_URL = "http://localhost:5000";

  // ================= FETCH ARTICLES =================
  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/articles`,
          { withCredentials: true }
        );

        setArticles(res.data.payload);

      } catch (err) {
        console.log(err.response?.data || err.message);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // ================= DATE FORMAT =================
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ================= LOGOUT =================
  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ================= NAVIGATE =================
  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  // ================= LOADING =================
  if (loading) {
    return <p className="text-center mt-10">Loading articles...</p>;
  }

  return (
    <div>

      {/* ERROR */}
      {error && <p className="text-red-500">{error}</p>}

      {/* USER INFO */}
      <div className="text-end mb-4">
        <p>
  Welcome, {currentUser?.firstName} {currentUser?.lastName}
</p>

        <img
        src={
        currentUser?.profileImageUrl?.startsWith("http")
        ? currentUser.profileImageUrl
        : `http://localhost:5000/${currentUser?.profileImageUrl}`
      }
      alt="profile"
      className="w-20 h-20 rounded-full object-cover border shadow"
      />
      </div>

      {/* LOGOUT */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* ARTICLES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {articles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg p-4 shadow flex flex-col"
          >

            <p className="text-lg font-semibold">
              {article.title}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              {article.content?.slice(0, 60)}...
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {formatDate(article.createdAt)}
            </p>

            <button
              className="mt-auto text-blue-600 pt-4"
              onClick={() => openArticle(article)}
            >
              Read Article →
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UserProfile;