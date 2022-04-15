import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../../../Store/Actions/Auth/authAction";
export const UserDropDown = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const onLogout = () => {
    dispatch(Logout(history));
  };
  return (
    <div className="bg-white rounded-md absolute top-20 right-0 shadow-lg">
      <ul className="flex flex-col">
        <li className="py-3 px-4 w-60 cursor-pointer hover:bg-gray_50 flex items-center gap-x-4">
          <DraftsOutlinedIcon style={{ fontSize: "18px" }}></DraftsOutlinedIcon>
          <span>Email</span>
        </li>
        <li>
          <Link
            to="/profile"
            className="py-3 px-4 w-60 cursor-pointer hover:bg-gray_50 flex items-center gap-x-4"
          >
            <SettingsOutlinedIcon
              style={{ fontSize: "18px" }}
            ></SettingsOutlinedIcon>
            <span>Settings</span>
          </Link>
        </li>
        <li className="py-3 px-4 w-60 cursor-pointer hover:bg-gray_50 flex items-center gap-x-4">
          <DraftsOutlinedIcon style={{ fontSize: "18px" }}></DraftsOutlinedIcon>
          <span>Support</span>
        </li>
        <li
          onClick={() => {
            onLogout();
          }}
          className="py-3 px-4 w-60 cursor-pointer hover:bg-gray_50 flex items-center gap-x-4 text-red_500"
        >
          <PowerSettingsNewOutlinedIcon
            style={{ fontSize: "18px" }}
          ></PowerSettingsNewOutlinedIcon>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};
