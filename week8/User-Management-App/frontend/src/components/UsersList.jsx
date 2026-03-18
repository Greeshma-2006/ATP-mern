import { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user-api/users");
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl text-purple-700 text-center mb-6">
        Users List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-purple-200">
            <tr>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">DOB</th>
              <th className="border px-4 py-2">Mobile</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.dob}</td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;