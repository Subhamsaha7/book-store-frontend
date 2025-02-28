import axios from "axios";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../utils/baseURL';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Session expired! Please log in again.');
                    navigate("/");
                }, 3600 * 1000);
            }

            toast.success("Admin Login successful!")
            navigate("/dashboard");

        } catch (error) {
            setMessage("Invalid email or password");
            console.error(error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#ecf2ff] to-[#e0e7ff] p-6">
            <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md focus:outline-none"
                        />
                    </div>

                    {message && <p className="text-red-500 text-xs italic">{message}</p>}

                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                        Login
                    </button>
                </form>

                <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AdminLogin;
