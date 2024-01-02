import { useState } from "react";
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "services/apiClient";

export const useLoginForm = ({ user, setUser }) => {
  const { form, errors, setErrors, handleOnInputChange } =
    useAuthenticationForm({ user });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    setIsProcessing(false);
  };

  return {
    form,
    isProcessing,
    errors,
    handleOnInputChange,
    handleOnSubmit,
  };
};
