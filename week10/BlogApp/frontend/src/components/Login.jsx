import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOGOUT
  const onLogout = () => {
    logout();
    navigate("/login");
  };

  // FETCH ARTICLES (fixed)
  useEffect(() => {

    let isMounted = true;

    const fetchArticles = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:5000/author-api/articles"
        );

        if (isMounted) {
          setArticles(res.data.payload);
        }

      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };

  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading articles...
      </div>
    );
  }

  return (
    <div className="p-10 bg-[#FFF6E5] rounded-lg">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        {/* PROFILE + NAME */}
        <div className="flex items-center gap-4">

          <img
            src={
              currentUser?.profileImageUrl ||
              "https://via.placeholder.com/100"
            }
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border"
          />

          <h1 className="text-2xl font-bold">
            Hi, {currentUser?.firstName} {currentUser?.lastName} 👋
          </h1>

        </div>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <p className="mb-6">
        Users can read articles here.
      </p>

      <h2 className="text-xl font-semibold mb-4">
        Articles
      </h2>

      {/* ARTICLES GRID */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      ">

        {articles.map((article) => (

          <div
            key={article._id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
          >

            <h3 className="text-lg font-bold mb-2">
              {article.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {article.content.substring(0, 100)}...
            </p>

            <button
              onClick={() => navigate(`/article/${article._id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Read More
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default UserDashboard;