import React from "react";
import PropTypes from "prop-types";
import { addNavigationHelpers } from "react-navigation";

import AuthScreen from "../screens/LoginScreen/LoginScreen";
import AppNavigator from "./RootNavigation";

export default function NavigatorView({ dispatch, navigatorState, authState }) {
  if (authState.isLoggedIn || authState.hasSkippedLogin) {
    return <AppNavigator />;
  }
  return <AuthScreen />;
}

NavigatorView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigatorState: PropTypes.shape({}).isRequired
};
