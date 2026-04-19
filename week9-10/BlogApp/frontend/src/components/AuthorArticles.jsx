import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://name-blogapp-backend.onrender.com/author-api/articles/${user._id}`,
          { withCredentials: true }
        );

        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (articles.length === 0) return <p className="text-center">No articles yet</p>;

  return (
    <div className="grid grid-cols-3 gap-5">
      {articles.map((article) => (
        <div key={article._id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{article.title}</h3>
          <p className="text-sm mt-2">{article.content?.slice(0, 60)}...</p>

          <button
            className="text-blue-600 mt-4"
            onClick={() => openArticle(article)}
          >
            Read →
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;