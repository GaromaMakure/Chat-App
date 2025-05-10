import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({ email: "" });
        navigate("/password", {
          state: response?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(to top right, #8360c3, #2ebf91)",
      }}
    >
      <div className="backdrop-blur-lg bg-white/80 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/30">
        <div className="w-fit mx-auto mb-4 text-gray-800">
          <PiUserCircle size={80} />
        </div>

        <h3 className="text-center text-2xl font-bold text-gray-900 mb-1">
          Check Your Email
        </h3>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email address to verify and continue
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 transition"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-lg px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Let's Go
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          New here?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-medium underline hover:text-emerald-800"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
