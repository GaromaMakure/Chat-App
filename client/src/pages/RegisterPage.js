import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url,
    }));
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#e30edf" }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl p-6 transition duration-300"
        style={{ backgroundColor: "#0ed8e3" }}
      >
        <h3 className="text-2xl font-extrabold text-center text-[#1f2d40]">
          Welcome to Chat App!
        </h3>

        <form className="grid gap-5 mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-[#1f2d40]">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-white px-3 py-2 rounded-lg border border-[#1f2d40] focus:outline-none focus:ring-2 focus:ring-[#1f2d40]"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-[#1f2d40]">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-white px-3 py-2 rounded-lg border border-[#1f2d40] focus:outline-none focus:ring-2 focus:ring-[#1f2d40]"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-[#1f2d40]">
              Password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-white px-3 py-2 rounded-lg border border-[#1f2d40] focus:outline-none focus:ring-2 focus:ring-[#1f2d40]"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic" className="font-semibold text-[#1f2d40]">
              Photo :
            </label>
            <label
              htmlFor="profile_pic"
              className="h-14 bg-white flex justify-between items-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-[#1f2d40] transition-all duration-200"
            >
              <p className="text-sm text-gray-700 max-w-[240px] truncate">
                {uploadPhoto?.name
                  ? uploadPhoto?.name
                  : "Click to upload profile photo"}
              </p>
              {uploadPhoto?.name && (
                <button
                  className="text-lg text-gray-500 hover:text-red-600"
                  onClick={handleClearUploadPhoto}
                >
                  <IoClose />
                </button>
              )}
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-[#1f2d40] text-white text-lg px-4 py-2 rounded-lg font-bold hover:bg-[#102030] transform hover:scale-105 transition-all duration-200 shadow-md">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-[#1f2d40] text-sm">
          Already have an account?{" "}
          <Link
            to={"/email"}
            className="font-semibold underline hover:text-[#0a1c2b]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
