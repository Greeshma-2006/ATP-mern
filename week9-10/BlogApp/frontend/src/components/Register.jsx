import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = "https://name-blogapp-backend.onrender.com";

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      let { role, profileImageUrl, ...userObj } = newUser;

      role = role.toUpperCase();

      // append text fields
      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });

      // append image
      if (profileImageUrl && profileImageUrl[0]) {
        formData.append("profileImageUrl", profileImageUrl[0]);
      }

      let res;

      if (role === "USER") {
        res = await axios.post(
          `${BASE_URL}/user-api/users`,
          formData,
          { withCredentials: true } 
        );
      } 
      else if (role === "AUTHOR") {
        res = await axios.post(
          `${BASE_URL}/author-api/users`,
          formData,
          { withCredentials: true } 
        );
      } 
      else {
        setError("Please select role");
        return;
      }

      if (res.status === 201) {
        navigate("/login");
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = (data) => {
    onUserRegister(data);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">

      <form
        onSubmit={handleSubmit(onRegister)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border"
      >

        <h1 className="text-3xl text-center mb-6 font-semibold">
          Register
        </h1>

        {/* ROLE */}
        <p>Select Role</p>
        <div className="flex gap-5 mb-4">
          <label>
            <input type="radio" value="USER" {...register("role", { required: true })} /> User
          </label>

          <label>
            <input type="radio" value="AUTHOR" {...register("role", { required: true })} /> Author
          </label>
        </div>

        {errors.role && <p className="text-red-500">Role required</p>}

        {/* NAME */}
        <input {...register("firstName", { required: true })} placeholder="First name" className="border p-2 w-full mb-3" />
        <input {...register("lastName", { required: true })} placeholder="Last name" className="border p-2 w-full mb-3" />

        {/* EMAIL */}
        <input {...register("email", { required: true })} placeholder="Email" className="border p-2 w-full mb-3" />

        {/* PASSWORD */}
        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" className="border p-2 w-full mb-3" />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("profileImageUrl", { required: true })}
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG/PNG allowed");
                return;
              }

              if (file.size > 2 * 1024 * 1024) {
                setError("Max 2MB");
                return;
              }

              setPreview(URL.createObjectURL(file));
              setError(null);
            }
          }}
          className="mb-3"
        />

        {errors.profileImageUrl && <p className="text-red-500">Upload image</p>}

        {error && <p className="text-red-500">{error}</p>}

        {preview && (
          <img src={preview} className="w-24 h-24 rounded-full mb-3" />
        )}

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
}

export default Register;