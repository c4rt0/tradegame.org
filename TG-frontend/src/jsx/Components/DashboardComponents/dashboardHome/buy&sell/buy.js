import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAnOrder } from "../../../../../Store/Actions/Order/orderAction";
import { useForm } from "react-hook-form";
import { getAllStocks } from "../../../../../Store/Actions/Stock/stocksAction";

export const Buy = () => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const [showDropButtons, setShowDropButtons] = useState(false);
  const [stocksData, setStocksData] = useState([]);
  const [stockPrice, setStockPrice] = useState(0);
  const [estimatedPrice, setExtimatedPrice] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  let dispatch = useDispatch();

  const stocks = useSelector((state) => state.stock.stocksList);

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  useEffect(() => {
    if (stocks) {
      setStocksData(stocks);
    }
  }, [stocks]);

  const Submit = (e) => {
    handleSubmit(onPlaceOrder)();
  };
  const onPlaceOrder = (data) => {
    let sh = parseInt(data.shares);
    if (sh > 0) {
      data = {
        ...data,
        shares: sh,
        is_buy: true,
        symbol: data.symbol.toUpperCase()
      };
      dispatch(CreateAnOrder(data));
      reset();
      setShowDropButtons(false);
    } else {
      alert("Negative Number is not allowed!");
      reset();
      setShowDropButtons(false);
    }
  };

  const onChangeSymbol = (value) => {
    setSymbol(value);
    if (stocksData) {
      stocksData.find((item) => {
        if (item.symbol.toLowerCase() === value.toLowerCase()) {
          setStockPrice(item.price);
        }
        return 0;
      });
    }
  };

  const onChangeQuantity = (value) => {
    setQuantity(value);
    if (stockPrice) {
      let a = stockPrice * value;
      setExtimatedPrice(a);
    }
  };
  return (
    <div className="basic-form">
      <form className="flex flex-col gap-y-5 mt-4">
        <div className="flex items-center gap-x-20">
          <div className="flex flex-col">
            <label className="text-sm">Symbol</label>
            <input
              className="form-control input-default border-b-1 border-gray_100 text-sm w-32"
              placeholder="Enter here"
              {...register("symbol", {
                required: true,
                maxLength: 15,
                minLength: 1,
                onChange: (e) => {
                  onChangeSymbol(e.target.value);
                }
              })}
            />
          </div>
          {stockPrice && stockPrice > 0 ? (
            <div className="flex flex-col">
              <label className="text-sm">Market Price</label>
              <span>$ {stockPrice}</span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-semibold">Order Type</label>
          <select
            className="form-control input-default border-1 border-gray_100 text-md"
            {...register("orderType", { required: false })}
          >
            <option>Market</option>
            <option>Limit</option>
            <option>Stop</option>
          </select>
        </div>
        <div className="flex items-center gap-x-20 w-full">
          <div className="flex flex-col">
            <label className="text-sm">Quantity</label>
            <input
              type="number"
              min="0"
              className="form-control input-default  border-b-1 border-gray_100 text-md w-32"
              {...register("shares", {
                value: "0",
                required: true,
                onChange: (e) => {
                  onChangeQuantity(e.target.value);
                }
              })}
            />
          </div>
          {estimatedPrice && estimatedPrice > 0 ? (
            <div className="flex flex-col">
              <label className="text-sm">Estimated Price</label>
              <span>$ {estimatedPrice.toFixed(2)}</span>
            </div>
          ) : null}
        </div>
      </form>
      {showDropButtons && symbol && quantity ? (
        <div className="flex flex-col items-center mt-5">
          <p className="text-md">Are you sure you want to place this order?</p>
          <p className="text-md">
            Market Buy for {quantity} of {symbol}
          </p>
          <p className="text-md">
            If so, press <span className="font-semibold">Confirm Order</span> to
            place your trade.
          </p>
          <div className="flex gap-2 items-center ">
            <button
              className="bg-gray_100 rounded-lg w-52 py-2 text-sm mt-5"
              onClick={() => {
                setShowDropButtons(false);
              }}
            >
              Edit
            </button>
            <button
              className="bg-yellow_400 rounded-lg w-52 py-2 text-sm mt-5"
              onClick={() => {
                Submit();
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-yellow_400 rounded-lg w-2/5 py-2 text-sm mt-5"
          onClick={() => {
            setShowDropButtons(true);
          }}
        >
          Review Order
        </button>
      )}
    </div>
  );
};
