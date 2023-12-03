import React from "react";
// import { useRouter } from "next/router";

export default function index({ btnText, onClick = () => {}, bgColor, type }) {
  //   const router = useRouter();
  return (
    <>
      <button
        className={`${
          bgColor || "bg-blue-500"
        } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300`}
        onClick={onClick}
        type={type || "button"}
      >
        {btnText || "Click Me"}
      </button>
    </>
  );
}
