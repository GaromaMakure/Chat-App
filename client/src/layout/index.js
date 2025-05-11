import React from "react";
import mylogo1 from "../myAssets/mylogo1.png";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-blue-700">
        <img src={mylogo1} alt="logo" width={300} height={200} />
      </header>

      {children}
    </>
  );
};

export default AuthLayouts;
