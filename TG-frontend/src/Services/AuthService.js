import axios from "axios";
import swal from "sweetalert";
import { BaseUrl } from "../constants/constants";
export function signUp(data) {
  return axios.post(`${BaseUrl}/user/register`, data);
}

export function adminLogin(data) {
  return axios.post(`${BaseUrl}/admin/login`, data);
}
export function login(data) {
  return axios.post(`${BaseUrl}/user/login`, data);
}

export function getUser(userId) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(
    `${BaseUrl}/user/getUserByID`,
    { id: userId },
    {
      headers: {
        Authorization: `Bearer ${tokenDetailsString.replace('"', "")}`
      }
    }
  );
}
export function getAdmin(userId) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(
    `${BaseUrl}/admin/getAdminByID`,
    { id: userId },
    {
      headers: {
        Authorization: `Bearer ${tokenDetailsString.replace('"', "")}`
      }
    }
  );
}

export function updateUser(data) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(`${BaseUrl}/user/updateUser`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
}

export function updatePass(data) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  return axios.post(`${BaseUrl}/user/updateUserPassword`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
}
export function updateUserLoginStatus(data) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  const userId = localStorage.getItem("userId");
  data = { ...data, id: userId };
  return axios.post(`${BaseUrl}/user/updateUserLogin`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
}

export function getUsers() {
  return axios.get(`${BaseUrl}/user/getAllUsers`);
}

export function resetAccount(userId) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  let data = { isLogIn: true, id: userId };
  return axios.post(`${BaseUrl}/user/ressetAccount`, data, {
    headers: { Authorization: `Bearer ${tokenDetailsString.replace('"', "")}` }
  });
}

export function deleteUser(userId) {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  console.log("delete data", { id: userId });
  return axios.post(
    `${BaseUrl}/user/deleteUserById`,
    { id: userId },
    {
      headers: {
        Authorization: `Bearer ${tokenDetailsString.replace('"', "")}`
      }
    }
  );
}

export function formatError(errorResponse) {
  swal("Oops", errorResponse, "error");
  return errorResponse;
}
