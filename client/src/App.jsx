import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import axios from "axios";
import "./index.css";
import { AppContext } from "./lib/contextLib";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";

const url = "http://localhost:6969/api/v1";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [activeUser, setActiveUser] = useState("guest");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const toggleLogin = () => {
    setActiveUser(cookies.user);
    setUserId(cookies.userId);
    setToken(cookies.token);
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    removeCookie("token");
    removeCookie("user");
    removeCookie("userId");
  };

  useEffect(() => {
    if (cookies.token && cookies.user && cookies.userId && !isLogin) {
      toggleLogin();
    }
  }, [cookies, isLogin]);

  return (
    <AppContext.Provider
      value={{
        token,
        userId,
        isLogin,
        activeUser,
        toggleLogin,
        logout,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/add" element={<AddTodo />}></Route>
        <Route path="/edit" element={<EditTodo />}></Route>
        ...
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
