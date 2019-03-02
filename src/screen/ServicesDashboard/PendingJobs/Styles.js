import { Dimensions, StyleSheet } from "react-native";

import { Colors } from "../../../constants/index";
const { width, height } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  serviceContainer: {
    width: width * 0.96,
    height: height * 0.16,
    borderWidth: 1,
    margin: height * 0.005,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  serviceImageContainer: {
    height: height * 0.14,
    width: "90%",
    marginLeft: height * 0.01,
    borderColor: Colors.primaryLight,
    borderRadius: 6,
    borderWidth: 1
  },
  serviceImage: {
    width: "100%",
    height: "100%",
    borderColor: Colors.primaryLight,
    borderRadius: 6,
    borderWidth: 0.1
  },
  txtContainer: {
    height: height * 0.14,
    alignItems: "flex-start"
  },
  innerTxt: {
    color: Colors.gray
  },
  serviceTimeContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    flex: 0.8
  },
  timeTxt: {
    color: Colors.grey,
    fontSize: 10,
    marginTop: 10
  },
  dividerTxt: {
    color: Colors.grey
  }
});
