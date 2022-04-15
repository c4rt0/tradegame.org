import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./SubComponents/Button/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "./../../Store/Actions/Auth/authAction";

export const SignInForm = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [isAdminState, setIsAdmin] = useState(false);
  const { register, reset, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleLogin = () => {
    handleSubmit(validFormSubmit)();
  };
  const validFormSubmit = (data) => {
    data = { ...data, isAdmin: isAdminState };
    dispatch(loginUser(data, history));
    reset();
    setIsAdmin(false);
  };
  return (
    <div>
      <div className="basic-form">
        <form className=" flex flex-col gap-y-3">
          <div className="form-group">
            <input
              type={"email"}
              className="form-control input-default w-full py-4 px-4 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Email"}
              {...register("email", {
                required: true,
                maxLength: 20,
                minLength: 10
              })}
            />
          </div>
          <div className="form-group">
            <input
              type={"password"}
              className="form-control input-default w-full py-4 px-4 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Password"}
              {...register("password", {
                required: true,
                maxLength: 400,
                minLength: 8
              })}
            />
          </div>
        </form>
      </div>

      <div className="my-4">
        <Button
          type="submit"
          onClick={() => {
            handleLogin();
          }}
          label="Continue"
          width={"100%"}
          padd={"16px"}
          bgColor={"#6366f1"}
          color={"white"}
          borderRadius={"8px"}
        ></Button>
      </div>
    </div>
  );
};
