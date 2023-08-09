import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import itemReducer from "./reduces/itemReducer";
import userReducer from "./reduces/userReducer";

// const initialState = {
//   items: [],
//   isLogin: true,
//   recomends: [],
//   oneItem: {},
// };

// function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case RECOMEND_ITEM_FETCH:
//       return { ...state, recomends: action.payload };
//     case ONE_ITEM_FETCH:
//       return { ...state, oneItem: action.payload };
//     case MENU_ITEM_FETCH:
//       return { ...state, items: action.payload };
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  itemReducer,
  userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
