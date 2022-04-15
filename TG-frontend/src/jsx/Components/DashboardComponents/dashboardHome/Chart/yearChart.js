import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import { getAllStocks } from "../../../../../Store/Actions/Stock/stocksAction";

import moment from "moment";
import "./chart.css";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
const YearChart = () => {
  const [userData, setUserData] = useState({});
  const [yearCash, setYearCash] = useState([]);
  const [yearNames, setYearNames] = useState([]);
  const [allStocks, setAllStocks] = useState([]);

  let dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const stocks = useSelector((state) => state.stock.stocksList);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
    dispatch(getAllStocks());
    setInterval(() => {
      dispatch(getAllStocks());
    }, 1000 * 60 * 60);
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  useEffect(() => {
    if (userData) {
      yearGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  useEffect(() => {
    if (stocks) {
      setAllStocks(stocks);
    }
  }, [stocks]);
  useEffect(() => {
    yearGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStocks]);
  const yearGraph = () => {
    const today = moment().add(1, "months");
    const yearMonths = Array(12)
      .fill()
      .map(() => today.subtract(1, "months").format("YYYY-MM-DD"));
    yearMonths.reverse();
    let x = [];
    if (userData && userData.history) {
      Object.keys(userData.history).forEach((elem) => {
        x.push(userData.history[elem]);
      });
    }
    let y = [];
    if (userData && userData.portfolio) {
      Object.keys(userData.portfolio).forEach((elem) => {
        y.push(elem);
      });
    }
    let mainResult = [];
    let tempDate = 1;
    yearMonths.forEach((date) => {
      let result = x.filter((elem) => {
        let z;
        if (elem.isBuy) {
          z = elem.buy_timestamp;
        } else {
          z = elem.sell_timestamp;
        }
        return moment(z).isBetween(date, yearMonths[tempDate]);
      });
      if (result.length) {
        let a = 0;
        y.forEach((yd) => {
          let filterd = result.filter((f) => f.symbol === yd);
          if (filterd.length) {
            let latestObj = filterd.sort(
              (a, b) =>
                (b.isBuy
                  ? new Date(b.buy_timestamp).getTime()
                  : new Date(b.sell_timestamp).getTime()) -
                (a.isBuy
                  ? new Date(a.buy_timestamp).getTime()
                  : new Date(a.sell_timestamp).getTime())
            )[0];

            if (date === moment(Date.now()).format("YYYY-MM-DD")) {
              let stock = allStocks.find((d) => d.symbol === latestObj.symbol);
              if (stock) {
                let b = stock.price * latestObj.remainingShares;
                a = a + b;
              }
            } else {
              if (latestObj.isBuy) {
                let b = latestObj.buy * latestObj.remainingShares;
                a = a + b;
              } else {
                let b = latestObj.sell * latestObj.remainingShares;
                a = a + b;
              }
            }
          }
        });
        let latestObj = result.sort(
          (a, b) =>
            (b.isBuy
              ? new Date(b.buy_timestamp).getTime()
              : new Date(b.sell_timestamp).getTime()) -
            (a.isBuy
              ? new Date(a.buy_timestamp).getTime()
              : new Date(a.sell_timestamp).getTime())
        )[0];
        a = a + latestObj.remainingCash;
        mainResult.push(Math.ceil(a));
      } else {
        if (!mainResult.length) {
          mainResult.push(100000);
        } else {
          mainResult.push(mainResult[mainResult.length - 1]);
        }
      }
      tempDate = tempDate + 1;
    });
    setYearNames(yearMonths);
    setYearCash(mainResult);
  };
  const data = {
    labels: yearNames && yearNames,
    datasets: [
      {
        label: "Year Portfolio",
        data: yearCash && yearCash,
        fill: false,
        backgroundColor: "#FBBF24",
        borderColor: "#FBBF24"
      }
    ]
  };
  return (
    <div className="">
      <Line className="chart" data={data} options={options} />
    </div>
  );
};

export default YearChart;
