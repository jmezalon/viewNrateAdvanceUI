import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Navbar,
  NotFound,
  PostDetail,
  Register,
} from "components";
import { AuthContextProvider, useAuthContext } from "contexts/auth";
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
  const { user, setUser } = useAuthContext()
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

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }
    };

    const token = localStorage.getItem("rate_my_setup_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, [setUser]);

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

  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser({});
    setError(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
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
            element={<PostDetail user={user} updatePost={updatePost} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
