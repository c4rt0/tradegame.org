import React from "react";
import DashboardNavbar from "./../DashboardHeader/DashboardNavbar";
import SideBar from "./../DashboardHeader/SideBar";
import AdminSideBar from "../DashboardHeader/AdminSidebar";
import { isAdminRole } from "../../../../Store/selectors/roleSelector";

const Layout = (props) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={`md:fixed w-full h-full`}>
      <div className="h-full w-full flex flex-row">
        <div>
          {isAdminRole() ? (
            <AdminSideBar
              show={show}
              setShow={setShow}
              setSubTab={props.setSubTab}
              subTab={props.subTab}
            ></AdminSideBar>
          ) : (
            <SideBar
              show={show}
              setShow={setShow}
              setSubTab={props.setSubTab}
              subTab={props.subTab}
            />
          )}
        </div>
        <div className="w-full h-full md:pb-20">
          <DashboardNavbar show={show} setShow={setShow}></DashboardNavbar>
          <div className="h-full overflow-y-auto p-4 bg-gray_50">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
