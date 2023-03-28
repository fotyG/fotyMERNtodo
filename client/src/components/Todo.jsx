import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6969/api/v1";

const Todo = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const { userId } = useAppContext();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit?id=${id}`);
  };

  useEffect(() => {
    // console.log("userId:", userId);
    const fetchTodos = async () => {
      const configuration = {
        method: "get",
        url: `${url}?userId=${userId}`,
      };

      try {
        const result = await axios(configuration);
        setTodos(result.data.todos);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {todos?.map((todo) => {
        const { _id, title, description } = todo;
        return (
          <div key={_id}>
            <hr></hr>
            <div className="flex justify-between">
              <div className="flex flex-col items-start p-3">
                <h3 className="font-bold text-teal-900 mt-2">{title}</h3>
                <p className="text-teal-700">{description}</p>
              </div>
              <div className="flex flex-col justify-around p-3">
                <button
                  onClick={() => handleDelete(_id)}
                  className="border-teal-500 border rounded p-1 hover:border-teal-800 text-teal-900 w-32 mx-2 mt-2 shadow"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(_id)}
                  className="border-teal-500 border rounded p-1 hover:border-teal-800 text-teal-900 w-32 mx-2 mt-2 shadow"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Todo;
