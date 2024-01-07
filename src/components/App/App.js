import { useState, useEffect } from "react";
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
import apiClient from "services/apiClient";
import "./App.css";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listPosts();
      if (data) {
        setPosts(data.posts);
      }
      if (error) {
        setError(error);
      }

      setIsFetching(false);
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((oldPosts) => [newPost, ...oldPosts]);
  };

  const updatePost = ({ postId, postUpdate }) => {
    setPosts((oldPosts) => {
      return oldPosts.map((post) => {
        if (post.id === Number(postId)) {
          return { ...post, ...postUpdate };
        }

        return post;
      });
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                error={error}
                posts={posts}
                addPost={addPost}
                isFetching={isFetching}
              />
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/posts/:postId"
            element={<ProtectedRoute element={<PostDetail updatePost={updatePost} />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
