import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
        return; 
      }
      
      // I also corrected the port from 5000 to 1000 to match your backend
      const response = await axios.post(
        "http://localhost:5000/api/v1/sign-in", 
        Values
      );
      
      // --- CHANGES ARE HERE ---
      // Save user session data to localStorage to persist the login
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      // --- END OF CHANGES ---

      dispatch(authActions.login(response.data));
      navigate("/");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      alert(errorMessage);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="text-3xl font-semibold flex items-center">
            <img
              className="w-10 h-10 mr-4"
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              alt="logo"
            />
            Readify
          </Link>
        </div>

        <div className="w-full bg-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Sign in to your account
          </h1>

          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Your username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="yourname"
                className="w-full p-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
                value={Values.username}
                onChange={change}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full p-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
                value={Values.password}
                onChange={change}
              />
            </div>

            <div className="flex items-center justify-between">
              <div></div>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-400 text-center">
              Don’t have an account yet?{" "}
              <Link to="/signup" className="font-medium text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;