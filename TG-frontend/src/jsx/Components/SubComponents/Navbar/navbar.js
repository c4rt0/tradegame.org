import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div
      className={`relative bg-white shadow-sm px-10 gap-3 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-end h-32 lg:h-20`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="">
          <NavLink
            to={"/dashboard"}
            className="text-yellow_400 md:text-2xl font-bold font-sans"
          >
            tradegame.org
          </NavLink>
        </div>
        <ul className="flex items-center gap-x-10">
          <li className="cursor-pointer">
            <NavLink
              to={"/"}
              className="text-black font-semibold hover:text-yellow_400 md:text-lg font-sans"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink
              to={"/"}
              className="text-black font-semibold hover:text-yellow_400 md:text-lg font-sans"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
