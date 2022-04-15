import {
  AUTH_USER,
  USER_ID,
  USERS_LIST
} from "./../../Actions/Auth/actionTypes";

const initialData = {
  user: {},
  userId: "",
  usersList: []
};
export function AuthReducer(state = initialData, action) {
  switch (action.type) {
    case AUTH_USER: {
      const data = action.payload;
      return {
        ...state,
        user: data
      };
    }
    case USER_ID: {
      const data = action.payload;
      return {
        ...state,
        userId: data
      };
    }
    case USERS_LIST: {
      const data = action.payload;
      return {
        ...state,
        usersList: data
      };
    }
    default:
      return state;
  }
}
