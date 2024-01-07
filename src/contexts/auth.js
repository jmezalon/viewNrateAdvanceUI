import { createContext, useState, useContext, useEffect } from "react";
import apiClient from "services/apiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }
      setInitialized(true);
    };

    const token = localStorage.getItem("rate_my_setup_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    } else {
      setInitialized(true);
    }
  }, [setUser]);

  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser({});
  };

  const authValue = { user, setUser, handleLogout, initialized };

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
