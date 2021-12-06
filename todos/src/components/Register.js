import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const API_URL = process.env.API_URL;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const register = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${API_URL}/register`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      console.log(result.data);
      if (result.data.email) {
        navigate("/login");
      } else {
        setErr(result.data._message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formm">
      <h1>Sign Up</h1>
      <form onSubmit={register}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button type="submit">Sign up</button>
      </form>
      <p>{err}</p>
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

export default Register;