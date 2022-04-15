import React, { useState } from "react";
import { Avatar } from "@progress/kendo-react-layout";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { NavLink } from "react-router-dom";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { UserDropDown } from "./UserDropdown";
import Dropdown from "./../../SubComponents/Dropdown";
import { useDispatch } from "react-redux";
import { resetUserAccount } from "../../../../Store/Actions/Auth/authAction";
import { isAdminRole } from "./../../../../Store/selectors/roleSelector";
import ModalComp from "../../SubComponents/ModalComp";
import { ResetConfirmModal } from "./resetConfirmModal";
const DashboardNavbar = (props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  let dispatch = useDispatch();

  const resetUser = () => {
    let userId = localStorage.getItem("userId");
    dispatch(resetUserAccount(userId));
    setShowModal(false);
  };
  return (
    <div
      className={`relative bg-white shadow-sm px-4 gap-3 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-end h-32 lg:h-20`}
    >
      <div className="flex lg:hidden justify-between items-center w-full">
        <div className="">
          <NavLink
            to={"/loading"}
            className="text-black md:text-2xl font-bold font-sans"
          >
            tradegame.org
          </NavLink>
        </div>
        <div
          className="block lg:hidden text-red_600 text-sm"
          onClick={() => {
            props.setShow(!props.show);
          }}
        >
          <MenuOutlinedIcon />
        </div>
      </div>
      <hr className="text-gray_200" />
      <div className="flex justify-between lg:justify-end items-center w-full gap-x-4">
        {!isAdminRole() && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="flex gap-2 px-4 py-2 items-center text-white rounded-full text-sm bg-black cursor-pointer"
            style={{ boxShadow: "-1px 2px 10px 1px lightGrey" }}
          >
            <span>Reset Account</span>
            <AddCircleOutlineOutlinedIcon
              style={{
                fontSize: "20px",
                fontWeight: "200px",
                color: "#FBBF24"
              }}
            />
          </button>
        )}
        <div className="flex items-center relative">
          <Avatar
            rounded="large"
            type="icon"
            className="overflow-hidden"
            style={{
              margin: 10
            }}
            border={true}
          >
            <div className="bg-gray_200 w-10 h-10 rounded-md  flex justify-center items-center">
              <PersonOutlineRoundedIcon
                style={{ color: "white", fontSize: "30px" }}
              />
            </div>
          </Avatar>
          <button
            className="text-gray_400 -ml-3"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <ArrowDropDownRoundedIcon style={{ fontSize: "30px" }} />
          </button>
          {showDropdown ? (
            <Dropdown show={showDropdown} setShow={setShowDropdown}>
              <UserDropDown />
            </Dropdown>
          ) : null}
        </div>
      </div>
      {showModal && (
        <ModalComp
          open={showModal}
          close={() => {
            setShowModal(false);
          }}
          width={500}
          height={300}
        >
          <ResetConfirmModal
            resetUser={resetUser}
            setOpenModal={setShowModal}
          />
        </ModalComp>
      )}
    </div>
  );
};

export default DashboardNavbar;
