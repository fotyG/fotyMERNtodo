import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

const url = "http://localhost:6969/api/v1";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAppContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(`${url}/add`, {
        title,
        description,
        userId,
      });
        navigate('/');
      
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
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
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-800 focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-800 focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Todo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
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
export default AddTodo;
