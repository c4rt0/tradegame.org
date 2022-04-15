import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import TableHeader from "../../../SubComponents/Table/TableHeader";
import { portfolioColumns } from "./portfolioColumns";
import moment from "moment";
import { getAllStocks } from "../../../../../Store/Actions/Stock/stocksAction";
export const PortfolioTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const stocks = useSelector((state) => state.stock.stocksList);
  let dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
    dispatch(getAllStocks());
    setInterval(() => {
      dispatch(getAllStocks());
    }, 1000 * 60 * 60);
  }, [dispatch]);
  useEffect(() => {
    if (user && user.portfolio) {
      let arr = [];
      Object.keys(user.portfolio).forEach((data) => {
        let obj = { ...user.portfolio[data], symbol: data };
        arr.push(obj);
      });
      setUsersData(arr);
    }
  }, [user]);

  useEffect(() => {
    if (stocks) {
      if (usersData && usersData.length) {
        let arra = [];
        usersData.forEach((data) => {
          let stock = stocks.find((d) => d.symbol === data.symbol);
          let obj = { ...data, price: stock.price };
          arra.push(obj);
        });
        setUserPortfolio(arra);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);

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
          {userPortfolio &&
            userPortfolio.length > 0 &&
            userPortfolio.map((data, index) => (
              <tr key={index + 1} className="cursor-pointer hover:bg-gray_50">
                <td className="px-4 py-5 font-bold">{data.symbol}</td>
                <td className="px-4 py-5 gap-x-4">
                  {moment(data.time).format("L")}
                </td>
                <td className="px-4 py-5">{data.shares}</td>
                <td className="px-4 py-5">$ {data.price}</td>
                <td className="px-4 py-5">
                  $ {(data.price * data.shares).toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
