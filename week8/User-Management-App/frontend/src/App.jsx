import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;