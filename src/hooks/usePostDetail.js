import { useState, useEffect } from "react";
import { useAuthContext } from "contexts/auth";
import { usePostContext } from "contexts/posts";
import apiClient from "services/apiClient";

const fetchPostById = async ({
  postId,
  setIsFetching,
  setError,
  setPost,
  setCaption,
}) => {
  setIsFetching(true);

  const { data, error } = await apiClient.fetchPostById(postId);
  if (data) {
    setPost(data.post);
    setCaption(data.post.caption);
  }
  if (error) {
    setError(error);
  }

  setIsFetching(false);
};

export const usePostDetail = (postId) => {
  const { user, initialized } = useAuthContext();
  const { updatePost } = usePostContext();
  const [post, setPost] = useState(null);
  const [rating, setRating] = useState(null);
  const [caption, setCaption] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById({ postId, setIsFetching, setError, setPost, setCaption });
  }, [postId]);

  const handleOnUpdate = async () => {
    setIsUpdating(true);

    const postUpdate = { caption };

    const { data, error } = await apiClient.updatePost({ postId, postUpdate });
    if (data) {
      setPost({ ...post, caption: data.post.caption });
      updatePost({ postId, postUpdate });
    }
    if (error) {
      setError(error);
    }

    setIsUpdating(false);
  };

  const handleOnSaveRating = async () => {
    setIsSavingRating(true);

    const { data, error } = await apiClient.createRatingForPost({
      postId,
      rating,
    });
    if (data) {
      await fetchPostById({
        postId,
        setIsFetching,
        setError,
        setPost,
        setCaption,
      });
    }
    if (error) {
      setError(error);
    }

    setIsSavingRating(false);
  };

  const userIsLoggedIn = initialized && Boolean(user?.username);
  const userOwnsPost = user?.username && post?.username === user?.username;

  return {
    handleOnSaveRating, handleOnUpdate, isSavingRating, error, post, rating, setRating, isFetching, isUpdating, caption, setCaption, userIsLoggedIn, userOwnsPost
  }
};
