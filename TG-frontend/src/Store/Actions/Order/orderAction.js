import { createOrder } from "../../../Services/Order/orderService";
import { getUserById } from "./../Auth/authAction";

export function CreateAnOrder(data) {
  return (dispatch) => {
    createOrder(data).then((response) => {
      const userId = localStorage.getItem("userId");
      dispatch(getUserById(userId));
    });
  };
}
