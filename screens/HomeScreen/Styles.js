import { StyleSheet, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

import { Colors, Fonts } from "../../constants";
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
    marginTop: height * 0.01,
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
});

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   },
//   contentContainer: {
//     flex: 1,
//     paddingTop: 30,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between"
//   },
//   row: {
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     justifyContent: "space-between",
//     marginTop: 10,
//     flexWrap: "wrap"
//   },
//   item: {
//     flex: 1,
//     height: 120,
//     paddingVertical: 20,
//     borderColor: Colors.primaryLight,
//     borderWidth: 1,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "space-around",
//     marginHorizontal: 5,
//     marginTop: 10
//   },
//   itemText: {
//     color: Colors.primary,
//     fontFamily: Fonts.primary,

//   },
//   itemImage: {
//     height: 35
//   }
// });
