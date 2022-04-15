import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import moment from "moment";
import "./chart.css";
import { getAllStocks } from "../../../../../Store/Actions/Stock/stocksAction";

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
const MonthChart = () => {
  const [userData, setUserData] = useState({});
  const [monthCash, setMonthCash] = useState([]);
  const [monthNames, setMonthNames] = useState([]);
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
  useEffect(
    () => {
      if (user) {
        setUserData(user);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  useEffect(() => {
    if (stocks) {
      setAllStocks(stocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);
  useEffect(() => {
    if (userData) {
      monthGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  useEffect(() => {
    monthGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStocks]);
  const monthGraph = () => {
    const today = moment().add(1, "d");
    const monthDates = Array(30)
      .fill()
      .map(() => today.subtract(1, "d").format("YYYY-MM-DD"));
    monthDates.reverse();
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
    monthDates.forEach((date) => {
      let result = x.filter((elem) => {
        let z;
        if (elem.isBuy) {
          z = moment(elem.buy_timestamp).format("YYYY-MM-DD");
        } else {
          z = moment(elem.sell_timestamp).format("YYYY-MM-DD");
        }
        return z === date;
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
    });
    setMonthNames(monthDates);
    setMonthCash(mainResult);
  };
  const data = {
    labels: monthNames && monthNames,
    datasets: [
      {
        label: "Month Portfolio",
        data: monthCash && monthCash,
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

export default MonthChart;
