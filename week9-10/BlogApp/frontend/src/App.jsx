import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthorProfile from "./components/AuthorProfile";
import UserProfile from "./components/UserProfile";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticle from "./components/WriteArticle";
import Unauthorized from "./components/Unauthorized";
import ArticleByID from "./components/ArticleByID";
import EditArticle from "./components/EditArticle";

//main app component with routing setup
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="author" element={<AuthorProfile />}>
            <Route path="articles" element={<AuthorArticles />} />
            <Route path="write-article" element={<WriteArticle />} />
          </Route>

          <Route path="user" element={<UserProfile />} />

          <Route path="article/:id" element={<ArticleByID />} />
          <Route path="edit-article/:id" element={<EditArticle />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;