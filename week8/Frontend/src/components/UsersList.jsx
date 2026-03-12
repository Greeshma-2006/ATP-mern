import { useEffect, useState } from "react";
import {useNavigate} from 'react-router'

function UsersList() {
  let [users, setUsers] = useState([]);
  let navigate=useNavigate()

  useEffect(() => {
    async function getUsers() {
      try {
        let res = await fetch("http://localhost:4000/user-api/users", {
          method: "GET",
        });

        if (res.status === 200) {
          //extract json data
          let resObj = await res.json();
          //update the state
          setUsers(resObj.payload);
        } else {
        }
      } catch (err) {
        //set error
      }
    }

    getUsers();
  }, []);


  //go to user
  const gotoUser=(userObj)=>{
    navigate("/user",{state:{user:userObj}})
  }

  return (
    <div>
      <h1 className="text-5xl text-gray-600">List of Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {users?.map((userObj) => (
          <div key={userObj.email} className="p-10 shadow-2xl cursor-pointer" onClick={()=>gotoUser(userObj)}>
            <p className="text-3xl">{userObj.name}</p>
            <p className="text-2xl">{userObj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;