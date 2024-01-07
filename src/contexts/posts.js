import { createContext, useState, useContext, useEffect } from "react";
import apiClient from "services/apiClient";

const PostsContext = createContext(null);

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

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

  const postValues = {
    posts,
    setPosts,
    isFetching,
    setIsFetching,
    error,
    setError,
    addPost,
    updatePost,
  };

  return (
    <PostsContext.Provider value={postValues}>
      <>{children}</>
    </PostsContext.Provider>
  );
};


export const usePostContext = () => useContext(PostsContext)