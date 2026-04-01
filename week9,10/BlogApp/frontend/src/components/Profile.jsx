function Profile() {

  // ✅ DIRECT READ (NO useEffect)
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h3 className="text-center mt-4">No user data found</h3>;
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">👤 Profile</h2>

      <div className="card p-4">
        <h4>Username: {user.username}</h4>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>

    </div>
  );
}

export default Profile;