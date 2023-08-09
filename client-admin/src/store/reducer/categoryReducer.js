import { CATEGORY_FETCH, INPUT_CATEGORY } from "../actions/actionTypes";

const initialState = {
  categories: [],
  inputCategory: null,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_FETCH:
      return { ...state, categories: action.payload };
    case INPUT_CATEGORY:
      return { ...state, inputCategory: action.payload };
    default:
      return state;
  }
}
export default categoryReducer;
