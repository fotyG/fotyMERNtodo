import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import { useCookies } from "react-cookie";

const url = "http://localhost:6969/api/v1";

const LoginPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toggleLogin, setUserId } = useAppContext();

  const navigate = useNavigate();

  const setUserIdFromCookies = () => {
    if (cookies.userId) {
      toggleLogin();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: `${url}/login`,
      data: {
        name: userName,
        pw: password
      },
    }
    axios(configuration)
    .then((result) => {
      setCookie("user", result.data.username);
      setCookie("token", result.data.token);
      setCookie("userId", result.data.userId);
      setUserIdFromCookies();
      navigate("/");  
    })
    .catch((error) => {error = new Error()})
  };

  return (
    <>
      <NavBar />
      <div className="w-full max-w-xs m-auto mt-10">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-800 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-800 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={(e)=>handleSubmit(e)}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Foty Corp. All rights reserved.
        </p>
      </div>
    </>
  );
};
export default LoginPage;
