import { ALL_STOCKS } from "./../../Actions/Stock/actionTypes";

const initialData = {
  stocksList: []
};
export function StockReducer(state = initialData, action) {
  switch (action.type) {
    case ALL_STOCKS: {
      const data = action.payload;
      return {
        ...state,
        stocksList: data
      };
    }
    default:
      return state;
  }
}
