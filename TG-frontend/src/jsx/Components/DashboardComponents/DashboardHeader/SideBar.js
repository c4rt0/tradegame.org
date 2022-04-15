import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import MetisMenu from "@metismenu/react";
import "metismenujs/dist/metismenujs.css";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useDispatch } from "react-redux";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";
import { Logout } from "../../../../Store/Actions/Auth/authAction";

const SideBar = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const onLogout = () => {
    dispatch(Logout(history));
  };

  return (
    <div
      className={`${
        props.show ? "block w-full fixed z-10" : "hidden"
      }  lg:block bg-gray_200 z-10 w-80 h-full pb-20`}
    >
      <div className="hidden lg:block px-8 py-6 flex justify-center items-center bg-gray_200 ">
        <NavLink
          to={"/loading"}
          className="text-black md:text-3xl font-bold font-sans"
        >
          tradegame.org
        </NavLink>
      </div>
      <div
        className="flex justify-end lg:hidden p-4 text-red_600"
        onClick={() => {
          props.setShow(false);
        }}
      >
        <CloseOutlinedIcon />
      </div>
      <div className="h-full overflow-y-auto py-4">
        <MetisMenu toggle={true}>
          <li>
            <NavLink to="dashboard" exact className="main">
              <DashboardRoundedIcon
                style={{ fontSize: "20px", marginRight: "8px" }}
              ></DashboardRoundedIcon>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="ranking" exact className="main">
              <LoyaltyRoundedIcon
                style={{ fontSize: "20px", marginRight: "8px" }}
              ></LoyaltyRoundedIcon>
              <span>Ranking</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="info" exact className="main">
              <LoyaltyRoundedIcon
                style={{ fontSize: "20px", marginRight: "8px" }}
              ></LoyaltyRoundedIcon>
              <span>Info</span>
            </NavLink>
          </li>
        </MetisMenu>

        <div
          onClick={() => onLogout()}
          className="text-red_900 py-3 px-6 mx-8 flex items-center gap-3 hover:bg-gray_50 rounded-lg text-lg font-semibold"
        >
          <PowerSettingsNewOutlinedIcon
            style={{ fontSize: "18px" }}
          ></PowerSettingsNewOutlinedIcon>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
