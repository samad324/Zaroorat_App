import { StyleSheet, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  tile: {
    height: height * 0.16,
    width: width * 0.32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: height * 0.01
  },
  tileImg: {
    width: width * 0.24,
    height: height * 0.1
  },
  tileTxt: {
    textAlign: "center"
  },
  extraSize: {
    width: width * 0.49
  }
});
