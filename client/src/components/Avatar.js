import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageUrl, width = 40, height = 40 }) => {
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length >= 1) {
      avatarName =
        splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
    } else {
      avatarName = splitName[0][0].toUpperCase();
    }
  }
  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-cyan-200",
    "bg-gray-200",
  ];
  const randomNumber = Math.floor(Math.random() * 7);

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full   font-bold text-lg`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full shadow"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <div className=" flex justify-center items-center">
          <PiUserCircle size={width} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
