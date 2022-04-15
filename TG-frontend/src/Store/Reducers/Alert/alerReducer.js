import { ALERT_DATA } from "./../../Actions/Alert/actiontypes";

const initialData = {
  alertdata: {}
};
export function AlertReducer(state = initialData, action) {
  switch (action.type) {
    case ALERT_DATA: {
      const data = action.payload;
      return {
        ...state,
        alertdata: data
      };
    }

    default:
      return state;
  }
}
