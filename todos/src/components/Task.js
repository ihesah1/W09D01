import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const getPosts = async () => {
    try {
      const result = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(result);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id) => {
    try {
      const result = await axios.delete(`${API_URL}/post/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const newTodo = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${API_URL}/post`,
        {
          desc: e.target.todo.value,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      e.target.todo.value = "";
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='todo'>
      <h1>Todos:</h1>
      <form onSubmit={newTodo} className='new'>
        <p>New todo:</p>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <h2 style={{ display: "inline" }}>{item.desc}</h2>
            <button onClick={() => del(item._id)}>x</button>
            <br />
          </div>
        );
      })}

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Post;