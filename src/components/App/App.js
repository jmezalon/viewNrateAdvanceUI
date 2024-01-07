import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Navbar,
  NotFound,
  PostDetail,
  Register,
  ProtectedRoute,
} from "components";
import { AuthContextProvider } from "contexts/auth";
import { PostsContextProvider } from "contexts/posts";
import "./App.css";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/posts/:postId"
            element={<ProtectedRoute element={<PostDetail />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
