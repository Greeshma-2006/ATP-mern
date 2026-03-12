import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let navigate = useNavigate();

  //form submit
  const onUserCreate = async (newUser) => {
    //console.log(newUser);
    setLoading(true);
    // make HTTP POST req to create new user
    try {
      let res = await fetch("http://localhost:4000/user-api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        //user created it shd navigate to users list
        navigate("/users-list");
      } else {
        console.log(res)
        throw new Error("error occurred");
      }
    } catch (err) {
      console.log(err)
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl"> Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-3xl"> {error.message}</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl text-gray-600">Add New User</h1>
      {/* Create user form */}
      <form onSubmit={handleSubmit(onUserCreate)} className="max-w-96 mx-auto mt-10">
        <input type="text" {...register("name")} className="mb-5 border w-full text-2xl" placeholder="Name" />
        <input type="email" {...register("email")} className="mb-5 border w-full text-2xl" placeholder="Email" />
        <input
          type="date"
          {...register("dateOfBirth")}
          className="mb-5 border w-full text-2xl"
          placeholder="Date of birth"
        />
        <input
          type="number"
          {...register("mobileNumber")}
          className="mb-5 border w-full text-2xl"
          placeholder="Mobile number"
        />
        <button type="submit" className="text-2xl bg-lime-400 text-lime-50 px-8 py-4">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;