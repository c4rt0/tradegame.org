import React, { useState, useEffect } from "react";
import TableHeader from "../../../SubComponents/Table/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { ordersColumns } from "./ordersColumns";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import moment from "moment";
export const OrdersTable = () => {
  const [usersData, setUsersData] = useState({});
  const user = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
  }, [dispatch]);
  useEffect(() => {
    if (user && user.history) {
      setUsersData(user.history);
    }
  }, [user]);
  return (
    <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-0">
      <div className="p-4 w-full bg-white">
        <h1 className="font-semibold text-xl">Orders History</h1>
      </div>
      <table className="overflow-auto w-full">
        <thead className="bg-gray_50 shadow-sm text-black font-normal">
          <TableHeader
            colNames={ordersColumns}
            border={"border-0"}
            borderColor={""}
            font={"font-semibold"}
          />
        </thead>
        <tbody className="bg-white text-gray_500 text-sm text-center">
          {Object.keys(usersData).map((data, index) => (
            <tr key={index + 1} className="cursor-pointer hover:bg-gray_50">
              <td className="px-4 py-5 font-bold">{usersData[data].symbol}</td>
              <td className="px-4 py-5 gap-x-4">
                {usersData[data].isBuy === true
                  ? moment(usersData[data].buy_timestamp).format("L")
                  : moment(usersData[data].sell_timestamp).format("L")}
              </td>
              <td className="px-4 py-5">{usersData[data].shares}</td>
              <td className="px-4 py-5">
                ${" "}
                {usersData[data].isBuy === true
                  ? ` ${usersData[data].buy}`
                  : ` ${usersData[data].sell}`}
              </td>
              <td className="px-4 py-5">
                ${" "}
                {usersData[data].isBuy === true
                  ? ` ${(usersData[data].buy * usersData[data].shares).toFixed(
                      2
                    )}`
                  : ` ${(usersData[data].sell * usersData[data].shares).toFixed(
                      2
                    )}`}
              </td>
              <td className="px-4 py-5">
                {usersData[data].isBuy === true ? "Buy" : "Sell"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
