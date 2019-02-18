import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

/**
|--------------------------------------------------
| Main Store, Responsible for Redux, react-redux and redux-persist integrations
|--------------------------------------------------
*/

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };
