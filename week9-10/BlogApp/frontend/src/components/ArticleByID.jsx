import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ArticleByID() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/article/${id}`,
          { withCredentials: true }
        );

        setArticle(res.data.payload);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/user-api/articles`,
        {
          articleId: id,
          comment: newComment,
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setNewComment("");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading article...</p>;
  if (!article) return <p className="text-center mt-10">Article not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6 border">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>

        <p className="text-sm text-gray-500 mb-4">
          Category: {article.category}
        </p>

        <p className="leading-7 whitespace-pre-line">{article.content}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 border mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Comment</h2>

        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="border w-full p-3 rounded"
        />

        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-5 py-2 rounded mt-3"
        >
          Add Comment
        </button>
      </div>

      <div className="bg-white shadow rounded-xl p-6 border mt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {article.comments?.length > 0 ? (
          article.comments.map((item, index) => (
            <div key={index} className="border-b py-3">
              <p className="font-semibold">
                {item.user?.firstName} {item.user?.lastName}
              </p>
              <p>{item.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default ArticleByID;