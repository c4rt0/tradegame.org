import React, { useState, useEffect } from "react";
import Layout from "../../Components/DashboardComponents/Layout/Layout";
import { PortfolioTable } from "../../Components/DashboardComponents/dashboardHome/Portfolio/portfolioTable";
import { OrdersTable } from "../../Components/DashboardComponents/dashboardHome/OrderHistory/ordersTable";
import { BuyAndSell } from "../../Components/DashboardComponents/dashboardHome/buy&sell/Buy&Sell";
import { WatchList } from "../../Components/DashboardComponents/dashboardHome/WatchList/watchList";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "./../../../Store/Actions/Auth/authAction";
import StockChart from "../../Components/DashboardComponents/dashboardHome/Chart/chart";
import { getAllStocks } from "../../../Store/Actions/Stock/stocksAction";
export const DashboardHome = () => {
  const [usersData, setUsersData] = useState({});
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [latestPortfolio, setLatestPortfolio] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const stocks = useSelector((state) => state.stock.stocksList);
  let dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
    setInterval(() => {
      dispatch(getAllStocks());
    }, 1000 * 60 * 60);
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setUsersData(user);
      if (user.portfolio) {
        let arr = [];
        Object.keys(user.portfolio).forEach((data) => {
          let obj = { ...user.portfolio[data], symbol: data };
          arr.push(obj);
        });
        setUserPortfolio(arr);
      }
      dispatch(getAllStocks());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (stocks) {
      if (userPortfolio && userPortfolio.length) {
        let arr = [];
        userPortfolio.forEach((data) => {
          let stock = stocks.find((d) => d.symbol === data.symbol);
          let obj = { ...data, price: stock.price };
          arr.push(obj);
        });
        setLatestPortfolio(arr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);

  const handleTotalPortfolio = () => {
    var a = 0;
    if (latestPortfolio && latestPortfolio.length) {
      latestPortfolio.forEach((data) => {
        let b = data.price * data.shares;
        a = a + b;
      });
      let t = a + usersData.cash;
      return t.toFixed(2);
    } else {
      return 100000;
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg text-black font-semibold">
              $ {usersData.cash && usersData.cash.toFixed(2)}
            </h3>
            <h3 className="text-sm text-black font-semibold">Equity</h3>
          </div>
          <div className="flex items-center gap-x-3">
            <h3 className="text-xl text-black font-semibold">
              $ {handleTotalPortfolio()}
            </h3>
            <h3 className="text-lg text-black font-semibold">
              Total Portfolio
            </h3>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center gap-x-3 items-end justify-end">
            {/* <h3 className="text-md text-black font-semibold">0.00 %</h3> */}
            <h3 className="text-sm text-black font-semibold">
              {/* Total Portfolio */}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 gap-x-2">
        <div className="col-span-8 flex flex-col gap-y-14">
          <StockChart />
          <PortfolioTable />
          <OrdersTable />
        </div>
        <div className="col-span-4 flex flex-col gap-y-2">
          <BuyAndSell />
          <WatchList />
        </div>
      </div>
    </Layout>
  );
};
