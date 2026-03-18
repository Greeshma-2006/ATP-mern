import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`https://user-management-app-adpx.onrender.com/user-api/users${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>DOB: {user.dob}</p>
      <p>Mobile: {user.mobile}</p>
    </div>
  );
}

export default User;