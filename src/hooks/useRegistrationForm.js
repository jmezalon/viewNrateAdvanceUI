import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

export const useRegistrationform = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.username) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      password: form.password,
      username: form.username,
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
