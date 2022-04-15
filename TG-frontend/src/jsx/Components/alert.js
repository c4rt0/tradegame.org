import React from "react";

export const Alert = ({ color, message, setShowAlert }) => {
  return (
    <>
      <div
        className={`z-10 text-white px-6 py-4 border-0 rounded fixed right-0 top-0 mt-10 mr-10 bg-${color}_900 w-100`}
      >
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle font-semibold mr-8">
          {message}
        </span>
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          onClick={() => {
            setShowAlert(false);
          }}
        >
          <span>×</span>
        </button>
      </div>
    </>
  );
};

export default Alert;
