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

  // ✅ Cleanup preview URL (important)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // API request function
  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      let { role, profilePic, ...userObj } = newUser;

      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });

      formData.append("profilePic", profilePic[0]);

      if (role === "user") {
        let res = await axios.post(
          "http://localhost:5000/user-api/users",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res.status === 201) navigate("/login");
      }

      if (role === "author") {
        let res = await axios.post(
          "http://localhost:5000/author-api/authors",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res.status === 201) navigate("/login");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Form submit
  const onRegister = (data) => {
    onUserRegister(data);
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onRegister)}
        className="bg-gray-200 p-10 w-96 rounded-lg"
      >
        <h1 className="text-3xl text-center mb-5">Register</h1>

        {/* Role */}
        <p className="text-lg mb-2">Select Role</p>
        <div className="flex gap-5 mb-5">
          <label>
            <input
              type="radio"
              value="user"
              {...register("role", { required: true })}
            /> User
          </label>

          <label>
            <input
              type="radio"
              value="author"
              {...register("role", { required: true })}
            /> Author
          </label>
        </div>
        {errors.role && <p className="text-red-500">Role required</p>}

        {/* First Name */}
        <input
          type="text"
          placeholder="First name"
          className="border p-2 w-full mb-3"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <p className="text-red-500">First name required</p>}

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last name"
          className="border p-2 w-full mb-3"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <p className="text-red-500">Last name required</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-500">Email required</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <p className="text-red-500">Password min 6 characters</p>
        )}

        {/* Profile Image */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="border p-2 w-full mb-3"
          {...register("profilePic", { required: true })}
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
              }

              if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
              }

              setPreview(URL.createObjectURL(file));
              setError(null);
            }
          }}
        />

        {errors.profilePic && (
          <p className="text-red-500">Upload image</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 mb-3">{error}</p>
        )}

        {/* Preview */}
        {preview && (
          <div className="mt-3 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full border"
            />
          </div>
        )}

        {/* Submit */}
        <button
          className="bg-sky-500 text-white px-6 py-2 w-full mt-5"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  );
}

export default Register;