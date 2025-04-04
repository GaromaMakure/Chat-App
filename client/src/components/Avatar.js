import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width = 40, height = 40 }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
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
  const isOnline = onlineUser.includes(userId);
  return (
    <div
      className={`text-slate-800 rounded-full   font-bold text-lg relative`}
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
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1  rounded-full z-10 "></div>
      )}
    </div>
  );
};

export default Avatar;
