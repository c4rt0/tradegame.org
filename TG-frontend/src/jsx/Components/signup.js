import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./SubComponents/Button/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUser } from "./../../Store/Actions/Auth/authAction";

export const SignUpForm = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleLogin = () => {
    handleSubmit(validFormSubmit)();
  };
  const validFormSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      dispatch(signUpUser(data, history));
    } else {
      alert("Passwod is not matched!");
    }
  };
  return (
    <div>
      <div className="basic-form">
        <form className=" grid grid-cols-12 gap-y-3">
          <div className="form-group col-span-12">
            <input
              type={"text"}
              className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Name"}
              {...register("username", {
                required: true,
                maxLength: 15,
                minLength: 3
              })}
            />
          </div>
          <div className="form-group col-span-12">
            <input
              type={"email"}
              className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Email"}
              {...register("email", {
                required: true,
                maxLength: 20,
                minLength: 10
              })}
            />
          </div>
          <div className="form-group col-span-12">
            <input
              type={"password"}
              className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Password"}
              {...register("password", {
                required: true,
                maxLength: 12,
                minLength: 8
              })}
            />
          </div>
          <div className="form-group col-span-12">
            <input
              type={"password"}
              className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3 rounded-lg"
              style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
              placeholder={"Confirm Password"}
              {...register("confirmPassword", {
                required: true,
                maxLength: 12,
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
