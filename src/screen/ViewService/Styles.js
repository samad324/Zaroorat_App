import { Dimensions, StyleSheet } from "react-native";

import { Colors } from "../../constants/index";

const { width, height } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.blue,
    borderBottomWidth: 6
  },
  bottomContainer: {
    height: 300,
    marginTop: 60
  },
  userProfile: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: -40,
    paddingHorizontal: 12
  },
  imageContainer: {
    borderColor: Colors.blue,
    borderWidth: 2,
    borderRadius: 1000,
    width: 84
  },
  ServeiceBackgroundImage: {
    width: width,
    height: 190
  },
  ServeiceImage: {
    height: 80,
    width: 80,
    borderColor: Colors.blue,
    borderWidth: 0,
    borderRadius: 1000
  },
  userNameContainer: {
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    paddingLeft: 10
  },
  listField: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    width: width,
    marginLeft: 10,
    marginRight: 20,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.6
  },
  listHeading: {
    flex: 1,
    color: Colors.grey,
    fontSize: 16,
    fontWeight: "bold"
  },
  listTxt: {
    flex: 3,
    color: Colors.grey,
    fontSize: 12
  },
  BtnContainer: {
    width: width,
    paddingLeft: width * 0.2,
    paddingRight: width * 0.2,
    alignItems: "center"
  },
  Btn: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: Colors.blue,
    marginHorizontal: 42,
    height: 56
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center"
  },
  inputFieldsWrapper: {
    paddingLeft: width * 0.07,
    paddingRight: width * 0.08,
    marginTop: height * 0.026,
    width: width
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  priceTxt: {
    color: Colors.darkGray,
    fontSize: 18,
    paddingLeft: width * 0.2
  }
});
