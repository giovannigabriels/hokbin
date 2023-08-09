import { INPUT_ITEM, ITEM_FETCH } from "../actions/actionTypes";

const initialState = {
  items: [],
  inputItem: null,
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_FETCH:
      return { ...state, items: action.payload };
    case INPUT_ITEM:
      return { ...state, inputItem: action.payload };

    default:
      return state;
  }
}
export default itemReducer;
