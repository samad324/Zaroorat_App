import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import { AppNavigator } from "./src/navigation";
import { Loading } from "./src/components/Loading";

/**
 |--------------------------------------------------
 | Main App with Redux provider, redux-persist PeristGate, persisitor and Firebase 🔥 Initialization
 |--------------------------------------------------
 */

// let db = firebase.firestore();
// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
