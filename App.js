import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./screens/Index";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
