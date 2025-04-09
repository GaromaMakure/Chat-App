import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  console.log("params", params.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userId, user]);
  return (
    <div>
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4 ">
        <div className="flex items-center gap-4 ">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <BsThreeDotsVertical />
          </button>
        </div>
      </header>
      {/* show all messages */}
      <section className="h-[calc(100vh-128px)]  bg-cyan-500 overflow-x-hidden overflow-y-scroll scrollbar">
        Show all message
      </section>
      {/* send message */}
      <section className="h-16 bg-white flex items-center  ">
        <div className=" relative">
          <button className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white">
            <FaPlus />
          </button>
          {/* video and image */}
          <div className="bg-white shadow rounded absolute bottom-12 w-36 p-2">
            <form>
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 gap-3 ox-3  hover:bg-slate-200 cursor-pointer"
              >
                <div className="text-primary ">
                  <FaImage size={18} />
                </div>
                <p>image</p>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 gap-3 ox-3  hover:bg-slate-200 cursor-pointer"
              >
                <div className="text-purple-500">
                  <FaVideo size={18} />
                </div>
                <p>Video</p>
              </label>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default MessagePage;
