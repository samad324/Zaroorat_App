import { Constants } from "expo";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight
  }
};
