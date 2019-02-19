import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";

const reducers = combineReducers({
  authReducer
});

export default reducers;
