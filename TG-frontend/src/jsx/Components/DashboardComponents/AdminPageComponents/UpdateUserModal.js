import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserById,
  updateUserById
} from "../../../../Store/Actions/Auth/authAction";
import { useForm } from "react-hook-form";

export const UpdateUserModal = props => {
  let dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  useEffect(
    () => {
      if (props.data) {
        let data = {
          ...props.data,
          cash: props.data.cash && props.data.cash.toFixed(2)
        };
        reset(data);
      }
    },
    [props, reset]
  );

  const onSubmit = () => {
    handleSubmit(updateUserFunc)();
  };
  const updateUserFunc = data => {
    data = {
      username: data.username,
      email: data.email,
      id: props.data._id.$oid,
      isLogIn: props.data.isLogIn,
      cash: parseInt(data.cash)
    };
    dispatch(updateUserById(data));
    reset();
    props.setOpenModal(false);
  };

  const deleteUser = () => {
    dispatch(deleteUserById(props.data._id.$oid));
    props.setOpenModal(false);
  };
  return (
    <div className="basic-form px-10 py-6">
      <h1 className="font-bold text-black text-2xl mb-10">
        {"Update User"}
      </h1>
      <form className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6 items-end">
        <div className="form-group col-span-12">
          <label className="text-black">Username</label>
          <input
            type={"text"}
            className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3"
            style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
            placeholder={"Username"}
            {...register("username", {
              required: true,
              maxLength: 50,
              minLength: 1
            })}
          />
        </div>
        <div className="form-group col-span-12">
          <label className="text-black">Email</label>
          <input
            type={"text"}
            className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3"
            style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
            placeholder={"Email"}
            {...register("email", {
              required: true,
              maxLength: 50,
              minLength: 1
            })}
          />
        </div>

        <div className="form-group col-span-12">
          <label className="text-black">Cash</label>
          <input
            type={"text"}
            className="form-control input-default w-full py-3 px-3 shadow-xl bg-white mt-3"
            style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
            placeholder={"Cash"}
            {...register("cash", {
              required: true,
              maxLength: 50,
              minLength: 1
            })}
          />
        </div>
      </form>
      <div className="flex justify-between items-center  mt-10">
        {errors &&
          <div style={{ color: "red" }}>
            {Object.keys(errors).length > 0 && "Form is not valid!"}
          </div>}
        <div className="flex justify-end gap-x-4">
          <button
            type="submit"
            style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
            className="px-8 py-2 rounded-full text-sm duration-300 bg-yellow_400 text-white"
            onClick={() => {
              onSubmit();
            }}
          >
            {props.data ? "Update" : "Add Product"}
          </button>
          {props.data
            ? <button
                style={{ boxShadow: "-1px 2px 40px 0px rgb(203 213 225)" }}
                className="bg-black px-5 py-2 rounded-full text-yellow_400 text-sm"
                onClick={() => {
                  deleteUser();
                }}
              >
                Delete
              </button>
            : null}
        </div>
      </div>
    </div>
  );
};
