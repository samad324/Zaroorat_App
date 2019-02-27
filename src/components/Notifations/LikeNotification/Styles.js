import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  container: {
    height: height * 0.1,
    borderTopWidth: 0.5,
    borderTopColor: "#99999c",
    borderBottomWidth: 0.5,
    borderBottomColor: "#99999c",
    justifyContent: "center",
    flexDirection: "row"
  },
  generalContainerStyle: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    flex: 1.3
  },
  profilePic: {
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  heartIcon: {
    width: 22,
    height: 22,
    borderColor: "#fff",
    borderWidth: 0.4,
    borderRadius: 5
  },
  background: {
    borderRadius: 33
  },
  descriptionContainer: {
    flex: 4
  },
  discriptionWrapper: {
    flexDirection: "row"
  },
  name: {
    fontSize: 12,
    color: "#343439"
  },
  message: {
    fontSize: 8,
    color: "#99999c"
  },
  postContainer: {
    flex: 1.3
  }
});
