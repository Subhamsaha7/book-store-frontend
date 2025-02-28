import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const {loginUser, signInWithGoogle} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid Email and Password");
    }
  };

  const handleGoogleSignIn = async() => {
    // Google Sign-In Logic
    try {
      await signInWithGoogle();
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google Sign in Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 transform transition duration-500 hover:scale-105 hover:shadow-3xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center drop-shadow-md">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition-all duration-300 hover:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition-all duration-300 hover:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {message && <p className="text-red-500 text-xs italic mb-4">{message}</p>}

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:opacity-90 hover:shadow-xl transition duration-300">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition duration-300">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
