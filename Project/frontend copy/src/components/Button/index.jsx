import React from "react";
// import { useRouter } from "next/router";

export default function index({ btnText, onClick = () => {}, bgColor }) {
//   const router = useRouter();
  return (
    <>
      <button
        className={`${bgColor || "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        onClick={onClick}
      >
        {btnText || "Click Me"}
      </button>
    </>
  );
}
