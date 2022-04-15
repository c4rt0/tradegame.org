import axios from "axios";
import { BaseUrl } from "../../constants/constants";

export const getStocks = async () => {
  return axios.post(`${BaseUrl}/trade/stocks`);
};

export const createWatchList = async (data) => {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(`${BaseUrl}/user/addWhishlist`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
};
