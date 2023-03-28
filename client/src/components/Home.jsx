import Todo from "./Todo";
import { useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { TfiApple } from "react-icons/tfi";
import { useAppContext } from "../lib/contextLib";

const Home = () => {
  const { isLogin } = useAppContext();
  return (
    <>
      <NavBar />
      <div className="flex w-screen items-center justify-center">
        {isLogin ? (
          <div className="container flex mt-1 justify-center">
            <div className="w-full">
              <h1 className="text-center font-bold text-teal-900 m-2">
                <TfiApple className="inline text-2xl mb-2 mr-1" />
                Todos
              </h1>
              <Todo />
              <Link
                to="/add"
                className="border-teal-500 border rounded p-1 hover:border-teal-800 text-teal-900 w-32 mx-2 mt-2 shadow"
              >
                Add todo
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h4>Go Log In</h4>
            <Link
              to="/login"
              className="block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-teal-500 hover:text-teal-500 hover:bg-white mt-2 lg:mt-0"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
