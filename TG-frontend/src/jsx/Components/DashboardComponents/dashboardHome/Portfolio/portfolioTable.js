import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import TableHeader from "../../../SubComponents/Table/TableHeader";
import { portfolioColumns } from "./portfolioColumns";

export const PortfolioTable = () => {
  const user = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));

    setInterval(() => {}, 1000 * 60 * 60);
  }, [dispatch]);
  useEffect(() => {
    if (user && user.portfolio) {
      let arr = [];
      Object.keys(user.portfolio).forEach((data) => {
        let obj = { ...user.portfolio[data], symbol: data };
        arr.push(obj);
      });
    }
  }, [user]);

  return (
    <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-0">
      <div className="p-4 w-full bg-white">
        <h1 className="font-semibold text-xl">Portfolio</h1>
      </div>
      <table className="overflow-auto w-full">
        <thead className="bg-gray_50 shadow-sm text-black font-normal">
          <TableHeader
            colNames={portfolioColumns}
            border={"border-0"}
            borderColor={""}
            font={"font-semibold"}
          />
        </thead>
        <tbody className="bg-white text-gray_500 text-sm text-center">
          <tr className="cursor-pointer hover:bg-gray_50">
            <td className="px-4 py-5 font-bold">AAPL</td>
            <td className="px-4 py-5 gap-x-4">15:00</td>
            <td className="px-4 py-5">3</td>
            <td className="px-4 py-5">35$</td>
            <td className="px-4 py-5">$75</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
