import { combineReducers } from "redux";

import { authReducer } from "./reducers/authReducer";
import { generalReducer } from "./reducers/generalReducer";

const reducers = combineReducers({
  authReducer,
  generalReducer
});

export default reducers;
