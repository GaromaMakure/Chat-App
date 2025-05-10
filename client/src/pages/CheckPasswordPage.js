import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);

        setData({ password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(to right, #00b4db, #0083b0)",
      }}
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">
        <div className="w-fit mx-auto mb-4 flex justify-center items-center flex-col text-center">
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg mt-2 text-gray-800">
            {location?.state?.name}
          </h2>
        </div>

        <form className="grid gap-5 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-md">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            to={"/forgot-password"}
            className="font-semibold hover:text-pink-600"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
