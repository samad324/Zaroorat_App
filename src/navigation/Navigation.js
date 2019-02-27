import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screen/Login/Login";

const Login = createStackNavigator({
  Login: { screen: LoginScreen }
});

export default createAppContainer(Login);
