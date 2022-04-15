import React from "react";

export const ResetConfirmModal = (props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-y-10">
      <h3 className="text-2xl">Are you sure to reset your account?</h3>

      <dv className="flex justify-end gap-x-4">
        <button
          onClick={() => {
            props.setOpenModal(false);
          }}
          className="text-red_500 border-1 border-red_500 font-semibold shadow-2xl outline-none rounded-full px-5 py-2"
        >
          No
        </button>
        <button
          onClick={() => {
            props.resetUser();
          }}
          className="text-green_900 font-semibold shadow-2xl border-1 border-green_900 outline-none rounded-full px-5 py-2"
        >
          Yes
        </button>
      </dv>
    </div>
  );
};
