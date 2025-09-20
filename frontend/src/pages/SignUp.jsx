import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [Values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value });
    };

    // --- UPDATED SUBMIT FUNCTION ---
    const submit = async (e) => {
        e.preventDefault();

        // Validation from the screenshots
        if (
            Values.username === "" ||
            Values.email === "" ||
            Values.password === "" ||
            Values.address === ""
        ) {
            alert("All fields are required");
        } else {
            try {
                // The axios POST request from the screenshots
                const response = await axios.post(
                    "http://localhost:5000/api/v1/sign-up",
                    Values
                );

                // Actions after a successful request, from the screenshots
                console.log(response.data);
                navigate("/login");

            } catch (error) {
                // Keep existing error handling for better user feedback
                const errorMessage = error.response?.data?.message || "An unknown error occurred.";
                console.error("Signup failed:", error); // Log the full error object for debugging
                alert(`Signup failed: ${errorMessage}`);
            }
        }
    };

    return (
        <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Sign Up</p>

                <form onSubmit={submit} className="mt-4">
                    {/* Username Field */}
                    <div className="mt-4">
                        <label htmlFor="username" className="text-zinc-400">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                            placeholder="username"
                            name="username"
                            id="username"
                            required
                            value={Values.username}
                            onChange={change}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mt-4">
                        <label htmlFor="email" className="text-zinc-400">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                            placeholder="xyz@example.com"
                            name="email"
                            id="email"
                            required
                            value={Values.email}
                            onChange={change}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mt-4">
                        <label htmlFor="password" className="text-zinc-400">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                            placeholder="password"
                            name="password"
                            id="password"
                            required
                            value={Values.password}
                            onChange={change}
                        />
                    </div>

                    {/* Address Field */}
                    <div className="mt-4">
                        <label htmlFor="address" className="text-zinc-400">
                            Address
                        </label>
                        <textarea
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                            rows="4"
                            placeholder="address"
                            name="address"
                            id="address"
                            required
                            value={Values.address}
                            onChange={change}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Link to LogIn Page */}
                    <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                        Or
                    </p>
                    <p className="flex mt-4 items-center justify-center text-zinc-400">
                        Already have an account? &nbsp;
                        <Link to="/login" className="hover:text-blue-500">
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;