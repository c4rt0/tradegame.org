import {
  signUp,
  login,
  getUser,
  getAdmin,
  adminLogin,
  updateUser,
  updateUserLoginStatus,
  getUsers,
  updatePass,
  resetAccount,
  deleteUser
} from "./../../../Services/AuthService";
import { setAlertData } from "../Alert/setAlert";
import { AUTH_USER, USER_ID, USERS_LIST } from "./actionTypes";
export function signUpUser(data, history) {
  return (dispatch) => {
    signUp(data)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function loginUser(data, history) {
  return (dispatch) => {
    login(data)
      .then((response) => {
        dispatch(setUserId(response.data.user_id));
        localStorage.setItem(
          "tokenDetails",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem("userId", response.data.user_id);
        let data = { isLogIn: true };
        updateUserLoginStatus(data).then((res) => {
          history.push("/dashboard");
        });
      })
      .catch((error) => {
        adminLogin(data)
          .then((response) => {
            dispatch(setUserId(response.data.user_id));
            localStorage.setItem(
              "tokenDetails",
              JSON.stringify(response.data.token)
            );
            localStorage.setItem("userId", response.data.user_id);
            localStorage.setItem("isAdmin", "true");
            history.push("/admin-page");
          })
          .catch((error) => {
            console.log(error);
            dispatch(
              setAlertData({
                color: "red",
                msg: "Invalid Credentials, Login failed!",
                show: true
              })
            );
          });
      });
  };
}

export function setUserId(data) {
  return {
    type: USER_ID,
    payload: data
  };
}
export function Logout(history) {
  return (dispatch) => {
    let data = { isLogIn: false };
    updateUserLoginStatus(data).then((res) => {
      localStorage.removeItem("tokenDetails");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      dispatch(setUserData(null));
      dispatch(setUserId(null));
      history.push("/");
    });
  };
}

export function getUserById(userId) {
  return (dispatch) => {
    getUser(userId)
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}
export function setUserData(data) {
  return {
    type: AUTH_USER,
    payload: data
  };
}

export function getAdminById(userId) {
  return (dispatch) => {
    getAdmin(userId)
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function updateUserById(data) {
  return (dispatch) => {
    updateUser(data)
      .then((response) => {
        dispatch(getUserById(data.id));
        dispatch(getAllUsersList());
        dispatch(
          setAlertData({
            color: "green",
            msg: "User has been updated!",
            show: true
          })
        );
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function updateUserPassword(data) {
  return (dispatch) => {
    updatePass(data)
      .then((response) => {
        dispatch(getUserById(data.id));
        dispatch(
          setAlertData({
            color: "green",
            msg: "User password has been updated!",
            show: true
          })
        );
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}
export function getAllUsersList() {
  return (dispatch) => {
    getUsers()
      .then((response) => {
        let data = response.data;
        dispatch(setUsersList(data));
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function setUsersList(data) {
  return {
    type: USERS_LIST,
    payload: data
  };
}

export function resetUserAccount(id) {
  return (dispatch) => {
    resetAccount(id)
      .then((response) => {
        dispatch(getUserById(id));
        dispatch(getAllUsersList());
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}

export function deleteUserById(userId) {
  return (dispatch) => {
    deleteUser(userId)
      .then((response) => {
        dispatch(getAllUsersList());
      })
      .catch((error) => {
        dispatch(
          setAlertData({ color: "red", msg: error.message, show: true })
        );
      });
  };
}
