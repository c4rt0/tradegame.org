import React, { useState, useEffect } from "react";
import TableHeader from "../../SubComponents/Table/TableHeader";
import { rankingColumns } from "./rankingColumns";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersList } from "../../../../Store/Actions/Auth/authAction";
import { getAllStocks } from "../../../../Store/Actions/Stock/stocksAction";
import { DataRefresh } from "../../../../constants/constants";
export const RankingTable = () => {
  const [usersList, setUsersList] = useState([]);
  let [previousValues, setPreviousValues] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  let dispatch = useDispatch();

  const users = useSelector((state) => state.auth.usersList);
  const stocks = useSelector((state) => state.stock.stocksList);
  useEffect(() => {
    setPreviousValues([]);
    dispatch(getAllUsersList());
    dispatch(getAllStocks());
    setInterval(() => {
      dispatch(getAllStocks());
    }, 1000 * 60 * DataRefresh);
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length) {
      const sorted = users.sort((a, b) => b - a);
      if (sorted && sorted.length) {
        let arr = [];
        sorted.forEach((elem, ind) => {
          let data = { ...elem, position: ind + 1 };
          arr.push(data);
        });
        setUsersList(arr);
      }
    }
  }, [users]);

  useEffect(() => {
    if (stocks) {
      setAllStocks(stocks);
    }
  }, [stocks]);

  useEffect(() => {}, [usersList]);
  const handleTotalPortfolio = (data) => {
    var a = 0;
    if (data && data.portfolio) {
      if (allStocks && allStocks.length) {
        Object.keys(data.portfolio).forEach((elem) => {
          let stock = allStocks.find((d) => d.symbol === elem);
          let b = stock.price * data.portfolio[elem].shares;
          a = a + b;
        });
      }
    }
    return a + data.cash;
  };
  const totalInvestedcapital = (user) => {
    let a = handleTotalPortfolio(user) - user.cash;
    return a;
  };

  const previousPosition = (user) => {
    let res = previousValues.find((elem) => elem.id === user._id.$oid);
    return res;
  };

  const changeOfSessions = (user) => {
    let DaysBefore;
    let x = [];
    if (user && user.history) {
      Object.keys(user.history).forEach((elem) => {
        x.push(user.history[elem]);
      });
    }

    let y = [];
    if (user && user.portfolio) {
      Object.keys(user.portfolio).forEach((elem) => {
        let obj = { ...user.portfolio[elem], symbol: elem };
        y.push(obj);
      });
    }
    if (user) {
      DaysBefore = moment(user.created).format("L");
    }
    let TodayDate = Date.now();
    let a = 0;
    let d = 0;
    if (x && x.length) {
      let result1 = x.filter((ele) => {
        let z;
        if (ele.isBuy) {
          z = moment(ele.buy_timestamp).format("L");
        } else {
          z = moment(ele.sell_timestamp).format("L");
        }
        return z === DaysBefore;
      });
      let result2 = x.filter((ele) => {
        let z;
        if (ele.isBuy) {
          z = moment(ele.buy_timestamp).format("L");
        } else {
          z = moment(ele.sell_timestamp).format("L");
        }
        return z === moment(TodayDate).format("L");
      });

      if (result1.length) {
        y.forEach((yd) => {
          let filterd = result1.filter((f) => f.symbol === yd.symbol);
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
            if (latestObj.isBuy) {
              let b = latestObj.buy * latestObj.remainingShares;
              a = a + b;
            } else {
              let b = latestObj.sell * latestObj.remainingShares;
              a = a + b;
            }
          }
        });
      }
      if (result2.length) {
        y.forEach((yd) => {
          let filterd = result2.filter((f) => f.symbol === yd.symbol);
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
            if (allStocks.length) {
              let stock = allStocks.find((d) => d.symbol === latestObj.symbol);
              let b = stock.price * latestObj.remainingShares;
              d = d + b;
            }
          }
        });
      }
      let latestObj1 = result1.sort(
        (a, b) =>
          (b.isBuy
            ? new Date(b.buy_timestamp).getTime()
            : new Date(b.sell_timestamp).getTime()) -
          (a.isBuy
            ? new Date(a.buy_timestamp).getTime()
            : new Date(a.sell_timestamp).getTime())
      )[0];
      let latestObj2 = result2.sort(
        (a, b) =>
          (b.isBuy
            ? new Date(b.buy_timestamp).getTime()
            : new Date(b.sell_timestamp).getTime()) -
          (a.isBuy
            ? new Date(a.buy_timestamp).getTime()
            : new Date(a.sell_timestamp).getTime())
      )[0];

      let beforePortfolio = 0;
      let todayPortfolio = 0;
      if (latestObj1) {
        beforePortfolio = a + latestObj1.remainingCash;
      }
      if (latestObj2) {
        todayPortfolio = d + latestObj2.remainingCash;
      }
      if (beforePortfolio > 0 && todayPortfolio > 0) {
        var portfoliochnage;
        if (a > 0) {
          portfoliochnage = todayPortfolio - beforePortfolio;
        }
        let totalPercentageOfChangeOfSessions =
          (portfoliochnage * 100) / todayPortfolio;
        return totalPercentageOfChangeOfSessions
          ? totalPercentageOfChangeOfSessions
          : 0;
      }
    }
  };
  const filterSerach = (val) => {
    let result = usersList.filter(
      (elem) => elem.username.toUpperCase().indexOf(val.toUpperCase()) !== -1
    );
    setSearchedData(result);
  };
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-x-4">
          <input
            type="text"
            min={0}
            onChange={(e) => {
              filterSerach(e.target.value);
            }}
            className="border-0 outline-none px-4 py-3 w-96 bg-gray_50"
            placeholder="Search user"
          />
          <button
            onClick={() => {
              setSearchedData([]);
            }}
            className="bg-black text-yellow_400 px-6 py-3 rounded-md text-sm"
          >
            Reset Search
          </button>
        </div>
      </div>
      <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-0">
        <div className="p-4 w-full bg-white">
          <h1 className="font-semibold text-xl">Ranking</h1>
        </div>
        <table className="overflow-auto w-full">
          <thead className="bg-gray_50 shadow-sm text-black font-normal">
            <TableHeader
              colNames={rankingColumns}
              border={"border-0"}
              borderColor={""}
              font={"font-semibold"}
            />
          </thead>
          <tbody className="bg-white text-gray_500 text-sm text-center">
            {searchedData && searchedData.length > 0
              ? searchedData.map((user, index) => (
                  <tr
                    key={index + 1}
                    className="cursor-pointer hover:bg-gray_50"
                  >
                    <td className="px-4 py-5 font-bold">{user.position}</td>
                    <td className="px-4 py-5 gap-x-4">{user.username}</td>
                    <td className="px-4 py-5">
                      $ {handleTotalPortfolio(user).toFixed(2)}
                    </td>
                    <td className="px-4 py-5">
                      {totalInvestedcapital(user).toFixed(2)}
                    </td>
                    <td
                      className={`${
                        previousValues &&
                        previousValues.indexOf(previousPosition(user)) + 1 > 0
                          ? "text-green_900"
                          : previousValues &&
                            previousValues.indexOf(previousPosition(user)) + 1 <
                              0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {(
                        previousValues &&
                        previousValues.indexOf(previousPosition(user)) + 1
                      ).toFixed(2)}
                    </td>
                    <td
                      className={`${
                        (previousValues &&
                          previousValues.indexOf(previousPosition(user)) +
                            1 -
                            user.position) > 0
                          ? "text-green_900"
                          : (previousValues &&
                              previousValues.indexOf(previousPosition(user)) +
                                1 -
                                user.position) < 0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {previousValues &&
                        previousValues.indexOf(previousPosition(user)) +
                          1 -
                          user.position}
                    </td>
                    <td
                      className={`${
                        changeOfSessions(user) > 0
                          ? "text-green_900"
                          : changeOfSessions(user) < 0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {changeOfSessions(user)
                        ? changeOfSessions(user).toFixed(2)
                        : 0}
                      %
                    </td>
                  </tr>
                ))
              : usersList &&
                usersList.length > 0 &&
                usersList.map((user, index) => (
                  <tr
                    key={index + 1}
                    className="cursor-pointer hover:bg-gray_50"
                  >
                    <td className="px-4 py-5 font-bold">{user.position}</td>
                    <td className="px-4 py-5 gap-x-4">{user.username}</td>
                    <td className="px-4 py-5">
                      $ {handleTotalPortfolio(user).toFixed(2)}
                    </td>
                    <td className="px-4 py-5">
                      {totalInvestedcapital(user).toFixed(2)}
                    </td>
                    <td
                      className={`${
                        previousValues &&
                        previousValues.indexOf(previousPosition(user)) + 1 > 0
                          ? "text-green_900"
                          : previousValues &&
                            previousValues.indexOf(previousPosition(user)) + 1 <
                              0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {previousValues &&
                        previousValues.indexOf(previousPosition(user)) + 1}
                    </td>
                    <td
                      className={`${
                        (previousValues &&
                          previousValues.indexOf(previousPosition(user)) +
                            1 -
                            user.position) > 0
                          ? "text-green_900"
                          : (previousValues &&
                              previousValues.indexOf(previousPosition(user)) +
                                1 -
                                user.position) < 0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {previousValues &&
                      previousValues.indexOf(previousPosition(user)) !== -1
                        ? previousValues.indexOf(previousPosition(user)) +
                          1 -
                          user.position
                        : 0}
                    </td>
                    <td
                      className={`${
                        changeOfSessions(user) > 0
                          ? "text-green_900"
                          : changeOfSessions(user) < 0
                          ? "text-red_500"
                          : "text-black"
                      } px-4 py-5 text-md font-semibold`}
                    >
                      {changeOfSessions(user)
                        ? changeOfSessions(user).toFixed(2)
                        : 0}
                      %
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
