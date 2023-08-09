import {
  MENU_ITEM_FETCH,
  ONE_ITEM_FETCH,
  RECOMEND_ITEM_FETCH,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  recomends: [],
  oneItem: {},
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case RECOMEND_ITEM_FETCH:
      return { ...state, recomends: action.payload };
    case ONE_ITEM_FETCH:
      return { ...state, oneItem: action.payload };
    case MENU_ITEM_FETCH:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export default itemReducer;
