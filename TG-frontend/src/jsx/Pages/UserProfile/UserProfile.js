import React, { useState } from "react";
import Layout from "../../Components/DashboardComponents/Layout/Layout";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const [passForm, setPassForm] = useState(false);
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: null
  });
  const user = useSelector((state) => state.auth.user);

  const SubmitFunc = () => {
    handleSubmit(updateUserFunc)();
  };

  const updateUserFunc = (data) => {
    const userId = localStorage.getItem("userId");
    data = {
      username: data.username,
      email: data.email,
      id: userId,
      cash: "100000"
    };
  };

  return (
    <Layout>
      <div className="flex justify-center py-40 w-full">
        <div className="relative shadow-2xl rounded-lg flex flex-col items-start justify-center px-6 py-10">
          <div className="flex justify-center w-full">
            <h1 className="text-2xl font-semibold text-black">
              Welcome back {user && user.username}{" "}
            </h1>
          </div>
          <div className="basic-form mt-20">
            <form className=" flex flex-col gap-y-10">
              (
              <div className="flex items-end gap-x-6">
                <div className="w-40">
                  <h1 className="text-lg">Username</h1>
                </div>
                <input
                  type="text"
                  className="form-control input-default py-2 px-4 w-96 outline-none border-b-1 bg-gray_50"
                  {...register("username", {
                    required: true,
                    maxLength: 15,
                    minLength: 3
                  })}
                />
              </div>
              )
              <div className="flex items-end gap-x-6">
                <div className="w-40">
                  <h1 className="text-lg">Email</h1>
                </div>
                <input
                  className="form-control input-default py-2 px-4 w-96 outline-none border-b-1 bg-gray_50"
                  type="email"
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    minLength: 3
                  })}
                />
              </div>
            </form>
            (
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                onClick={() => {
                  SubmitFunc();
                }}
                className="px-8 py-3 rounded-md bg-black text-yellow_400"
              >
                Save Changes
              </button>
            </div>
            )
          </div>
          (
          <div className="mt-6">
            <button
              className="text-yellow_400 text-sm"
              onClick={() => {
                setPassForm(!passForm);
              }}
            >
              Change Password
            </button>
          </div>
          )
        </div>
      </div>
    </Layout>
  );
};
