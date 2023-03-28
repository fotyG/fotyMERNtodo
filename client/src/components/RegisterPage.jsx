import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6969/api/v1";


const RegisterPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: `${url}/register`,
      data: {
        userName,
        password,
      },
    }
    axios(configuration)
    .then((result) => {console.log(result)})
    .catch((error) => {console.log(error)})
    
    setUsername('')
    setPassword('')
  };

  return (
    <>
      <NavBar />
      <div className="w-full max-w-xs m-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
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
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Foty Corp. All rights reserved.
        </p>
      </div>
    </>
  );
};
export default RegisterPage;
