import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants";

const { height, width } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signupBtnContainer: {
    width: width,
    paddingLeft: width * 0.2,
    paddingRight: width * 0.2,
    alignItems: "center"
  },
  signupBtn: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: Colors.blue,
    marginHorizontal: 42,
    height: 56,
    position: "absolute",
    bottom: height * 0.08
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center"
  }
});
