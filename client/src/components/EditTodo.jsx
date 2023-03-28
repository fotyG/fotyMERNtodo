import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

const url = "http://localhost:6969/api/v1";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titlePH, setTitlePH] = useState("")
  const [descriptionPH, setDescriptionPH] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(()=>{
    const configuration = {
      method: "get",
      url: `${url}?_id=${id}`,
    };
    axios(configuration)
    .then((result) => {
      setTitle(result.data.todo[0].title);
      setDescription(result.data.todo[0].description);
    })
  },[id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.put(`${url}/${id}`, {
        title,
        description,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar/>
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
              placeholder={titlePH}
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
              placeholder={descriptionPH}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit
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
export default EditTodo;
