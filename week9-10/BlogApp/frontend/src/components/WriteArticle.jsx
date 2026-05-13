import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore.js";

//write article page for authors with form validation and error handling
function WriteArticle() {
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  // ================= SUBMIT ARTICLE =================
  const submitArticle = async (data) => {
    if (!currentUser?._id) {
      setError("User not loaded. Please login again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `https://name-blogapp-backend.onrender.com/author-api/articles/${currentUser._id}`,
        data,
        { withCredentials: true }
      );

      reset();
      navigate("/author");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Write Article
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(submitArticle)}>

          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-3 rounded"
            {...register("title", { required: "Title required" })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <select
            className="border p-2 w-full mb-3 rounded"
            {...register("category", { required: "Category required" })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          <textarea
            rows="6"
            placeholder="Write content..."
            className="border p-2 w-full mb-3 rounded"
            {...register("content", { required: "Content required" })}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default WriteArticle;