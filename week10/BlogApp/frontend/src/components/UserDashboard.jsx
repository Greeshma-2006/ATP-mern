import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const getArticles = async () => {
    try {
      let res = await axios.get(
        "http://localhost:5000/author-api/articles"
      );
      setArticles(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-10 bg-[#FFF6E5] rounded-lg">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">

          {/* PROFILE IMAGE */}
          <img
            src={currentUser?.profileImageUrl}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border"
          />

          {/* NAME */}
          <h1 className="text-2xl font-bold">
            Hi, {currentUser?.firstName} {currentUser?.lastName} 👋
          </h1>

        </div>

        <button
          onClick={onLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <h2 className="text-xl font-semibold mb-4">Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {articles.map((article) => (
          <div key={article._id} className="bg-white p-4 rounded shadow">

            <h3 className="font-bold">{article.title}</h3>

            <p>{article.content.substring(0, 80)}...</p>

            <button
              onClick={() => navigate(`/article/${article._id}`)}
              className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
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