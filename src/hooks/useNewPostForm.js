import { useState } from "react";
import { usePostContext } from "contexts/posts";
import apiClient from "services/apiClient";


export const useNewPostForm = () => {
const { addPost } = usePostContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    caption: "",
    imageUrl: "",
  });

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);

    const { data, error } = await apiClient.createPost({
      caption: form.caption,
      imageUrl: form.imageUrl,
    });
    if (data) {
      addPost(data.post);
      setForm({ caption: "", imageUrl: "" });
    }
    if (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return {
    form, error, isLoading, handleOnInputChange, handleOnSubmit
  }
}