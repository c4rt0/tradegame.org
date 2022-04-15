import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../Components/SubComponents/Navbar/navbar";
import { SignInForm } from "./../Components/signIn";

const Login = () => {
  let history = useHistory();
  const handleForms = () => {
    history.push("/signup");
  };
  return (
    <div className="w-full bg-gray_200 " style={{ height: "100vh" }}>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="" style={{ width: "500px" }}>
          <div className="">
            <div className={` flex justify-center py-4 font-bold`} />
            <div className="px-8 py-10">
              <h1 className="font-semibold text-2xl mb-4">
                Welcome to tradegame.org
              </h1>
              <SignInForm />
              <h4
                className="cursor-pointer underline text-indigo_500 text-xs text-right"
                onClick={() => handleForms()}
              >
                Sign Up
              </h4>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
