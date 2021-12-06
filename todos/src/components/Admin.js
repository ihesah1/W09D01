import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;
  const token = localStorage.getItem("token");
  const [Alldata, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    try {
      const myData = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const Alldata = await axios.get(`${API_URL}/posts/admin`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const Users = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setData(myData.data);
      setAllData(Alldata.data);
      setUsers(Users.data);
      console.log(Alldata.data);
      console.log(Users.data);
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

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(`${API_URL}/users/${id}`, {
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
    <div className="admin">
      <div className="left">
        <h1>All People Todos:</h1>
        {Alldata.map((item) => {
          return (
            <div key={item._id}>
              <hr />
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <p style={{ display: "inline" }}>By: {item.U.email}</p>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })}
      </div>

      <div className="center">
        <h1>My Todos:</h1>
        <form onSubmit={newTodo}>
          <p>New todo:</p>
          <input type="text" name="todo" />
          <button type="submit">Add</button>
        </form>
        {data.map((item) => {
          return (
            <div key={item._id}>
              <hr />
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })}
      </div>

      <div className="right">
        <h1>Users:</h1>
        {users.map((item) => {
          return (
            <div key={item._id}>
              <p style={{ display: "inline" }}>Username:</p>
              <h3 style={{ display: "inline" }}>{item.username}</h3>
              <br />
              <p style={{ display: "inline" }}>Email:</p>
              <h3 style={{ display: "inline" }}>{item.email}</h3>
              <br />
              <p style={{ display: "inline" }}>Password:</p>
              <h6 style={{ display: "inline" }}>{item.password}</h6>
              <br />
              <p style={{ display: "inline" }}>Role:</p>
              <h6 style={{ display: "inline" }}>{item.role}</h6>
              <br />
              <p style={{ display: "inline" }}>Deleted:</p>
              <h3 style={{ display: "inline" }}>
                {item.isDeleted ? (
                  <p style={{ display: "inline" }}>Yes</p>
                ) : (
                  <p style={{ display: "inline" }}>No</p>
                )}
              </h3>
              <button onClick={() => deleteUser(item._id)}>Delete User</button>
              <br />
              <br />
            </div>
          );
        })}
      </div>

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

export default Admin;