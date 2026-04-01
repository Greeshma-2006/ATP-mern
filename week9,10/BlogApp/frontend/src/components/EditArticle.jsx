import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state;

  const BASE_URL = "http://localhost:5000";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ================= PREFILL FORM =================
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  // ================= UPDATE ARTICLE =================
  const updateArticle = async (data) => {
    try {
      data.articleId = article._id;

      const res = await axios.put(
        `${BASE_URL}/author-api/articles`,
        data,
        { withCredentials: true }
      );

      toast.success("Article updated successfully");

      navigate(`/article/${article._id}`, {
        state: res.data.payload,
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>

        {/* TITLE */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            className={inputClass}
            {...register("title", { required: "Title required" })}
          />

          {errors.title && (
            <p className={errorClass}>{errors.title.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select
            className={inputClass}
            {...register("category", { required: "Category required" })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* CONTENT */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="14"
            className={inputClass}
            {...register("content", { required: "Content required" })}
          />

          {errors.content && (
            <p className={errorClass}>{errors.content.message}</p>
          )}
        </div>

        <button className={submitBtn}>Update Article</button>

      </form>
    </div>
  );
}

export default EditArticle;