import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Styles = {
  pickerConatiner: {
    width: width,
    height: height * 0.1
  }
};
