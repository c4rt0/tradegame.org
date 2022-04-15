import React from "react";
import { ChevronRight } from "@material-ui/icons";
export default function ContentHeader(props) {
  return (
    <div className="pt-6 pb-16">
      <div className="flex flex-col sm:flex-row justify-between">
        <h1 className="text-2xl text-lightBlack">{props.contentHeading}</h1>
        <div className="flex items-center gap-x-1 text-gray_500">
          <div className="cursor-pointer">Dashboard</div>
          <ChevronRight style={{ fontSize: "20px" }} />
          <div className="cursor-pointer">Home</div>
        </div>
      </div>

      {/* <hr className="text-gray_200 mt-2 mb-16" /> */}
    </div>
  );
}
