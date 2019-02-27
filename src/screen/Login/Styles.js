import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Styles = {
  mainContainer: {
    flex: 1,
    justifyContent: "center"
  },
  constainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1
  },
  backgroundImage: {
    width: width,
    height: height,
    paddingHorizontal: 30
  },
  socialButton: {
    flex: 1,
    marginBottom: height * 0.3,
    paddingHorizontal: 40
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  fieldsContiner: {
    flex: 1.5,
    flexDirection: "column",
    alignItems: "center"
  },
  userNameField: {
    width: width * 0.8
  },
  loginBtnContainer: {
    width: width,
    paddingLeft: width * 0.2,
    paddingRight: width * 0.2,
    alignItems: "center"
  },
  loginBtn: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#2abf88",
    marginHorizontal: 42,
    height: 56
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center"
  },
  createAccountTextContainer: {
    width: width
  },
  CreateAccountBtn: {
    marginLeft: width * 0.1,
    marginTop: height * 0.04
  },
  createAccountText: {
    color: "#2abf88"
  }
};
