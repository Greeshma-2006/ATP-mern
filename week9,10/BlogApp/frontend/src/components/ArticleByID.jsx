import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ArticleByID() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [newComment, setNewComment] = useState("");

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
        console.error(err.response?.data || err.message);
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
          comment: newComment
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setNewComment("");

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (!article) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">

      <h2>{article.title}</h2>
      <p>{article.content}</p>

      <hr />

      <h4>Comments</h4>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          className="btn btn-primary mt-2"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      {article.comments?.length > 0 ? (
        article.comments.map((c, index) => (
          <div key={index} className="border p-2 mb-2">
            <strong>
              {c.user?.firstName} {c.user?.lastName}
            </strong>
            <p>{c.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}

    </div>
  );
}

export default ArticleByID;