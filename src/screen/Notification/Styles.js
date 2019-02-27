import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Styles = {
  headerStyle: {
    textAlign: "center",
    flex: 1,
    marginRight: width * 0.2
  },
  container: {
    flex: 1,
    paddingTop: height * 0.02
  }
};
