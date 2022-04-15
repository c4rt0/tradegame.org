import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllStocks } from "../../../../../Store/Actions/Stock/stocksAction";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { getUserById } from "../../../../../Store/Actions/Auth/authAction";
import { createWatchListItem } from "./../../../../../Store/Actions/Stock/stocksAction";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
export const WatchList = () => {
  const [watchListData, setWatchListData] = useState({});
  let dispatch = useDispatch();
  const [stocksData, setStocksData] = useState({});
  const [searchedStocks, setSearchedStocks] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const stocks = useSelector((state) => state.stock.stocksList);

  useEffect(() => {
    dispatch(getAllStocks());
    const userId = localStorage.getItem("userId");
    dispatch(getUserById(userId));
    setWatchListData([]);
  }, [dispatch]);

  useEffect(() => {
    if (stocks) {
      setStocksData(stocks);
    }
  }, [stocks]);
  useEffect(() => {
    if (user && user.whishlist) {
      setWatchListData([]);
      if (stocksData && stocksData.length) {
        let arr = [];
        stocksData.some((item) => {
          if (user.whishlist.includes(item.symbol)) {
            arr.push(item);
          }
          return 0;
        });
        setWatchListData(arr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSearch = (value) => {
    setSearchedStocks([]);
    if (value) {
      let res = stocksData.filter(
        (item) => item.symbol.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setSearchedStocks(res);
    } else {
      setSearchedStocks([]);
    }
  };

  const onAddWatchList = (sym) => {
    const userId = localStorage.getItem("userId");
    if (watchListData) {
      let isSym = watchListData.find((item) => item.symbol === sym);
      if (isSym) {
        alert(`${sym}  is already added!`);
      } else {
        dispatch(createWatchListItem({ id: userId, symbol: sym, isAdd: true }));
      }
    } else {
      dispatch(createWatchListItem({ id: userId, symbol: sym, isAdd: true }));
    }
    setSearchedStocks([]);
  };

  const onDelateWatchList = (sym) => {
    const userId = localStorage.getItem("userId");
    dispatch(createWatchListItem({ id: userId, symbol: sym, isAdd: false }));
    setSearchedStocks([]);
  };
  return (
    <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-4 bg-white flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Watchlist</h1>
        <button
          onClick={(e) => {
            onAddWatchList(e.target.value);
          }}
          className="bg-gray_100 rounded-md px-4  py-2 text-xs"
        >
          Done
        </button>
      </div>
      <input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="border-b-1 border-gray_100 text-sm w-full p-2"
        placeholder="Search and add a stock"
      />
      <div className="mt-5">
        <h4 className="text-xs text-gray_400 mb-3">Stocks</h4>
        {searchedStocks && searchedStocks.length > 0 && (
          <div className="flex flex-col gap-y-3">
            {searchedStocks.map((data, ind) => (
              <div key={ind + 1} className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{data.symbol}</h3>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm">$ {data.price}</span>
                  <AddCircleOutlineIcon
                    onClick={() => {
                      onAddWatchList(data.symbol);
                    }}
                    style={{
                      fontSize: "20px",
                      color: "#FBBF24",
                      cursor: "pointer"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!searchedStocks.length && watchListData.length ? (
          <div className="flex flex-col gap-y-3">
            {watchListData.map((data, ind) => (
              <div key={ind + 1} className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{data.symbol}</h3>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm">$ {data.price}</span>
                  <RemoveCircleOutlineIcon
                    onClick={() => {
                      onDelateWatchList(data.symbol);
                    }}
                    style={{
                      fontSize: "20px",
                      color: "#9CA3AF",
                      cursor: "pointer"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
