import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Loading from "../components/general/Loading";
import { api } from "../helpers/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const getUserInfo = async () => {
    const res = await api("get", "/users/get_user_info");
    return res;
  };

  const updateUserInfo = async () => {
    const { body } = await getUserInfo();
    delete body.token;
    setUser(body);
  };

  useEffect(() => {
    const checkAuthCookie = async () => {
      try {
        const access_token = Cookies.get("access_token"); // get token
        if (!access_token) return logout();
        axios.defaults.headers.common["Authorization"] = access_token; // set token for all api calls
        const { ok, body } = await getUserInfo();
        if (ok) return login({ ...body, token: access_token });
        setIsLoggedIn(false);
      } catch (err) {
        console.error(err);
      }
    };
    checkAuthCookie();
  }, []);

  const login = (receivedUser) => {
    const { token } = receivedUser;
    delete receivedUser.token;
    setIsLoggedIn(true);
    setUser(receivedUser);
    Cookies.set("access_token", token);
    axios.defaults.headers.common["Authorization"] = token; // set token for all api calls
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("access_token");
  };

  if (isLoggedIn === null) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
