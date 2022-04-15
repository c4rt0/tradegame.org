import { createOrder } from "../../../Services/Order/orderService";
import { getAllStocks } from "./../Stock/stocksAction";
import { setAlertData } from "../Alert/setAlert";
import { getUserById } from "./../Auth/authAction";

export function CreateAnOrder(data) {
  return (dispatch) => {
    createOrder(data)
      .then((response) => {
        const userId = localStorage.getItem("userId");
        dispatch(getUserById(userId));
        dispatch(getAllStocks());
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}
