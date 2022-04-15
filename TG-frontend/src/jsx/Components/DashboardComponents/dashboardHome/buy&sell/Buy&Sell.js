import React, { useState } from "react";
import { Buy } from "./buy";
import { Sell } from "./sell";

export const BuyAndSell = () => {
  const [isBuy, setIsBuy] = useState(true);
  return (
    <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-4 bg-white">
      <div className="flex items-center">
        <button
          className={` ${
            isBuy ? "border-b-3 border-yellow_400 text-yellow_400" : null
          } w-1/2 font-semibold`}
          onClick={() => {
            setIsBuy(true);
          }}
        >
          Buy
        </button>
        <button
          className={` ${
            !isBuy ? "border-b-3 border-yellow_400 text-yellow_400" : null
          } w-1/2 font-semibold`}
          onClick={() => {
            setIsBuy(false);
          }}
        >
          Sell
        </button>
      </div>
      {isBuy ? <Buy></Buy> : <Sell></Sell>}
    </div>
  );
};
