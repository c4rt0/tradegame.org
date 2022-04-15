import React, { useState, useEffect } from "react";
import Layout from "../../Components/DashboardComponents/Layout/Layout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  getAdminById,
  updateUserById,
  updateUserPassword
} from "../../../Store/Actions/Auth/authAction";
import { isAdminRole } from "../../../Store/selectors/roleSelector";

export const UserProfile = () => {
  let dispatch = useDispatch();
  let [userData, setUserData] = useState({});
  const [passForm, setPassForm] = useState(false);
  const { register, reset, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: userData ? userData : null
  });
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (isAdminRole()) {
      dispatch(getAdminById(userId));
    } else {
      dispatch(getUserById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (isAdminRole()) {
        reset({ email: user.email });
      } else {
        reset({ username: user.username, email: user.email });
      }
      setUserData(user);
    }
  }, [user, reset]);

  const SubmitFunc = () => {
    handleSubmit(updateUserFunc)();
  };
  const passSubmit = () => {
    handleSubmit(updatePassword)();
  };

  const updateUserFunc = (data) => {
    const userId = localStorage.getItem("userId");
    data = {
      username: data.username,
      email: data.email,
      id: userId,
      isLogIn: userData.isLogIn,
      cash: parseInt(userData.cash)
    };
    dispatch(updateUserById(data));
  };

  const updatePassword = (data) => {
    const userId = localStorage.getItem("userId");
    let d = { password: data.password, id: userId };
    dispatch(updateUserPassword(d));
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
              {!isAdminRole() && (
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
              )}
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
            {!isAdminRole() && (
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
            )}
          </div>
          {!isAdminRole() && (
            <div className="mt-6">
              <button
                className="text-yellow_400 text-sm"
                onClick={() => {
                  setPassForm(!passForm);
                }}
              >
                Change Password
              </button>
              {passForm ? (
                <div className="mt-10">
                  <form>
                    <div className="flex items-end gap-x-6">
                      <div className="w-40">
                        <h1 className="text-lg">New Password</h1>
                      </div>
                      <input
                        className="form-control input-default py-2 px-4 w-96 outline-none border-b-1 bg-gray_50"
                        type="password"
                        {...register("password", {
                          maxLength: 20,
                          minLength: 8
                        })}
                      />
                    </div>
                  </form>
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      onClick={() => {
                        passSubmit();
                      }}
                      className="px-8 py-3 rounded-md bg-black text-yellow_400"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
