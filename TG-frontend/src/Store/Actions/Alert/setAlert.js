import { ALERT_DATA } from "./actiontypes";
export function setAlertData(data) {
  return {
    type: ALERT_DATA,
    payload: data
  };
}
