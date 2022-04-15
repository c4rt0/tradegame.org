import React, { useEffect } from "react";
import Layout from "../../Components/DashboardComponents/Layout/Layout";
import { PortfolioTable } from "../../Components/DashboardComponents/dashboardHome/Portfolio/portfolioTable";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "./../../../Store/Actions/Auth/authAction";

export const DashboardHome = () => {
  const user = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
    setInterval(() => {}, 1000 * 60 * 60);
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      if (user.portfolio) {
        let arr = [];
        Object.keys(user.portfolio).forEach((data) => {
          let obj = { ...user.portfolio[data], symbol: data };
          arr.push(obj);
        });
      }
    }
  });

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg text-black font-semibold">$ 100,000</h3>
            <h3 className="text-sm text-black font-semibold">Equity</h3>
          </div>
          <div className="flex items-center gap-x-3">
            <h3 className="text-xl text-black font-semibold">$ 100,000</h3>
            <h3 className="text-lg text-black font-semibold">
              Total Portfolio
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 gap-x-2">
        <div className="col-span-8 flex flex-col gap-y-14">
          <PortfolioTable />
        </div>
        <div className="col-span-4 flex flex-col gap-y-2"></div>
      </div>
    </Layout>
  );
};
