import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import itemReducer from "./reducer/itemReducer";
import categoryReducer from "./reducer/categoryReducer";

const rootReducer = combineReducers({
  itemReducer,
  categoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
