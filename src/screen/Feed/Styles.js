import { Dimensions } from "react-native";

import { Colors, Fonts } from "../../constants/index";

const { width, height } = Dimensions.get("window");

export const Styles = {
  menuBtn: {
    marginLeft: 10
  },
  headerStyle: {
    textAlign: "center",
    flex: 1
  },
  norBtn: {
    marginRight: 10
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  loaderStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tile: {
    height: height * 0.16,
    width: width * 0.314,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: height * 0.005,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5
  },
  tileImg: {
    width: width * 0.24,
    height: height * 0.1,
    alignSelf: "center"
  },
  text: {
    color: Colors.primary,
    fontFamily: Fonts.primary,
    textAlign: "center"
  },
  extraSize: {
    width: width * 0.49
  }
};
