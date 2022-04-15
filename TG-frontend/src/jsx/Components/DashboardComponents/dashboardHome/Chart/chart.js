import React, { useState } from "react";
import MonthChart from "./monthChart";
import WeekChart from "./weekChart";
import YearChart from "./yearChart";
const StockChart = () => {
  const [tab, setTab] = useState("WEEK");
  return (
    <div className="">
      <div className="flex items-center">
        <button
          className={` ${
            tab === "WEEK"
              ? "border-t-3 border-yellow_400 text-yellow_400"
              : null
          } w-1/2 font-semibold`}
          onClick={() => {
            setTab("WEEK");
          }}
        >
          WEEK
        </button>
        <button
          className={` ${
            tab === "MONTH"
              ? "border-t-3 border-yellow_400 text-yellow_400"
              : null
          } w-1/2 font-semibold`}
          onClick={() => {
            setTab("MONTH");
          }}
        >
          MONTH
        </button>
        <button
          className={` ${
            tab === "YEAR"
              ? "border-t-3 border-yellow_400 text-yellow_400"
              : null
          } w-1/2 font-semibold`}
          onClick={() => {
            setTab("YEAR");
          }}
        >
          YEAR
        </button>
      </div>

      {tab === "WEEK" ? <WeekChart></WeekChart> : null}
      {tab === "MONTH" ? <MonthChart></MonthChart> : null}
      {tab === "YEAR" ? <YearChart></YearChart> : null}
    </div>
  );
};

export default StockChart;
