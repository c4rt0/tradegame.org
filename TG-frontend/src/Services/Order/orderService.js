import axios from "axios";
import { BaseUrl } from "../../constants/constants";

export const createOrder = (data) => {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(`${BaseUrl}/trade/order`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
};
