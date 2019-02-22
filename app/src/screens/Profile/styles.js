import { StyleSheet } from "react-native";

const profilePrimaryColor =
  "linear-gradient(to right, rgb(185,43,39) 0%,rgb(21,101,192) 100%)";

export const styles = StyleSheet.create({
  header: {
    // backgroundColor: profilePrimaryColor,
    height: 150
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80
  },
  // name: {
  //   fontSize: 22,
  //   color: "#FFFFFF",
  //   fontWeight: "600"
  // },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  services: {
    fontSize: 16,
    color: profilePrimaryColor,
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: profilePrimaryColor
  },
  editTextBtn: {
    fontSize: 15,
    color: "white"
  }
});
