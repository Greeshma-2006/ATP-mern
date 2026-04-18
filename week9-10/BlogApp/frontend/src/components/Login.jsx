import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";

function Login() {

  const { register, handleSubmit } = useForm();
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);

  // LOGIN FUNCTION
  const onLogin = async (data) => {
    try {
      await login(data);   // backend handles role
    } catch (err) {
      console.log(err);
    }
  };

  // REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isAuthenticated && currentUser) {

      if (currentUser.role === "USER") {
        navigate("/user");
      } 
      else if (currentUser.role === "AUTHOR") {
        navigate("/author");
      } 
      else if (currentUser.role === "ADMIN") {
        navigate("/admin");
      }

    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[70vh]">

      <form
        onSubmit={handleSubmit(onLogin)}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border"
      >

        <h1 className="text-3xl text-center mb-6 text-gray-700 font-semibold">
          Login
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 mb-3 text-center">{error}</p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          {...register("email", { required: true })}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          {...register("password", { required: true })}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;