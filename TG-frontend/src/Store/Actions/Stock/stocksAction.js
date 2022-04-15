import {
  createWatchList,
  getStocks
} from "../../../Services/Stock/stock.service";
import { setAlertData } from "../Alert/setAlert";
import { getUserById } from "../Auth/authAction";

import { ALL_STOCKS } from "./actionTypes";

export function getAllStocks() {
  return (dispatch) => {
    getStocks()
      .then((response) => {
        dispatch(setAllStocks(response.data));
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function setAllStocks(data) {
  return {
    type: ALL_STOCKS,
    payload: data
  };
}

export function createWatchListItem(data) {
  return (dispatch) => {
    createWatchList(data)
      .then((response) => {
        dispatch(getAllStocks());
        const userId = localStorage.getItem("userId");
        dispatch(getUserById(userId));
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}
