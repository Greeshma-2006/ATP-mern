import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim() 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  VALIDATION 
    if (!user.name || !user.email || !user.dob || !user.mobile) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://user-management-app-adpx.onrender.com/user-api/create-user",
        {
          name: user.name,
          email: user.email,
          dob: user.dob,
          mobile: user.mobile
        }
      );

      console.log("SUCCESS:", res.data);

      navigate("/users");

    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-purple-700">Add User</h2>

        <input 
          name="name" 
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input 
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input 
          type="date"
          name="dob"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input 
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button 
          type="submit"
          className="bg-purple-300 w-full p-2 rounded hover:bg-purple-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUser;